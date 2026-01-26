"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServicesFinalCTASection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-primary">

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              The Top IPTV Provider Will Keep You Entertained
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
              Join thousands of satisfied users and experience the best in entertainment. 
              Start your journey with fiootv today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/billing">
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-primary px-8 py-6 font-semibold text-base md:text-lg flex items-center gap-2 transition-colors duration-200"
                >
                  Recharge Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-primary px-8 py-6 font-semibold text-base md:text-lg flex items-center gap-2 transition-colors duration-200"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative border border-white/20 overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Entertainment Awaits</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
