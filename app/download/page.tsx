"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  CheckCircle2
} from "lucide-react";

const features = [
  "Simple Setup",
  "Fast & Secure Servers",
  "No Hidden Costs",
  "Local & International Channels",
  "Recurring Simple Payments",
  "Unlimited Device Access",
  "TV Guide Program Included",
];

const downloadPlatforms = [
  {
    name: "iOS",
    image: "/images/downloads/ios.png",
    description: "iPhone & iPad",
    url: "https://apps.apple.com/ca/app/golive-player/id1434968108",
    label: "App Store",
  },
  {
    name: "Android",
    image: "/images/downloads/android.png",
    description: "Mobiles & Tablets",
    url: "https://bit.ly/golivepron",
    label: "Download APK",
  },
  {
    name: "Android TV",
    image: "/images/downloads/android-tv.png",
    description: "Smart TVs & Boxes",
    url: "https://bit.ly/golivepron",
    label: "Download APK",
  },
  {
    name: "Windows",
    image: "/images/downloads/windows.png",
    description: "Desktop & Laptop",
    url: "https://apps.microsoft.com/detail/9nrp2lhsh4mf?hl=en-US&gl=IN",
    label: "Microsoft Store",
  },
  {
    name: "Firestick",
    image: "/images/downloads/firestick.png",
    description: "Amazon Fire Stick",
    url: "https://bit.ly/golivepron",
    label: "Download APK",
  },
  {
    name: "STB",
    image: "/images/downloads/stb.png",
    description: "Set-Top Box",
    url: "/stb.apk",
    label: "Download APK",
  },
];

export default function DownloadPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20 md:py-[160px] max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
            Download
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Compatibility <span className="text-primary">For Your Devices</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            FiooTV Currently Works On All Android Mobiles/Tablets, Android SMART TVs, and Android Boxes as well.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 hover:border-primary transition-colors duration-200"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-900 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Download for Your Device
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloadPlatforms.map((platform, index) => {
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 p-8 hover:border-primary transition-colors duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Platform Image */}
                    <div className="w-full h-48 mb-6 relative border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                      <Image
                        src={platform.image}
                        alt={platform.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    {/* Platform Name */}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {platform.name}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 min-h-[40px]">
                      {platform.description}
                    </p>

                    {/* Download Button */}
                    <div className="w-full">
                      <Button
                        className="w-full bg-gray-50 hover:bg-primary text-gray-700 hover:text-white px-6 py-6 text-sm font-bold border border-gray-200 hover:border-primary transition-colors duration-200 flex items-center justify-center gap-2"
                        onClick={() => window.open(platform.url, '_blank')}
                      >
                        <Download className="w-4 h-4" />
                        {platform.label}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Setup Guides Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 border border-gray-200 p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Need Help Setting Up?
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Check out our comprehensive setup guides for different devices and platforms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/faqs">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold transition-colors duration-200"
              >
                View Setup Guides
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-base font-semibold transition-colors duration-200"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
