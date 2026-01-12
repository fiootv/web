"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";

// OMDB API key - get your free key from http://www.omdbapi.com/apikey.aspx
// Movie Data Interface
interface MovieData {
  title: string;
  year: string;
  poster: string;
  isPlaceholder?: boolean;
}

// Static movie data
const INITIAL_MOVIES: MovieData[] = [
  {
    title: "Inception",
    year: "2010",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Inception",
  },
  {
    title: "Interstellar",
    year: "2014",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Interstellar",
  },
  {
    title: "Dune: Part Two",
    year: "2024",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Dune+2",
  },
  {
    title: "Oppenheimer",
    year: "2023",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Oppenheimer",
  },
  {
    title: "Barbie",
    year: "2023",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Barbie",
  },
  {
    title: "Avatar: The Way of Water",
    year: "2022",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Avatar+2",
  },
  {
    title: "Top Gun: Maverick",
    year: "2022",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Top+Gun",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=Spider-Man",
  },
  {
    title: "The Godfather",
    year: "1972",
    poster: "https://placehold.co/600x900/1a1a1a/ffffff?text=The+Godfather",
  },
  // Placeholder card
  {
    title: "The Dark Knight",
    year: "2008",
    poster: "",
    isPlaceholder: true
  }
];

export function PopularMoviesSection() {
  const [movies, setMovies] = useState<MovieData[]>(INITIAL_MOVIES);
  const [isLoading, setIsLoading] = useState(false);

  // No useEffect needed for static data

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#262626] py-20 md:py-28">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Orange glowing dot on the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-primary/30 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-wider mb-4">
            UPDATED MOVIES
          </p>
          <h2 className="text-3xl md:text-6xl font-semibold text-white mb-6">
            Watch Popular Movies Online
          </h2>
          <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto font-medium">
            Stay Current with Our Freshly Updated Content!
          </p>
        </motion.div>

        {/* Movie Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-white text-lg">Loading movies...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {movies.map((movie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl border-2 border-gray-700 hover:bg-white/5 transition-all duration-300">
                  {/* Movie Poster or Placeholder */}
                  <div className={`relative aspect-[2/3] overflow-hidden ${movie.isPlaceholder ? 'bg-gray-700 flex items-center justify-center' : 'bg-gray-800'}`}>
                    {movie.isPlaceholder ? (
                      <div className="text-white/50 font-medium text-lg text-center px-4">
                        No Image Available
                      </div>
                    ) : (
                      <>
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          unoptimized
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="p-3 bg-gray-900/90">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-1 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-tight flex-none">
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
