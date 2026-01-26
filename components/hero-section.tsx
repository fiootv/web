"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies, getPosterUrl } from "@/lib/tmdb";

// Number of movies per column
const MOVIES_PER_COLUMN = 7;

interface MoviePoster {
  poster_path: string | null;
  id: number;
}

function VerticalSlider({ 
  movies, 
  direction = "up", 
  duration = 25 
}: { 
  movies: MoviePoster[]; 
  direction?: "up" | "down"; 
  duration?: number;
}) {
  // Duplicate movies for seamless loop
  const duplicatedMovies = [...movies, ...movies, ...movies, ...movies];
  
  return (
    <div className="relative h-full overflow-hidden">
      <div 
        className={`flex flex-col gap-4 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{ 
          animationDuration: `${duration}s`,
        }}
      >
        {duplicatedMovies.map((movie, index) => (
          <div key={`${movie.id || 'placeholder'}-${index}`} className="relative group flex-shrink-0">
            {movie.poster_path ? (
              <div className="relative w-full aspect-[2/3] overflow-hidden border border-gray-700">
                <Image
                  src={getPosterUrl(movie.poster_path)}
                  alt="Movie poster"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-[2/3] bg-gray-800 border border-gray-700" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [column1Movies, setColumn1Movies] = useState<MoviePoster[]>([]);
  const [column2Movies, setColumn2Movies] = useState<MoviePoster[]>([]);
  const [column3Movies, setColumn3Movies] = useState<MoviePoster[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        // Fetch different movie lists for variety
        const [popular, nowPlaying, topRated] = await Promise.all([
          fetchPopularMovies(1),
          fetchNowPlayingMovies(1),
          fetchTopRatedMovies(1),
        ]);

        // Set movies for each column, ensuring we have enough
        setColumn1Movies(popular.slice(0, MOVIES_PER_COLUMN).map(m => ({ poster_path: m.poster_path, id: m.id })));
        setColumn2Movies(nowPlaying.slice(0, MOVIES_PER_COLUMN).map(m => ({ poster_path: m.poster_path, id: m.id })));
        setColumn3Movies(topRated.slice(0, MOVIES_PER_COLUMN).map(m => ({ poster_path: m.poster_path, id: m.id })));
      } catch (error) {
        console.error('Failed to load movies for hero section:', error);
        // Fallback to empty arrays
        setColumn1Movies([]);
        setColumn2Movies([]);
        setColumn3Movies([]);
      }
    }

    loadMovies();
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden bg-black">
      {/* Content */}
        <div className="container mx-auto px-4 relative z-10 lg:py-20 py-28 !pb-0 max-w-[1450px] grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="text-white space-y-8 text-center lg:text-left">
            <p className="text-primary text-sm md:text-base font-medium uppercase tracking-wider">
              WELCOME TO FIOO TV
            </p>
            
            <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-[80px] font-semibold leading-tight">
              Your Ultimate Entertainment
              <br />
              <span className="text-primary">Destination</span>
            </h1>
            
            <p className="text-gray-300 text-base md:text-xl leading-relaxed">
            Enjoy movies, series, documentaries, and more - your on-demand entertainment in any language and genre.
            </p>
            
            <div className="space-y-4 pt-4">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 lg:px-12 py-6 lg:py-8 lg:text-xl text-base font-medium transition-colors duration-200"
                >
                  Start Your Free Trial Today
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section - Vertical Movie Poster Sliders */}
          <div className="relative h-[450px] lg:h-[800px] overflow-hidden">
            <div className="grid grid-cols-3 gap-3 h-full">
              {/* Column 1 - Scrolling Up */}
              <VerticalSlider movies={column1Movies.length > 0 ? column1Movies : Array(MOVIES_PER_COLUMN).fill({ poster_path: null, id: 0 })} direction="up" duration={40} />
              
              {/* Column 2 - Scrolling Down */}
              <VerticalSlider movies={column2Movies.length > 0 ? column2Movies : Array(MOVIES_PER_COLUMN).fill({ poster_path: null, id: 0 })} direction="down" duration={50} />
              
              {/* Column 3 - Scrolling Up */}
              <VerticalSlider movies={column3Movies.length > 0 ? column3Movies : Array(MOVIES_PER_COLUMN).fill({ poster_path: null, id: 0 })} direction="up" duration={44} />
            </div>
          </div>
        </div>
  
   
    </section>
  );
}
