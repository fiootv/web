"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FooterCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#faf9f6] to-[#f5f4f1] py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-6xl font-semibold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied users and start streaming your favorite content today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 rounded-full font-semibold text-base md:text-lg flex items-center gap-2 rounded-full"
              >
                View Pricing Plans
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
