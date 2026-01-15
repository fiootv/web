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
            <div className="relative w-full aspect-[2/3] bg-gray-800 border border-gray-700" />
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
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 lg:px-12 py-6 lg:py-8 lg:text-xl text-base font-medium transition-colors duration-200"
              >
                Start Your Free Trial Today
              </Button>
            </div>
          </div>

          {/* Right Section - Vertical Movie Poster Sliders */}
          <div className="relative h-[450px] lg:h-[700px] overflow-hidden">
            <div className="grid grid-cols-3 gap-3 h-full">
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
