import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const API_BASE_URL = 'https://watchtv.cc/feedback/get_channel_data';
const DEFAULT_SESSION = '4rrbqqpthi07h0fpqllhqi3oirpgo2pd';
const DEFAULT_COOKIE = 'e0e161dc671a2d979810244af04d6ddf';

function getCookie(): string {
  try {
    const configFile = join(process.cwd(), 'config', 'cookie-config.json');
    const config = readFileSync(configFile, 'utf-8');
    const parsed = JSON.parse(config);
    const session = parsed.session || DEFAULT_SESSION;
    const cookie = parsed.cookie || DEFAULT_COOKIE;
    return `ci_session=${session}; _cookie=${cookie}`;
  } catch (error) {
    // If file doesn't exist, return default combined
    return `ci_session=${DEFAULT_SESSION}; _cookie=${DEFAULT_COOKIE}`;
  }
}

interface ChannelData {
  number: string;
  title: string;
  Genre: string;
}

interface APIResponse {
  total: number;
  data: ChannelData[];
}

async function fetchChannelData(genre: string, page: number): Promise<APIResponse> {
  const url = new URL(API_BASE_URL);
  url.searchParams.set('search', '');
  url.searchParams.set('genre', genre);
  url.searchParams.set('page', page.toString());

  const cookie = getCookie();

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Referer': 'https://watchtv.cc/',
      'User-Agent': 'Mozilla/5.0',
      'X-Requested-With': 'XMLHttpRequest',
      'Cookie': cookie,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data for genre ${genre}, page ${page}: ${response.statusText}`);
  }

  return response.json();
}

async function syncGenreToSupabase(genre: string, supabase: ReturnType<typeof createServerSupabaseClient>) {
  try {
    let allChannels: ChannelData[] = [];
    let page = 1;

    // Fetch first page to get total count and determine items per page
    const firstPageData = await fetchChannelData(genre, 1);
    allChannels.push(...firstPageData.data);
    
    const itemsPerPage = firstPageData.data.length;
    const totalPages = itemsPerPage > 0 ? Math.ceil(firstPageData.total / itemsPerPage) : 1;

    console.log(`Genre: ${genre}, Total: ${firstPageData.total}, Items per page: ${itemsPerPage}, Pages: ${totalPages}`);

    // Fetch remaining pages
    for (page = 2; page <= totalPages; page++) {
      const pageData = await fetchChannelData(genre, page);
      
      // Stop if no data returned
      if (!pageData.data || pageData.data.length === 0) {
        break;
      }
      
      allChannels.push(...pageData.data);
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Prepare data for Supabase insertion
    const channelsToInsert = allChannels.map(channel => ({
      channel_number: channel.number,
      title: channel.title,
      genre: channel.Genre,
      category: genre,
    }));

    // Insert or update data in Supabase
    // Using upsert to handle duplicates based on channel_number and genre combination
    const { error } = await supabase
      .from('channels')
      .upsert(channelsToInsert, {
        onConflict: 'channel_number,genre',
      });

    if (error) {
      console.error(`Error inserting data for genre ${genre}:`, error);
      throw error;
    }

    return {
      genre,
      total: allChannels.length,
      success: true,
    };
  } catch (error) {
    console.error(`Error syncing genre ${genre}:`, error);
    return {
      genre,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Read genres from names.txt
    const namesPath = join(process.cwd(), 'public', 'names.txt');
    const genresFile = readFileSync(namesPath, 'utf-8');
    const genres = genresFile
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    console.log(`Starting sync for ${genres.length} genres...`);

    const results = [];
    
    // Process genres sequentially to avoid overwhelming the API
    for (const genre of genres) {
      console.log(`Processing genre: ${genre}`);
      const result = await syncGenreToSupabase(genre, supabase);
      results.push(result);
      
      // Add delay between genres to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      message: `Sync completed. ${successful} genres successful, ${failed} failed.`,
      totalGenres: genres.length,
      results,
    });
  } catch (error) {
    console.error('Error in sync-channels API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check status or get info
export async function GET() {
  return NextResponse.json({
    message: 'Channel sync API. Use POST to start sync.',
    endpoint: '/api/sync-channels',
  });
}
