"use client";

import { Button } from "@/components/ui/button";

// Number of placeholder boxes per column
const BOXES_PER_COLUMN = 7;

function VerticalSlider({ 
  count, 
  direction = "up", 
  duration = 25 
}: { 
  count: number; 
  direction?: "up" | "down"; 
  duration?: number;
}) {
  // Create array of boxes and duplicate for seamless loop
  const boxes = Array.from({ length: count }, (_, i) => i);
  const duplicatedBoxes = [...boxes, ...boxes, ...boxes, ...boxes];
  
  return (
    <div className="relative h-full overflow-hidden">
      <div 
        className={`flex flex-col gap-4 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{ 
          animationDuration: `${duration}s`,
        }}
      >
        {duplicatedBoxes.map((_, index) => (
          <div key={index} className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative rounded-lg shadow-2xl w-full aspect-[2/3] bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Content */}
        <div className="container mx-auto px-4 relative z-10 lg:py-20 py-28 pb-16 max-w-[1450px] grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="text-white space-y-6 text-center lg:text-left">
            <p className="text-primary text-sm md:text-base font-semibold uppercase tracking-wider">
              WELCOME TO FIOO TV
            </p>
            
            <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-[80px] font-semibold ">
              Your Ultimate Entertainment
              <br />
              <span className="text-primary">Destination</span>
            </h1>
            
            <p className="text-gray-200 text-base md:text-xl leading-relaxed max-auto">
            Enjoy movies, series, documentaries, and more - your on-demand entertainment in any language and genre.
            </p>
            
            <div className="space-y-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-600 active:bg-primary-700 text-white px-8 lg:px-12 py-6 lg:py-8 lg:text-xl text-base rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-primary/50"
              >
                Start Your Free Trial Today
              </Button>
            </div>
          </div>

          {/* Right Section - Vertical Movie Poster Sliders */}
          <div className="relative h-[450px] lg:h-[700px] overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            
            <div className="grid grid-cols-3 gap-4 h-full">
              {/* Column 1 - Scrolling Up */}
              <VerticalSlider count={BOXES_PER_COLUMN} direction="up" duration={40} />
              
              {/* Column 2 - Scrolling Down */}
              <VerticalSlider count={BOXES_PER_COLUMN} direction="down" duration={50} />
              
              {/* Column 3 - Scrolling Up */}
              <VerticalSlider count={BOXES_PER_COLUMN} direction="up" duration={44} />
            </div>
          </div>
        </div>
  
   
    </section>
  );
}
