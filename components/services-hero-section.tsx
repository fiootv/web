"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ServicesHeroSection() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517604931442-7f0d8ed32c55?w=1920&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-7xl relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6">
            Services
          </h1>
          
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base">
            <Link 
              href="/" 
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Services</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
