"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  ArrowRight
} from "lucide-react";

export function Footer() {
  // Use static year - Next.js doesn't allow new Date() in client components during build
  // The year will be updated annually or can be set to current year manually
  const currentYear = 2025;

  const footerLinks = {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
    support: [
      { href: "/faqs", label: "FAQs" },
      { href: "/support", label: "Support Portal" },
      { href: "/help", label: "Help Center" },
      { href: "/troubleshooting", label: "Troubleshooting" },
    ],
    legal: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms and Conditions" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
    resources: [
      { href: "/download", label: "Download" },
      { href: "/devices", label: "Supported Devices" },
      { href: "/pricing", label: "Pricing Plans" },
      { href: "/billing", label: "Billing Login" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl pt-12 md:pt-16">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary border border-primary p-8 md:p-12 mb-12 md:mb-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users and start streaming your favorite content today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-primary px-8 py-6 font-semibold text-base md:text-lg flex items-center gap-2 transition-colors duration-200"
              >
                View Pricing Plans
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  <span className="font-normal">fioo</span>tv
                </h2>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your ultimate entertainment destination. Stream movies, series, documentaries, and more in multiple languages with fiootv.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="mailto:support@fiootv.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@fiootv.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="tel:+18555614578"
                    className="hover:text-primary transition-colors"
                  >
                    +1-855-561-4578
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 border border-gray-700 hover:bg-primary hover:border-primary flex items-center justify-center transition-colors duration-200 group"
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} fiootv. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-primary transition-colors"
              >
                Refund
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
