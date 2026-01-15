import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read all categories from names.txt (the source of truth)
    const namesPath = join(process.cwd(), 'public', 'names.txt');
    const genresFile = readFileSync(namesPath, 'utf-8');
    const allCategories = genresFile
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Also get categories that exist in the database (in case there are more)
    let dbCategories: string[] = [];
    try {
      const supabase = createServerSupabaseClient();
      const { data, error } = await supabase
        .from('channels')
        .select('category')
        .limit(50000);

      if (!error && data) {
        const uniqueCategories = [...new Set(data.map(ch => ch.category).filter(Boolean))];
        dbCategories = uniqueCategories;
      }
    } catch (dbError) {
      console.error('Error fetching categories from DB:', dbError);
      // Continue with file-based categories
    }

    // Combine and deduplicate categories
    const combinedCategories = [...new Set([...allCategories, ...dbCategories])];

    // Custom sorting function
    const sortCategories = (categories: string[]): string[] => {
      const priorityLanguages = [
        'ENGLISH',
        'HINDI',
        'URDU',
        'PUNJABI',
        'TAMIL',
        'BENGALI'
      ];

      // Other famous languages (Arabic, Spanish, French, Portuguese, etc.)
      const otherFamousLanguages = [
        'ARABIC',
        'SPANISH',
        'FRENCH',
        'PORTUGUESE',
        'TELUGU',
        'MARATHI',
        'GUJARATI',
        'KANNADA',
        'MALAYALAM',
        'SPORTS',
        'ADULT'
      ];

      const sorted: string[] = [];
      const rest: string[] = [];

      // 1. "ALL CHANNELS" at the top (always add it as a special category)
      const allChannelsIndex = categories.findIndex(cat => cat.toUpperCase() === 'ALL CHANNELS');
      if (allChannelsIndex >= 0) {
        // If it exists, use the exact case from the list
        sorted.push(categories[allChannelsIndex]);
      } else {
        // If it doesn't exist, add it
        sorted.push('ALL CHANNELS');
      }

      // 2. Priority languages in order
      for (const lang of priorityLanguages) {
        const langCategories = categories
          .filter(cat => cat.toUpperCase().startsWith(lang))
          .sort();
        sorted.push(...langCategories);
      }

      // 3. Other famous languages
      for (const lang of otherFamousLanguages) {
        const langCategories = categories
          .filter(cat => {
            const upperCat = cat.toUpperCase();
            return upperCat.startsWith(lang) && 
                   !priorityLanguages.some(pl => upperCat.startsWith(pl));
          })
          .sort();
        sorted.push(...langCategories);
      }

      // 4. Everything else alphabetically (excluding ALL CHANNELS if it was already added)
      const sortedSet = new Set(sorted);
      const remaining = categories
        .filter(cat => {
          const upperCat = cat.toUpperCase();
          return !sortedSet.has(cat) && upperCat !== 'ALL CHANNELS';
        })
        .sort();
      sorted.push(...remaining);

      return sorted;
    };

    const sortedCategories = sortCategories(combinedCategories);

    return NextResponse.json({
      categories: sortedCategories,
      total: sortedCategories.length,
    });
  } catch (error) {
    console.error('Error in categories API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
