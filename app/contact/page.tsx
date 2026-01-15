"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Star } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20 md:py-[160px] max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column - Contact Form */}
          <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Get in touch
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our friendly team would love to hear from you.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-gray-700 text-base font-medium">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 h-12 text-base focus:border-primary focus:ring-primary"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-gray-700 text-base font-medium">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 h-12 text-base focus:border-primary focus:ring-primary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700 text-base font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-900 h-12 text-base focus:border-primary focus:ring-primary"
                  placeholder="you@company.com"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-gray-700 text-base font-medium">
                  Phone number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-900 h-12 text-base focus:border-primary focus:ring-primary"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-3">
                <Label htmlFor="message" className="text-gray-700 text-base font-medium">
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="flex w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <Label
                  htmlFor="privacy"
                  className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                >
                  You agree to our{" "}
                  <a
                    href="/privacy"
                    className="text-primary hover:underline font-medium"
                  >
                    privacy policy
                  </a>
                  .
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary-600 text-white px-8 py-7 text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Get in touch
              </Button>
            </form>
          </div>

          {/* Right Column - Image with Testimonial Overlay */}
          <div className="relative h-[600px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
              alt="Contact us"
              fill
              className="object-cover"
              priority
            />
            
            {/* Subtle gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Testimonial Overlay - White text directly on image */}
            <div className="absolute bottom-12 left-8 right-8 lg:left-12 lg:right-12 lg:bottom-16 z-10">
              {/* Main Quote */}
              <p className="text-white text-2xl lg:text-3xl font-semibold leading-relaxed mb-6 max-w-2xl">
                &quot;FiooTV is the perfect tool for startups to keep track of their entertainment needs. Their intuitive platform and streaming capabilities have saved our team hours of manual work.&quot;
              </p>
              
              {/* Author Info with Stars */}
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <p className="text-white text-lg font-medium">— Aliah Lane</p>
                  <p className="text-white/90 text-base">Founder, Layers.io</p>
                </div>
                {/* Star Rating - to the right of author name */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-white text-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Cards - Full Width */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Email us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Send us an email anytime.
              </p>
              <a
                href="mailto:support@fiootv.com"
                className="text-sm text-gray-900 hover:text-primary underline font-medium"
              >
                support@fiootv.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Call us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Mon-Fri from 8am to 5pm.
              </p>
              <a
                href="tel:+18555614578"
                className="text-sm text-gray-900 hover:text-primary underline font-medium"
              >
                +1-855-561-4578
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Visit us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Visit our office HQ.
              </p>
              <a
                href="#"
                className="text-sm text-gray-900 hover:text-primary underline font-medium"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
