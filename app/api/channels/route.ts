import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    let supabase;
    try {
      supabase = createServerSupabaseClient();
    } catch (clientError) {
      console.error('Failed to create Supabase client:', clientError);
      return NextResponse.json(
        { 
          error: 'Database configuration error',
          message: clientError instanceof Error ? clientError.message : 'Failed to initialize database connection'
        },
        { status: 500 }
      );
    }
    
    // Access searchParams - API routes are dynamic by default
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // Build base query
    let query = supabase
      .from('channels')
      .select('*', { count: 'exact' })
      .order('category', { ascending: true })
      .order('genre', { ascending: true });

    // Apply search filter
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(`title.ilike.${searchPattern},genre.ilike.${searchPattern}`);
    }

    // Apply category filter
    if (category) {
      query = query.eq('category', category);
    }

    // Fetch all data using pagination (Supabase default limit is 1000)
    let allData: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;
    let totalCount: number | null = null;

    while (hasMore) {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      
      // Clone the base query for this page
      let pageQuery = supabase
        .from('channels')
        .select('*', { count: 'exact' })
        .order('category', { ascending: true })
        .order('genre', { ascending: true })
        .range(from, to);

      // Apply search filter
      if (search) {
        const searchPattern = `%${search}%`;
        pageQuery = pageQuery.or(`title.ilike.${searchPattern},genre.ilike.${searchPattern}`);
      }

      // Apply category filter
      if (category) {
        pageQuery = pageQuery.eq('category', category);
      }

      const { data: pageData, error: pageError, count } = await pageQuery;

      if (pageError) {
        console.error('Supabase pagination error:', pageError);
        return NextResponse.json(
          { 
            error: pageError.message,
            details: pageError.details || null,
            hint: pageError.hint || null
          },
          { status: 500 }
        );
      }

      // Get total count from first page
      if (page === 0 && count !== null) {
        totalCount = count;
        console.log(`Total channels in DB: ${count}`);
      }

      if (pageData && pageData.length > 0) {
        allData.push(...pageData);
        hasMore = pageData.length === pageSize;
        page++;
      } else {
        hasMore = false;
      }
    }

    const data = allData;
    const count = totalCount || allData.length;

    console.log(`Fetched ${data?.length || 0} channels (total in DB: ${count || 'unknown'})`);

    // Group channels by category
    const groupedChannels: Record<string, Array<{
      channel_number: string;
      title: string;
      genre: string;
      category: string;
    }>> = {};

    data?.forEach((channel) => {
      const cat = channel.category || 'Uncategorized';
      if (!groupedChannels[cat]) {
        groupedChannels[cat] = [];
      }
      groupedChannels[cat].push({
        channel_number: channel.channel_number,
        title: channel.title,
        genre: channel.genre,
        category: channel.category,
      });
    });

    // Log category counts for debugging
    const categoryCounts = Object.keys(groupedChannels).map(cat => ({
      category: cat,
      count: groupedChannels[cat].length
    }));
    console.log(`Categories with channels:`, categoryCounts.slice(0, 10), `... (${categoryCounts.length} total)`);

    return NextResponse.json({
      channels: groupedChannels,
      total: data?.length || 0,
      categoryCount: Object.keys(groupedChannels).length,
    });
  } catch (error) {
    console.error('Error in channels API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
