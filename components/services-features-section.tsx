"use client";

import { motion } from "motion/react";
import {
  Tv,
  Smartphone,
  Globe,
  Sparkles,
  Monitor,
  DollarSign,
  LucideIcon,
} from "lucide-react";

interface HoverFeature {
  title: string;
  description: string;
}

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  hoverFeatures: HoverFeature[];
}

const services: Service[] = [
  {
    icon: Tv,
    title: "All-in-One Streaming Subscription",
    description: "Access movies, series, documentaries, and live TV channels all in one comprehensive subscription. No need for multiple services—everything you need is here.",
    hoverFeatures: [
      {
        title: "Single Subscription",
        description: "One payment, one subscription, endless entertainment.",
      },
      {
        title: "No Contracts",
        description: "Enjoy our services month-to-month with the flexibility to cancel anytime.",
      },
      {
        title: "Free Trials",
        description: "Experience fiootv with a free trial to explore all we have to offer before committing.",
      },
    ] as HoverFeature[],
  },
  {
    icon: Smartphone,
    title: "Seamless Multi-Device Experience",
    description: "Stream on any device—smart TVs, smartphones, tablets, laptops, and more. Your entertainment follows you wherever you go with seamless synchronization.",
    hoverFeatures: [
      {
        title: "Smart TVs",
        description: "Enjoy high-definition streaming on your big screen with easy navigation.",
      },
      {
        title: "Smartphones and Tablets",
        description: "Take your entertainment on the go with our mobile-friendly interface.",
      },
      {
        title: "Computers",
        description: "Stream directly from your laptop or desktop with full access to our content library.",
      },
      {
        title: "Gaming Consoles",
        description: "Enhance your gaming experience by accessing our content through your console.",
      },
    ] as HoverFeature[],
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Watch content from anywhere in the world. Our platform is designed to work globally, giving you access to international content libraries.",
    hoverFeatures: [
      {
        title: "Worldwide Streaming",
        description: "Access our content library from any location, without regional restrictions.",
      },
      {
        title: "Multilingual Support",
        description: "Enjoy content in multiple languages, catering to diverse audiences around the globe.",
      },
      {
        title: "24/7 Availability",
        description: "Stream anytime, anywhere, with no interruptions.",
      },
    ] as HoverFeature[],
  },
  {
    icon: Sparkles,
    title: "Personalized Content Recommendations",
    description: "Discover new favorites with our intelligent recommendation system that learns your preferences and suggests content tailored just for you.",
    hoverFeatures: [
      {
        title: "Custom Playlists",
        description: "Create and save your favorite shows, movies, and music in personalized playlists.",
      },
      {
        title: "Content Discovery",
        description: "Explore new content based on your viewing and listening history.",
      },
      {
        title: "User Profiles",
        description: "Set up multiple profiles for family members, each with its own recommendations and viewing history.",
      },
    ] as HoverFeature[],
  },
  {
    icon: Monitor,
    title: "High-Quality Streaming",
    description: "Enjoy crystal-clear picture quality with support for SD, HD, and 4K UHD streaming. Experience your favorite content in the best quality possible.",
    hoverFeatures: [
      {
        title: "HD and 4K Streaming",
        description: "Enjoy your content in stunning high-definition and 4K resolution, ensuring a premium viewing experience.",
      },
      {
        title: "Adaptive Streaming",
        description: "Our technology automatically adjusts the streaming quality based on your internet connection, so you never experience buffering or lag.",
      },
      {
        title: "Dolby Audio Support",
        description: "Immerse yourself in rich, clear audio with Dolby-enhanced sound for a true cinematic experience.",
      },
    ] as HoverFeature[],
  },
  {
    icon: DollarSign,
    title: "Flexible and Affordable Pricing",
    description: "Choose from flexible subscription plans that fit your budget. No hidden fees, no long-term contracts—just great entertainment at great prices.",
    hoverFeatures: [
      {
        title: "24/7 Customer Service",
        description: "Reach out to us anytime via chat, email, or phone.",
      },
      {
        title: "Comprehensive Help Center",
        description: "Access our online resources, including FAQs, tutorials, and troubleshooting guides.",
      },
      {
        title: "Community Support",
        description: "Join our user forums to connect with other fiootv users, share tips, and get advice.",
      },
    ] as HoverFeature[],
  },
];

export function ServicesFeaturesSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full min-h-[500px] flex flex-col justify-between  bg-primary border border-primary p-6 md:p-8 transition-colors duration-200 overflow-hidden">
                {/* Icon at the top */}
                <div className="flex">
                  <service.icon className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1} />
                </div>

                {/* Title and description at the bottom */}
                <div className="flex flex-col w-full">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Overlay with Features */}
                <div className="absolute inset-0 bg-white border border-primary p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 overflow-y-auto">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                    {service.title}
                  </h3>
                  <ul className="space-y-4">
                    {service.hoverFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="text-primary text-lg font-bold mt-0.5">•</span>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">
                            {feature.title}
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* "And Many More" Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group relative hidden"
          >
            <div className="relative h-full bg-primary border border-primary p-6 md:p-8 transition-colors duration-200 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                And Many More...
              </h3>
              <p className="text-white/90 text-sm md:text-base">
                Entertainment is waiting for you
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
