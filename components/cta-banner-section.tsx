"use client";

import { motion } from "motion/react";

export function CTABannerSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Background pattern - halftone circular dots overlay with varying sizes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid of circles with varying sizes */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0,0,0,0.2) 2px, transparent 2px),
              radial-gradient(circle at 60% 20%, rgba(0,0,0,0.15) 3px, transparent 3px),
              radial-gradient(circle at 40% 70%, rgba(0,0,0,0.25) 1.5px, transparent 1.5px),
              radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 2.5px, transparent 2.5px),
              radial-gradient(circle at 10% 80%, rgba(0,0,0,0.15) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px, 80px 80px, 50px 50px, 70px 70px, 55px 55px',
            backgroundPosition: '0 0, 20px 20px, 10px 10px, 30px 30px, 15px 15px',
          }}
        />

        {/* Additional larger circles for depth */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-600/15 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-600/15 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-600/15 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-primary-600/15 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* "OUR OFFER" label */}
          <p className="text-white text-sm md:text-base font-semibold uppercase tracking-wider mb-4 md:mb-6">
            OUR OFFER
          </p>

          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight max-w-5xl mx-auto">
            Start Your Free Trial Today And Explore The Endless Entertainment Possibilities With
            <span className="text-white"> fiootv</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
