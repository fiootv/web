"use client";

import { motion } from "motion/react";

const contentStats = [
  {
    value: "28k+",
    label: "ENGLISH MOVIES & SERIES",
    span: "col-span-1 md:col-span-4",
    size: "large"
  },
  {
    value: "6k+",
    label: "ENGLISH SERIES",
    span: "col-span-1 md:col-span-4",
    size: "medium"
  },
  {
    value: "1k+",
    label: "DOCUMENTARIES",
    span: "col-span-1 md:col-span-4",
    size: "small"
  },
  {
    value: "28k+",
    label: "COLLECTION MOVIES",
    span: "col-span-1 md:col-span-3",
    size: "small"
  },
  {
    value: "15+",
    label: "CONTENT IN LANGUAGES",
    span: "col-span-1 md:col-span-3",
    size: "small"
  },
  {
    value: "1.90k+",
    label: "KIDS MOVIES",
    span: "col-span-1 md:col-span-3",
    size: "medium"
  },
  {
    value: "395+",
    label: "KIDS SERIES",
    span: "col-span-1 md:col-span-3",
    size: "small"
  },
];

export function ContentLibrarySection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-white">
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
            Explore Our Library and see{" "}
            <span className="text-primary">for yourself</span> why fiootv is the ultimate choice.
          </h2>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {contentStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${stat.span} group relative`}
            >
              <div className="relative h-full bg-gray-50 border border-gray-200 p-6 md:p-8 flex flex-col justify-between hover:border-primary transition-colors duration-200 overflow-hidden">
                {/* Number */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="mb-4"
                  >
                    <span className="font-semibold text-gray-900 text-4xl md:text-6xl">
                      {stat.value}
                    </span>
                  </motion.div>
                </div>

                {/* Label */}
                <div className="relative z-10 mt-auto">
                  <p className={`font-medium text-gray-700 uppercase tracking-wider ${stat.size === "large" ? "text-base md:text-xl" :
                    stat.size === "medium" ? "text-sm md:text-base" :
                      "text-xs md:text-sm"
                    }`}>
                    {stat.label}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

