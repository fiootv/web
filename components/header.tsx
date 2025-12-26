"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll to adjust header position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Switch to sticky position immediately on any scroll
      setIsScrolled(scrollPosition > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { href: "/download", label: "Download" },
    { href: "/faqs", label: "FAQs" },
    { href: "/products", label: "Products" },
    { href: "/billing", label: "Billing Login" },
    { href: "/support", label: "Support Portal" },
  ];

  return (
    <header className="w-full relative z-50">
      {/* Top Bar - Primary Color */}
      <div className="bg-primary text-white py-2 relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            {/* Left side - Links */}
            <div className="flex items-center gap-3">
              <Link 
                href="/contact" 
                className="hover:text-cyan-200 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <div className="h-4 w-px bg-white/30"></div>
              <Link 
                href="/faqs" 
                className="hover:text-cyan-200 transition-colors duration-200"
              >
                FAQs
              </Link>
            </div>

            {/* Right side - Contact Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-200" />
                <a 
                  href="tel:+18555614578" 
                  className="hover:text-cyan-200 transition-colors duration-200"
                >
                  +1-855-561-4578
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Black - Fixed */}
      <div className={`fixed left-0 right-0 z-50 border-b border-white/30 bg-black/95 backdrop-blur-sm transition-all duration-150 ${
        isScrolled ? "top-0" : "top-[40px]"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left - Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-4xl text-white">
                  <span className="font-light">
                    fioo
                  </span>
                  <span className="text-white font-bold">tv</span>
                </span>
              </div>
            </Link>

<div className="flex items-center gap-4">

            {/* Center - Navigation Links */}
            <nav className="hidden lg:flex items-center gap-10">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-200 underline-offset-4 hover:underline uppercase text-sm font-medium hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right - Icons and Button */}
            <div className="flex items-center gap-4">
              <div className="h-6 w-px bg-gray-700"></div>
              <button 
                className="text-gray-300 hover:text-primary transition-colors duration-200 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  0
                </span>
              </button>
              <Button
                className="bg-primary hover:bg-primary-600 active:bg-primary-700 text-white px-4 md:px-6 py-2"
              >
                View Plans
              </Button>
              <button 
                className="text-gray-300 hover:text-primary transition-colors duration-200 lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
</div>

          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-black transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between p-6">
          <Link 
            href="/" 
            className="flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-2xl text-white">
              <span className="font-light">
                fioo
              </span>
              <span className="text-white font-bold">tv</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-300 hover:text-primary transition-colors duration-200"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col p-6 space-y-2 overflow-y-auto pb-32">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 uppercase text-sm font-medium hover:text-primary transition-all duration-200 py-3 hover:pl-2"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/50">
          <div className="flex flex-col gap-4">
            <Button
              className="bg-primary hover:bg-primary-600 active:bg-primary-700 text-white rounded-md px-4 py-2 transition-all duration-200 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              View Plans
            </Button>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Phone className="h-4 w-4 text-primary" />
              <a 
                href="tel:+18555614578" 
                className="hover:text-primary transition-colors duration-200"
              >
                +1-855-561-4578
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

