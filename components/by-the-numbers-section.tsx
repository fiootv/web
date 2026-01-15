"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

const sampleArcs = [
  // ...generateRandomArcs(30), // Random generation removed to focus on land-based manual points
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  // Add some points with images
  {
    order: 6,
    startLat: 40.7128,
    startLng: -74.0060, // NYC
    endLat: 34.0522,
    endLng: -118.2437, // LA
    arcAlt: 0.3,
    color: "#ff0000",
    image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww",
  },
  {
    order: 6,
    startLat: 52.5200, // Berlin
    startLng: 13.4050,
    endLat: 48.8566,
    endLng: -2.3522, // Paris
    arcAlt: 0.3,
    color: "#ff0000",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
  },
  {
    order: 7,
    startLat: 35.6762, // Tokyo
    startLng: 139.6503,
    endLat: 22.3193, // HK
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#ff0000",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
  },
  // Add some filler points on random continents
  { order: 8, startLat: -25.2744, startLng: 133.7751, endLat: -30, endLng: 135, arcAlt: 0.1, color: "#ff0000" }, // Australia
  { order: 8, startLat: -4.4419, startLng: 15.2663, endLat: -10, endLng: 20, arcAlt: 0.1, color: "#ff0000" }, // Africa (Congo)
  { order: 9, startLat: 55.7558, startLng: 37.6173, endLat: 60, endLng: 40, arcAlt: 0.1, color: "#ff0000" }, // Russia
  { order: 9, startLat: 56.1304, startLng: -106.3468, endLat: 60, endLng: -100, arcAlt: 0.1, color: "#ff0000" }, // Canada
  { order: 10, startLat: -14.2350, startLng: -51.9253, endLat: -10, endLng: -50, arcAlt: 0.1, color: "#ff0000" }, // Brazil
  { order: 10, startLat: 20.5937, startLng: 78.9629, endLat: 25, endLng: 80, arcAlt: 0.1, color: "#ff0000" }, // India
  { order: 11, startLat: 39.9042, startLng: 116.4074, endLat: 35, endLng: 110, arcAlt: 0.1, color: "#ff0000" }, // China

  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  // ============================================================================
  // OCEAN POINTS - Imaginary content points in ocean areas to fill empty spaces
  // ============================================================================
  // Pacific Ocean points
  {
    order: 11,
    startLat: 0, // Equator, mid-Pacific
    startLng: -150,
    endLat: 5,
    endLng: -145,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 11,
    startLat: 15, // North Pacific
    startLng: -160,
    endLat: 18,
    endLng: -155,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 11,
    startLat: -15, // South Pacific
    startLng: -170,
    endLat: -12,
    endLng: -165,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 12,
    startLat: -25, // South Pacific near Polynesia
    startLng: -130,
    endLat: -22,
    endLng: -125,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  // Atlantic Ocean points
  {
    order: 12,
    startLat: 30, // North Atlantic
    startLng: -40,
    endLat: 32,
    endLng: -35,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 12,
    startLat: 20, // Mid-Atlantic
    startLng: -30,
    endLat: 23,
    endLng: -25,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 13,
    startLat: 0, // Equator, mid-Atlantic
    startLng: -25,
    endLat: 3,
    endLng: -20,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 13,
    startLat: -20, // South Atlantic
    startLng: -15,
    endLat: -17,
    endLng: -10,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  // Indian Ocean points
  {
    order: 13,
    startLat: -10, // Indian Ocean
    startLng: 75,
    endLat: -7,
    endLng: 80,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 14,
    startLat: -25, // Southern Indian Ocean
    startLng: 90,
    endLat: -22,
    endLng: 95,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 14,
    startLat: 0, // Equator, Indian Ocean
    startLng: 70,
    endLat: 3,
    endLng: 75,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  // Arctic Ocean points
  {
    order: 14,
    startLat: 75, // Arctic Ocean
    startLng: -10,
    endLat: 78,
    endLng: -5,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 15,
    startLat: 80, // High Arctic
    startLng: 0,
    endLat: 82,
    endLng: 5,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  // Additional scattered ocean points
  {
    order: 15,
    startLat: 10, // Caribbean Sea area
    startLng: -70,
    endLat: 13,
    endLng: -65,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 15,
    startLat: -35, // South Pacific near New Zealand
    startLng: -175,
    endLat: -32,
    endLng: -170,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 16,
    startLat: 40, // Mediterranean area
    startLng: 10,
    endLat: 42,
    endLng: 15,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 16,
    startLat: -40, // Southern Ocean
    startLng: 120,
    endLat: -37,
    endLng: 125,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 16,
    startLat: 5, // Gulf of Guinea
    startLng: 0,
    endLat: 8,
    endLng: 5,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 17,
    startLat: -50, // South Atlantic near Antarctica
    startLng: -30,
    endLat: -47,
    endLng: -25,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 17,
    startLat: 50, // North Pacific near Alaska
    startLng: -170,
    endLat: 53,
    endLng: -165,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 17,
    startLat: 25, // Arabian Sea
    startLng: 65,
    endLat: 28,
    endLng: 70,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  // Additional scattered ocean points for better distribution
  {
    order: 18,
    startLat: 45, // North Atlantic
    startLng: -50,
    endLat: 47,
    endLng: -45,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 18,
    startLat: -20, // South Atlantic
    startLng: -50,
    endLat: -17,
    endLng: -45,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 18,
    startLat: 20, // North Pacific
    startLng: -140,
    endLat: 23,
    endLng: -135,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 19,
    startLat: -30, // South Pacific
    startLng: -140,
    endLat: -27,
    endLng: -135,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 19,
    startLat: 10, // West Pacific
    startLng: 160,
    endLat: 13,
    endLng: 165,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 19,
    startLat: -15, // East Indian Ocean
    startLng: 100,
    endLat: -12,
    endLng: 105,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 20,
    startLat: 35, // Mediterranean
    startLng: 20,
    endLat: 38,
    endLng: 25,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 20,
    startLat: 60, // North Sea area
    startLng: 5,
    endLat: 63,
    endLng: 10,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 20,
    startLat: -45, // Southern Ocean
    startLng: -60,
    endLat: -42,
    endLng: -55,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 21,
    startLat: 55, // Bering Sea area
    startLng: -180,
    endLat: 58,
    endLng: -175,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 21,
    startLat: -35, // Tasman Sea
    startLng: 160,
    endLat: -32,
    endLng: 165,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 21,
    startLat: 30, // Gulf of Mexico area
    startLng: -90,
    endLat: 33,
    endLng: -85,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 22,
    startLat: -10, // Coral Sea
    startLng: 150,
    endLat: -7,
    endLng: 155,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 22,
    startLat: 50, // Labrador Sea
    startLng: -40,
    endLat: 53,
    endLng: -35,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 22,
    startLat: -30, // South Atlantic
    startLng: 0,
    endLat: -27,
    endLng: 5,
    arcAlt: 0.3,
    color: "#ff0000",
  },
  {
    order: 23,
    startLat: 15, // Bay of Bengal
    startLng: 85,
    endLat: 18,
    endLng: 90,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 23,
    startLat: -5, // Java Sea area
    startLng: 110,
    endLat: -2,
    endLng: 115,
    arcAlt: 0.2,
    color: "#ff0000",
  },
  {
    order: 23,
    startLat: 25, // Red Sea area
    startLng: 40,
    endLat: 28,
    endLng: 45,
    arcAlt: 0.2,
    color: "#ff0000",
  },

];


export function ByTheNumbersSection() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#FFFFFF",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#FFFFFF",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(100, 100, 100, 0.9)", // Gray color for visible land areas
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <section className="relative min-h-[500px] overflow-hidden bg-white py-10 md:py-20 !pb-0">
      <h2 className="text-3xl md:text-6xl font-semibold text-center mb-6 text-gray-900 px-4">Why fiootv is Your <br /> Go-To EntertainmentHub</h2>
      <p className="text-center mb-10 text-gray-600 px-4">Experience our fiootv platform from across the globe. and enjoy your favorite shows and movies.</p>
      <div className="flex flex-row items-center justify-center h-full relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="text-center mb-[12rem] md:mb-[24rem]"
          >

          </motion.div>
          <div className="absolute w-full bottom-[-10rem] h-[50rem] md:h-[100rem] z-10 md:translate-y-[60%] translate-y-[48%]">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
    </section>
  );
}

