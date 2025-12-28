"use client";

import { motion } from "motion/react";

const contentStats = [
  { 
    value: "28k+", 
    label: "ENGLISH MOVIES & SERIES",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    size: "large"
  },
  { 
    value: "6k+", 
    label: "ENGLISH SERIES",
    span: "col-span-1 md:row-span-2",
    size: "medium"
  },
  { 
    value: "1k+", 
    label: "DOCUMENTARIES",
    span: "col-span-1",
    size: "small"
  },
  { 
    value: "28k+", 
    label: "COLLECTION MOVIES",
    span: "col-span-1",
    size: "small"
  },
  { 
    value: "15+", 
    label: "CONTENT IN LANGUAGES",
    span: "col-span-1",
    size: "small"
  },
  { 
    value: "1.90k+", 
    label: "KIDS MOVIES",
    span: "col-span-1 md:col-span-2",
    size: "medium"
  },
  { 
    value: "395+", 
    label: "KIDS SERIES",
    span: "col-span-1",
    size: "small"
  },
];

export function ContentLibrarySection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 text-gray-900 px-4 max-w-4xl mx-auto">
            Explore Our Content Library and see{" "}
            <span className="text-primary">for yourself</span> why fiootv is the ultimate choice.
          </h2>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {contentStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${stat.span} group relative`}
            >
              <div className="relative h-full bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Background gradient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-300" />
                
                {/* Number */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="mb-4"
                  >
                    <span className={`font-bold text-gray-900 ${
                      stat.size === "large" ? "text-5xl md:text-6xl" :
                      stat.size === "medium" ? "text-4xl md:text-5xl" :
                      "text-3xl md:text-4xl"
                    }`}>
                      {stat.value}
                    </span>
                  </motion.div>
                </div>

                {/* Label */}
                <div className="relative z-10 mt-auto">
                  <p className={`font-semibold text-gray-900 uppercase tracking-wider ${
                    stat.size === "large" ? "text-sm md:text-base" :
                    stat.size === "medium" ? "text-xs md:text-sm" :
                    "text-xs"
                  }`}>
                    {stat.label}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

