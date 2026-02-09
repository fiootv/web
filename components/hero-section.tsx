"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPopularMovies, getPosterUrl } from "@/lib/omdb";

// Number of movies per column
const MOVIES_PER_COLUMN = 7;

interface MoviePoster {
  poster_path: string | null;
  id: number;
}

/** Poster image with fallback when load fails (broken URL, 403, etc.) */
function PosterImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="absolute inset-0 bg-gray-800" />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      loading="lazy"
      sizes="(max-width: 768px) 33vw, 20vw"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
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
          <div key={`${movie.id || "placeholder"}-${index}`} className="relative group flex-shrink-0">
            <div className="relative w-full aspect-[2/3] overflow-hidden border border-gray-700">
              {movie.poster_path ? (
                <PosterImage src={getPosterUrl(movie.poster_path)} alt="Movie poster" />
              ) : (
                <div className="absolute inset-0 bg-gray-800" />
              )}
            </div>
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      setError(null);
      try {
        // Fetch multiple pages so we have enough for all three columns (avoids empty carousels)
        const [page1, page2, page3] = await Promise.all([
          fetchPopularMovies(1),
          fetchPopularMovies(2),
          fetchPopularMovies(3),
        ]);

        // Single pool, dedupe by id, then split into three columns
        const seen = new Set<number>();
        const pool: MoviePoster[] = [];
        for (const m of [...page1, ...page2, ...page3]) {
          if (pool.length >= MOVIES_PER_COLUMN * 3) break;
          if (seen.has(m.id)) continue;
          seen.add(m.id);
          pool.push({ poster_path: m.poster_path, id: m.id });
        }

        const perColumn = MOVIES_PER_COLUMN;
        setColumn1Movies(pool.slice(0, perColumn));
        setColumn2Movies(pool.slice(perColumn, perColumn * 2));
        setColumn3Movies(pool.slice(perColumn * 2, perColumn * 3));

        if (pool.length === 0) {
          setError("Movies could not be loaded. Check that NEXT_PUBLIC_OMDB_API_KEY is set in .env.local.");
        }
      } catch (err) {
        console.error("Failed to load movies for hero section:", err);
        setColumn1Movies([]);
        setColumn2Movies([]);
        setColumn3Movies([]);
        setError("Couldn't load movies. Please try again later.");
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
            {error ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8 rounded-xl bg-gray-800/50">
                <p className="text-red-400 font-medium mb-2">Something went wrong</p>
                <p className="text-white/70 text-sm md:text-base max-w-md">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 h-full">
                {/* Column 1 - Scrolling Up */}
                <VerticalSlider movies={column1Movies.length > 0 ? column1Movies : Array(MOVIES_PER_COLUMN).fill({ poster_path: null, id: 0 })} direction="up" duration={40} />
                {/* Column 2 - Scrolling Down */}
                <VerticalSlider movies={column2Movies.length > 0 ? column2Movies : Array(MOVIES_PER_COLUMN).fill({ poster_path: null, id: 0 })} direction="down" duration={50} />
                {/* Column 3 - Scrolling Up */}
                <VerticalSlider movies={column3Movies.length > 0 ? column3Movies : Array(MOVIES_PER_COLUMN).fill({ poster_path: null, id: 0 })} direction="up" duration={44} />
              </div>
            )}
          </div>
        </div>
  
   
    </section>
  );
}
