"use client";

import { motion } from "motion/react";

export function CTABannerSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* "OUR OFFER" label */}
          <p className="text-white/90 text-sm md:text-base font-medium uppercase tracking-wider mb-4 md:mb-6">
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
