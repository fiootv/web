"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Star } from "lucide-react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let data: { error?: string; success?: boolean } = {};
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text) as { error?: string; success?: boolean };
        } catch {
          setStatus("error");
          setErrorMessage(
            res.ok
              ? "Something went wrong. Please try again."
              : "The server returned an unexpected response. Please try again later."
          );
          return;
        }
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setFormData(initialState);
      setAgreedToPrivacy(false);
      router.push("/contact-success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Failed to send. Please check your connection and try again."
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (status === "error") setStatus("idle");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20 md:py-32 mt-16 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-0 lg:gap-12 items-start">
          {/* Left Column - Contact Form */}
          <div>
            {/* Header Section */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in touch
              </h1>
              <p className="text-lg text-gray-600">
                Our friendly team would love to hear from you.
              </p>
            </div>

            {status === "error" && (
              <div className="mb-6 p-4 rounded-md border border-red-200 bg-red-50 text-red-800 text-sm">
                {errorMessage}
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone Field */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Phone number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
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
                  checked={agreedToPrivacy}
                  onChange={(e) => {
                    if (status === "error") setStatus("idle");
                    setAgreedToPrivacy(e.target.checked);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <Label
                  htmlFor="privacy"
                  className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                >
                  You agree to our{" "}
                  <a
                    href="/privacy-policy"
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
                disabled={status === "loading"}
                className="w-full bg-primary hover:bg-primary/50 text-white h-12 text-base font-semibold rounded-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Get in touch"}
              </Button>
            </form>
          </div>

          {/* Vertical Divider - Hidden on mobile */}
          <div className="hidden lg:block w-px bg-gray-200 h-full min-h-[600px]"></div>

          {/* Right Column - Image with Testimonial Overlay */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[650px] border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
              alt="Contact us"
              fill
              className="object-cover"
              priority
            />
            
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Testimonial Overlay - White text directly on image */}
            <div className="absolute bottom-12 left-8 right-8 lg:left-12 lg:right-12 lg:bottom-16 z-10">
              {/* Main Quote */}
              <p className="text-white text-2xl lg:text-3xl font-medium leading-relaxed mb-6 max-w-2xl">
                &quot;FiooTV is the perfect tool for startups to keep track of their entertainment needs. Their intuitive platform and streaming capabilities have saved our team hours of manual work.&quot;
              </p>
            
            </div>
          </div>
        </div>

        {/* Contact Information Cards - Full Width */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="bg-white border border-gray-200 p-6 hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
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
            <div className="bg-white border border-gray-200 p-6 hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
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
            <div className="bg-white border border-gray-200 p-6 hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
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
