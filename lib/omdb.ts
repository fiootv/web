// OMDB API – https://www.omdbapi.com/
// Get your API key from https://www.omdbapi.com/apikey.aspx

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
const OMDB_BASE_URL = "https://www.omdbapi.com";

export interface OMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview?: string;
  vote_average?: number;
}

interface OMDBSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OMDBSearchResponse {
  Search?: OMDBSearchResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

/** Numeric id from IMDb ID for compatibility with components that expect number */
function imdbIdToNumber(imdbID: string): number {
  const digits = imdbID.replace(/\D/g, "");
  return digits ? parseInt(digits.slice(-9), 10) || 0 : 0;
}

/**
 * Get poster URL – OMDB returns full URL, so return as-is (or empty if N/A)
 */
export function getPosterUrl(posterPath: string | null): string {
  if (!posterPath || posterPath === "N/A") return "";
  return posterPath;
}

/**
 * Run OMDB search and return normalized movie list (with posters only)
 */
async function searchMovies(
  query: string,
  page: number = 1
): Promise<OMDBMovie[]> {
  if (!OMDB_API_KEY) return [];

  const params = new URLSearchParams({
    apikey: OMDB_API_KEY,
    s: query,
    type: "movie",
    page: String(page),
    r: "json",
  });

  try {
    const res = await fetch(`${OMDB_BASE_URL}/?${params}`);
    if (!res.ok) return [];
    const data: OMDBSearchResponse = await res.json();
    if (data.Response !== "True" || !Array.isArray(data.Search)) return [];

    return data.Search.filter((m) => m.Poster && m.Poster !== "N/A").map(
      (m) => ({
        id: imdbIdToNumber(m.imdbID),
        title: m.Title,
        release_date: m.Year,
        poster_path: m.Poster,
      })
    );
  } catch (err) {
    console.error("OMDB search error:", err);
    return [];
  }
}

/**
 * Fetch popular-style movie list (via search; OMDB has no "popular" endpoint)
 */
export async function fetchPopularMovies(page: number = 1): Promise<OMDBMovie[]> {
  if (!OMDB_API_KEY) {
    console.warn(
      "OMDB API key not found. Set NEXT_PUBLIC_OMDB_API_KEY in .env.local"
    );
    return [];
  }
  return searchMovies("movie", page);
}

/**
 * Fetch "now playing" style – recent years via search
 */
export async function fetchNowPlayingMovies(
  page: number = 1
): Promise<OMDBMovie[]> {
  if (!OMDB_API_KEY) return [];
  const year = new Date().getFullYear();
  return searchMovies(String(year), page);
}

/**
 * Fetch "top rated" style – use another search to vary content
 */
export async function fetchTopRatedMovies(page: number = 1): Promise<OMDBMovie[]> {
  if (!OMDB_API_KEY) return [];
  return searchMovies("the", page);
}

/**
 * Fetch upcoming-style (e.g. next year or recent)
 */
export async function fetchUpcomingMovies(
  page: number = 1
): Promise<OMDBMovie[]> {
  if (!OMDB_API_KEY) return [];
  const year = new Date().getFullYear() + 1;
  return searchMovies(String(year), page);
}

/**
 * Convert to shared MovieData format (same shape as TMDB adapter)
 */
export function convertTMDBToMovieData(movie: OMDBMovie): {
  title: string;
  year: string;
  poster: string;
  id: number;
} {
  return {
    title: movie.title,
    year: movie.release_date || "N/A",
    poster: getPosterUrl(movie.poster_path),
    id: movie.id,
  };
}
