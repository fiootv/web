"use client";

import { motion } from "motion/react";
import {
  Monitor,
  Languages,
  Globe,
  Calendar,
  Wrench,
  Video
} from "lucide-react";

const benefits = [
  {
    number: "01",
    icon: Monitor,
    heading: "Comprehensive Entertainment Library",
    description: "Access a vast collection of movies, series, and documentaries on-demand.",
  },
  {
    number: "02",
    icon: Languages,
    heading: "Diverse Language Options",
    description: "Content available in multiple global and regional languages.",
  },
  {
    number: "03",
    icon: Globe,
    heading: "Access Anytime, Anywhere",
    description: "Stream on any device, from smart TVs to smartphones, anytime.",
  },
  {
    number: "04",
    icon: Calendar,
    heading: "Flexible Subscription Plans",
    description: "Flexible plans with easy payments and automated renewals.",
  },
  {
    number: "05",
    icon: Wrench,
    heading: "Seamless Setup and Support",
    description: "Easy setup and dedicated support for a smooth experience.",
  },
  {
    number: "06",
    icon: Video,
    heading: "High-Quality Streaming",
    description: "High-quality streaming in SD, HD, and 4K UHD.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-6xl font-semibold text-left mb-6 text-gray-900 px-4 max-w-7xl mx-auto">
            Why Choose{" "}
            <span className="text-primary">fiootv</span>?
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full bg-gray-50 border border-gray-200 p-6 md:p-8 flex flex-col hover:border-primary transition-colors duration-200 overflow-hidden">
                {/* Background number */}
                <div className="absolute top-4 right-4 text-primary/5 font-bold text-7xl md:text-8xl leading-none select-none pointer-events-none">
                  {benefit.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6 text-primary">
                  <benefit.icon className="w-10 h-10" />
                </div>

                {/* Heading */}
                <h3 className="relative z-10 text-xl md:text-2xl mb-4 font-semibold text-gray-900 leading-tight">
                  {benefit.heading}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-600 leading-relaxed text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
