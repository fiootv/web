// TMDB API utility functions
// Get your API key from https://www.themoviedb.org/settings/api

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
}

export interface TMDBResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

/**
 * Get the full poster image URL from TMDB
 */
export function getPosterUrl(posterPath: string | null, size: 'w500' | 'w780' | 'original' = 'w500'): string {
  if (!posterPath) {
    return '';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}

/**
 * Fetch popular movies from TMDB
 */
export async function fetchPopularMovies(page: number = 1): Promise<TMDBMovie[]> {
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key not found. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file');
    return [];
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results.filter(movie => movie.poster_path); // Only return movies with posters
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

/**
 * Fetch now playing movies from TMDB
 */
export async function fetchNowPlayingMovies(page: number = 1): Promise<TMDBMovie[]> {
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key not found. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file');
    return [];
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results.filter(movie => movie.poster_path);
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
}

/**
 * Fetch top rated movies from TMDB
 */
export async function fetchTopRatedMovies(page: number = 1): Promise<TMDBMovie[]> {
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key not found. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file');
    return [];
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results.filter(movie => movie.poster_path);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

/**
 * Fetch upcoming movies from TMDB
 */
export async function fetchUpcomingMovies(page: number = 1): Promise<TMDBMovie[]> {
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key not found. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file');
    return [];
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    return data.results.filter(movie => movie.poster_path);
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
}

/**
 * Convert TMDB movie to our MovieData format
 */
export function convertTMDBToMovieData(tmdbMovie: TMDBMovie): {
  title: string;
  year: string;
  poster: string;
  id: number;
} {
  return {
    title: tmdbMovie.title,
    year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear().toString() : 'N/A',
    poster: getPosterUrl(tmdbMovie.poster_path),
    id: tmdbMovie.id,
  };
}
