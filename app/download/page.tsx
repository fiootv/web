"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { 
  Download, 
  Smartphone, 
  Tv, 
  Apple, 
  Chrome,
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
    icon: Apple,
    description: "iPhone & iPad",
    color: "bg-gray-800",
    image: "https://www.fiootv.com/wp-content/uploads/2019/03/ios1-1.jpg",
    downloads: [
      {
        label: "Download",
        url: "https://itunes.apple.com/us/app/golive-player/id1434968108?ls=1&mt=8",
      },
    ],
  },
  {
    name: "Android",
    icon: Smartphone,
    description: "Android Mobiles, Tablets & Boxes",
    color: "bg-green-500",
    image: "https://www.fiootv.com/wp-content/uploads/2019/03/android-1.jpg",
    downloads: [
      {
        label: "Download",
        url: "https://play.google.com/store/apps/details?id=com.golive.goliveiptvbox",
      },
      {
        label: "Download",
        url: "https://www.fiootv.com/tv.apk",
      },
    ],
  },
  {
    name: "Android TV",
    icon: Tv,
    description: "Android TV Devices",
    color: "bg-green-600",
    image: "https://www.fiootv.com/wp-content/uploads/2019/03/android-tv-1.jpg",
    downloads: [
      {
        label: "Download",
        url: "https://bit.ly/2kCpGaw",
      },
    ],
  },
  {
    name: "Web Player",
    icon: Chrome,
    description: "Browser-based Player",
    color: "bg-blue-500",
    image: "https://www.fiootv.com/wp-content/uploads/2019/03/web-player-1.jpg",
    downloads: [
      {
        label: "Download",
        url: "https://bit.ly/2ko34dE",
      },
    ],
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {downloadPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 p-8 hover:border-primary transition-colors duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Platform Image/Icon */}
                    <div className="w-32 h-32 mb-6 relative border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                      {platform.image ? (
                        <Image
                          src={platform.image}
                          alt={platform.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className={`w-full h-full ${platform.color} flex items-center justify-center`}>
                          <Icon className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Platform Name */}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {platform.name}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 min-h-[40px]">
                      {platform.description}
                    </p>
                    
                    {/* Download Buttons */}
                    <div className="w-full space-y-3">
                      {platform.downloads.map((download, downloadIndex) => (
                        <Button
                          key={downloadIndex}
                          className="w-full bg-gray-50 hover:bg-primary text-gray-700 hover:text-white px-6 py-3 text-sm font-medium border border-gray-200 hover:border-primary transition-colors duration-200 flex items-center justify-center gap-2"
                          onClick={() => window.open(download.url, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                          {download.label}
                        </Button>
                      ))}
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
