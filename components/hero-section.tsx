"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// OMDB API key
const OMDB_API_KEY = "dbb68c16";

// Popular movie IMDB IDs
const movieImdbIds = [
  "tt3896198", // Guardians of the Galaxy Vol. 2
  "tt4154756", // Avengers: Infinity War
  "tt4154796", // Avengers: Endgame
  "tt1825683", // Black Panther
  "tt3501632", // Thor: Ragnarok
  "tt3606756", // Incredibles 2
  "tt4633694", // Spider-Man: Into the Spider-Verse
  "tt4154664", // Captain Marvel
  "tt5095030", // Ant-Man and the Wasp
  "tt4154756", // Avengers: Infinity War (duplicate for variety)
  "tt0816692", // Interstellar
  "tt1375666", // Inception
  "tt0468569", // The Dark Knight
  "tt0111161", // The Shawshank Redemption
  "tt0133093", // The Matrix
  "tt0816692", // Interstellar (duplicate)
  "tt1375666", // Inception (duplicate)
  "tt0468569", // The Dark Knight (duplicate)
  "tt0111161", // The Shawshank Redemption (duplicate)
  "tt0133093", // The Matrix (duplicate)
];

// Function to fetch poster from OMDB API
async function fetchPoster(imdbId: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();
    return data.Poster && data.Poster !== "N/A" ? data.Poster : null;
  } catch (error) {
    console.error(`Error fetching poster for ${imdbId}:`, error);
    return null;
  }
}

function VerticalSlider({ 
  posters, 
  direction = "up", 
  duration = 25 
}: { 
  posters: string[]; 
  direction?: "up" | "down"; 
  duration?: number;
}) {
  // Duplicate posters for seamless loop
  const duplicatedPosters = [...posters, ...posters, ...posters, ...posters];
  
  return (
    <div className="relative h-full overflow-hidden">
      <div 
        className={`flex flex-col gap-4 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{ 
          animationDuration: `${duration}s`,
        }}
      >
        {duplicatedPosters.map((poster, index) => (
          <div key={index} className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={poster}
              alt={`Movie poster ${index + 1}`}
              className="relative rounded-lg shadow-2xl w-full h-auto object-cover aspect-[2/3]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [moviePosters, setMoviePosters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosters() {
      // Fetch all posters in parallel for better performance
      const posterPromises = movieImdbIds.map(imdbId => fetchPoster(imdbId));
      const posters = await Promise.all(posterPromises);
      
      // Filter out null values (failed fetches)
      const validPosters = posters.filter((poster): poster is string => poster !== null);
      
      setMoviePosters(validPosters);
      setIsLoading(false);
    }

    loadPosters();
  }, []);

  // Split posters into 3 columns
  const column1 = moviePosters.slice(0, 7);
  const column2 = moviePosters.slice(7, 14);
  const column3 = moviePosters.slice(14, 20);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 md:py-10 py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="text-white space-y-6">
            <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-wider">
              WELCOME TO FIOO TV
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Your Ultimate Entertainment
              <br />
              <span className="text-primary">Destination</span>
            </h1>
            
            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl">
              Experience a world of on-demand content at your fingertips. Dive into the latest movies, 
              binge-worthy series, exciting documentaries, and more all available in multiple languages 
              and genres.
            </p>
            
            <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-wider">
              EXPLORE THE ENDLESS ENTERTAINMENT POSSIBILITIES WITH FIOO TV
            </p>
            
            <div className="space-y-4 pt-4">
              <p className="text-white text-lg md:text-xl font-medium">
                Start Your Free Trial Today
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-600 active:bg-primary-700 text-white px-8 py-6 text-lg rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-primary/50"
              >
                Start Now
              </Button>
            </div>
          </div>

          {/* Right Section - Vertical Movie Poster Sliders */}
          <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-white text-lg">wait...</div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 h-full">
                {/* Column 1 - Scrolling Up */}
                {column1.length > 0 && (
                  <VerticalSlider posters={column1} direction="up" duration={40} />
                )}
                
                {/* Column 2 - Scrolling Down */}
                {column2.length > 0 && (
                  <VerticalSlider posters={column2} direction="down" duration={50} />
                )}
                
                {/* Column 3 - Scrolling Up */}
                {column3.length > 0 && (
                  <VerticalSlider posters={column3} direction="up" duration={44} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

   
    </section>
  );
}
