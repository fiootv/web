"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is fiootv?",
    answer:
      "fiootv is a comprehensive entertainment service that provides access to a vast library of on-demand content, including movies, series, documentaries, and more, across multiple languages and genres.",
  },
  {
    question: "What devices are compatible with fiootv?",
    answer:
      "fiootv is compatible with a wide range of devices including smart TVs, smartphones, tablets, streaming boxes, and computers. You can access your favorite content on any device that supports our platform.",
  },
  {
    question: "How can I start using fiootv?",
    answer:
      "Getting started with fiootv is easy! Simply sign up for an account, choose a subscription plan that suits your needs, and follow our quick setup guide. You'll be streaming your favorite content in no time.",
  },
  {
    question: "What are the subscription plans available?",
    answer:
      "fiootv offers flexible subscription plans designed to fit different needs and budgets. We provide various options with different features and content access levels. You can upgrade or change your plan at any time.",
  },
  {
    question: "What internet speed is recommended for streaming?",
    answer:
      "For the best streaming experience, we recommend a minimum internet speed of 5 Mbps for SD quality, 10 Mbps for HD quality, and 25 Mbps for 4K UHD content. Higher speeds ensure smoother playback and better quality.",
  },
  {
    question: "How do I troubleshoot streaming issues?",
    answer:
      "If you experience streaming issues, try checking your internet connection, restarting your device, clearing the app cache, or updating to the latest version of the app. Our support team is also available to help with technical issues.",
  },
  {
    question: "Can I access content in multiple languages?",
    answer:
      "Yes! fiootv offers content in multiple languages including English, Hindi, regional languages like Punjabi and Bengali, and international languages such as Turkish and Arabic. We cater to a global audience with diverse language options.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Image (50% full height) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1 min-h-screen"
        >
          <Image
            src="https://images.unsplash.com/photo-1692188071339-2825a8a997f1?w=800&h=1200&fit=crop"
            alt="Happy customers enjoying fiootv"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Right Side - FAQ Section (50%) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 flex items-center py-20 md:py-28"
        >
          <div className="container mx-auto px-4 max-w-2xl w-full">
            {/* Header */}
            <div className="mb-8">
              <p className="text-primary text-sm md:text-base font-medium uppercase tracking-wider mb-4">
                FIND ANSWERS FAST: EXPLORE OUR FAQ SECTION!
              </p>
              <h2 className="text-3xl md:text-6xl font-semibold text-gray-900 mb-6">
                Most Commonly{" "}
                <span className="text-primary">Asked Questions</span>
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-200 hover:border-primary transition-colors duration-200"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 text-primary">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 md:px-8 md:py-5 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
