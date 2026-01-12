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
    description:
      "fiootv provides a vast collection of on-demand content, including the latest movies, popular series, and engaging documentaries. With thousands of options, you're sure to find something you love.",
  },
  {
    number: "02",
    icon: Languages,
    heading: "Diverse Language Options",
    description:
      "Enjoy content in multiple languages, from English and Hindi to regional languages like Punjabi and Bengali and international languages such as Turkish and Arabic. fiootv caters to a global audience with rich and varied offerings.",
  },
  {
    number: "03",
    icon: Globe,
    heading: "Access Anytime, Anywhere",
    description:
      "Watch your favorite shows and movies on any device— whether it's a smart TV, smartphone, tablet, or streaming box. Our platform ensures you have high-quality entertainment wherever you go.",
  },
  {
    number: "04",
    icon: Calendar,
    heading: "Flexible Subscription Plans",
    description:
      "Choose from a range of subscription plans designed to fit different needs and budgets. Enjoy flexible options with easy payment methods, automated renewals, and the ability to upgrade or change plans as needed.",
  },
  {
    number: "05",
    icon: Wrench,
    heading: "Seamless Setup and Support",
    description:
      "Get started quickly with our easy setup guide. Our dedicated customer support team is available on all days, except Tuesdays from 11 AM to 8 PM, to help with any technical issues or questions, ensuring a smooth and enjoyable experience.",
  },
  {
    number: "06",
    icon: Video,
    heading: "High-Quality Streaming",
    description:
      "Experience content in stunning quality with our robust streaming capabilities. Enjoy SD, HD, and 4K UHD options depending on your device and internet speed for the best viewing experience.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf9f6] py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-6xl font-semibold text-center mb-6 text-gray-900 px-4 max-w-4xl mx-auto">
            Why Choose{" "}
            <span className="text-primary">fiootv</span>?
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-8 flex flex-col hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Background number */}
                <div className="absolute top-4 right-4 text-primary/5 font-bold text-7xl md:text-8xl leading-none select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                  {benefit.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6 text-primary">
                  <benefit.icon className="w-12 h-12" />
                </div>

                {/* Heading */}
                <h3 className="relative z-10 text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {benefit.heading}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-600 leading-relaxed font-medium">
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
