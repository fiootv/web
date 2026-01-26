"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/channels", label: "Channels" },
    { href: "/pricing", label: "Pricing" },
    { href: "/download", label: "Download" },
    { href: "/faqs", label: "FAQs" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black shadow-lg border-b border-white/10"
            : "bg-black"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6 max-w-[1450px]">
          {/* Top Info Bar - Hidden on mobile, visible on desktop */}
          <div
            className={`hidden md:flex items-center justify-between py-2 text-xs border-b border-white/5 transition-all duration-300 ${
              isScrolled ? "opacity-0 h-0 py-0 overflow-hidden" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4 text-gray-400">
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-200 flex items-center gap-1"
              >
                Contact Us
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="/faqs"
                className="hover:text-primary transition-colors duration-200"
              >
                FAQs
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="h-3 w-3" />
              <a
                href="tel:+18555614578"
                className="hover:text-primary transition-colors duration-200 font-medium"
              >
                +1-855-561-4578
              </a>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group relative z-10"
            >
              <div className="relative">
                <span className="text-3xl md:text-4xl font-light text-white">
                  fioo
                </span>
                <span className="text-3xl md:text-4xl font-bold text-primary inline-block">
                  tv
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* View Plans Button */}
              <Link href="/pricing">
              <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                View Plans
              </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-black border-l border-white/10 transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center"
            >
              <span className="text-2xl font-light text-white">fioo</span>
              <span className="text-2xl font-bold text-primary">tv</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col p-6 space-y-1">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                style={{
                  animation: isMobileMenuOpen
                    ? `slideIn 0.3s ease-out ${index * 0.05}s both`
                    : "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
            <div className="space-y-4">
              <Link href="/pricing">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View Plans
              </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pb-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+18555614578"
                  className="hover:text-primary transition-colors"
                >
                  +1-855-561-4578
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
