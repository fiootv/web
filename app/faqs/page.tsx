"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Can I use my subscription on multiple devices?",
    answer: "Please pay attention that 1 subscription can be used on multiple devices but you can watch only on 1 device at the same time.",
  },
  {
    question: "Do you offer Trial or Free Test account?",
    answer: "We don't offer a trial or free test account, Our price is the best on the market, and 100% satisfaction guarantee covers you. If you get an issue that we can't solve in your first 7 days, you can request a full refund.",
  },
  {
    question: "My m3u link is not working?",
    answer: "We do not provide M3U link.",
  },
  {
    question: "My channels are not working?",
    answer: `We strive to provide you with a high level of service at very discounted rates. So please keep this in mind first and foremost.

If a channel is down, we will do our best to restore that back to service. Please use the guidelines below before reporting a channel:

– Stop and give it a couple of minutes. We reboot and swap channels when needed. The channel may be coming back.
– Is this happening on all channels? If it is, you need to check on your end.
– Reboot your devices and wait for 30 secs before turning them back on (STBs, Android Boxes, Routers, Cable modems)
– Make sure you are connecting using a LAN (Ethernet) cable to devices and not via Wifi.`,
  },
  {
    question: "Do you have adult channels?",
    answer: "Yes we offer over 30 premium adult channel, please make sure adult content is checked when you do you order.",
  },
  {
    question: "My account is not working what should I do?",
    answer: `First, please check your network connection, reboot your router and device, and then try again.

Secondly, if your network connection is no problem, please check whether your account is used on other devices. as you can view from more than 1 device at the same time.`,
  },
  {
    question: "Does my subscription start to be active right after I make a payment?",
    answer: `Subscription starting to be active from the moment you will receive your activation credentials in your e-mail.

Example:
Mary subscribed for 3 Months on February 1st at 11:55 PM and activation credentials were received February 2nd at 00:10 AM. Mary subscription is starting to be active from February 2nd 00:10 AM for next 3 months.`,
  },
  {
    question: "How to check my device?",
    answer: `– Check if you entered your activation details correctly.
– Check your network connection, reboot your router and device, and then try again.
– If you have PC/Laptop, etc. connected to same internet network check if you are not overloading your network with downloading or watching movies, etc… on these devices.
– Your Internet needs to be minimum 5 Mb Download and 1 Mb upload speed.
– Reboot your devices and wait for 30 sec before turning them back on (STBs, Android Boxes, Routers, Cable modems)
– Make sure you are connecting using a LAN (Ethernet) cable to devices and not via Wifi.
– If your network connection is no problem, please check whether your account is used on other devices.
– Please visit www.whatismyip.com by using a computer, and send us IP Address you see displayed for restoration.
– Check if the device/app/program got the latest software and firmware updates.
– Check the download speed on the actual device that is streaming our service, you may have 50MB/sec on your computer, but the device could be considerably slower, indicating a problem on your internal network.
– Check for any high processor demanding applications running in the background that can be stopped, this is very important for low-end devices.
– Check if your ISP having problems in your area, an excellent site to check this is downdetector.co.uk
– Try uninstalling and reinstalling your app/program, your activation will not be lost.`,
  },
  {
    question: "I'm getting a black screen in all channels, what should I do?",
    answer: "If you are using a set-top box such as MAG or AVOV and have just set up your device with our service, you will need to perform a hard reset of your device. Simply power off your device, unplug your power cable and re-plug it in.",
  },
  {
    question: "How to setup on FiooTv on Fire Stick?",
    answer: `First we need to enable files from unknown sources.

1. Start your Fire TV and go to the Home page.
2. Select Settings.
3. Select Device and Developer Options.
4. Toggle 'Apps from Unknown Sources' to on.

Navigate to the APK file, select it, download and install.`,
  },
  {
    question: "How to Setup IPTV on Smart TV (LG/Samsung)?",
    answer: `1. Install Smart STB on your Smart TV.
2. Send your Virtual Mac Address while doing the order.`,
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20 md:py-[160px] max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Find answers to the most commonly asked questions about FiooTV
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-gray-200 overflow-hidden hover:border-primary transition-colors duration-200"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4 flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 text-primary">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
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
                      <div className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-gray-200 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our friendly team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 text-base font-semibold transition-colors duration-200"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </main>
  );
}
