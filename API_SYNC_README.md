# Channel Sync API

This API syncs channel data from the external watchtv.cc API to your Supabase database.

## Setup

1. **Create the Supabase table**: Run the SQL migration file `supabase-migration.sql` in your Supabase SQL editor to create the `channels` table.

2. **Environment Variables**: Ensure you have the following environment variables set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

3. **Update Cookie/Session**: The API uses a hardcoded cookie for authentication. Update the `COOKIE` constant in `app/api/sync-channels/route.ts` if your session expires.

## Usage

### Start the Sync

Make a POST request to `/api/sync-channels`:

```bash
curl -X POST http://localhost:3000/api/sync-channels
```

Or using fetch in JavaScript:

```javascript
const response = await fetch('/api/sync-channels', {
  method: 'POST',
});
const data = await response.json();
console.log(data);
```

### Response

The API returns a JSON response with:
- `success`: Boolean indicating if the sync completed
- `message`: Summary message
- `totalGenres`: Total number of genres processed
- `results`: Array of results for each genre with success status and counts

Example response:
```json
{
  "success": true,
  "message": "Sync completed. 224 genres successful, 0 failed.",
  "totalGenres": 224,
  "results": [
    {
      "genre": "ENGLISH | NEWS",
      "total": 150,
      "success": true
    },
    ...
  ]
}
```

## How It Works

1. Reads all genres from `public/names.txt`
2. For each genre:
   - Fetches the first page to determine total count and pagination
   - Fetches all remaining pages
   - Inserts/updates data in Supabase using upsert (handles duplicates)
3. Returns a summary of the sync operation

## Notes

- The sync processes genres sequentially to avoid overwhelming the external API
- There's a 500ms delay between genres and 100ms delay between pages
- The API uses upsert to handle duplicate channels (based on channel_number + genre)
- The sync may take a while depending on the number of genres and total channels

## Table Structure

The `channels` table has the following structure:
- `id`: Primary key (auto-increment)
- `channel_number`: Channel number from API
- `title`: Channel title/category
- `genre`: Channel genre (from API response `Genre` field)
- `category`: Genre category (from the genre parameter, e.g., "ENGLISH | NEWS")
- `created_at`: Timestamp when record was created
- `updated_at`: Timestamp when record was last updated

Unique constraint: `(channel_number, genre)` - prevents duplicate channels for the same genre.
