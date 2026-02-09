"use client";

import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchPopularMovies, convertTMDBToMovieData } from "@/lib/omdb";

const LOAD_TIMEOUT_MS = 15_000;

// Movie Data Interface
interface MovieData {
  title: string;
  year: string;
  poster: string;
  id?: number;
  isPlaceholder?: boolean;
}

export function PopularMoviesSection() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      setError("Request took too long. Please check your connection and try again.");
      setIsLoading(false);
    }, LOAD_TIMEOUT_MS);

    try {
      const tmdbMovies = await fetchPopularMovies(1);
      if (timedOut) return;

      const movieData = tmdbMovies
        .slice(0, 12)
        .map(convertTMDBToMovieData);

      setMovies(movieData);
      if (tmdbMovies.length === 0) {
        setError("Movies could not be loaded. Check that NEXT_PUBLIC_OMDB_API_KEY is set in .env.local.");
      }
    } catch (err) {
      if (timedOut) return;
      console.error("Failed to load movies:", err);
      setMovies([]);
      setError("Couldn't load movies. Please try again later.");
    } finally {
      if (!timedOut) {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary text-sm md:text-base font-medium uppercase tracking-wider mb-4">
            UPDATED MOVIES
          </p>
          <h2 className="text-3xl md:text-6xl font-semibold text-white mb-6">
            Watch Popular Movies Online
          </h2>
          <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto">
            Stay Current with Our Freshly Updated Content!
          </p>
        </motion.div>

        {/* Movie Grid */}
        {isLoading && !error ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-white text-lg">Loading movies...</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[280px] text-center px-4">
            <p className="text-red-400 font-medium mb-2">Something went wrong</p>
            <p className="text-white/70 text-sm md:text-base max-w-md mb-6">{error}</p>
            <Button
              onClick={loadMovies}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Reload movies
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden border border-gray-800 hover:border-primary transition-colors duration-200">
                  {/* Movie Poster */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                    {movie.poster ? (
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <div className="text-white/30 font-medium text-sm text-center px-4">
                          No Image
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="p-3 bg-black border-t border-gray-800">
                    <h3 className="text-white font-semibold text-base mb-1 line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-primary text-xs md:text-sm font-medium">
                      {movie.year}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
