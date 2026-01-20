"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";

type PricingPlan = {
  id: string;
  duration: string;
  displayDuration: string;
  price: number;
  bestValue?: boolean;
  savings?: string;
};

const pricingPlans: PricingPlan[] = [
  {
    id: "1month",
    duration: "1 MONTH",
    displayDuration: "Monthly",
    price: 39,
  },
  {
    id: "6months",
    duration: "6 MONTHS",
    displayDuration: "6 Months",
    price: 199,
    savings: "Save $35",
  },
  {
    id: "1year",
    duration: "1 YEAR",
    displayDuration: "1 Year",
    price: 250,
    savings: "Save $218",
  },
  {
    id: "2years",
    duration: "2 YEARS",
    displayDuration: "2 Years",
    price: 399,
    savings: "Save $537",
  },
  {
    id: "5years",
    duration: "5 YEARS",
    displayDuration: "5 Years",
    price: 799,
    bestValue: true,
    savings: "Save $1,541",
  },
];

const features = [
  "28K+ English Movies & Series",
  "28K+ Collection Movies",
  "6K+ English Series",
  "1K+ Documentaries",
  "1.9K+ Kids Movies",
  "395+ Kids Series",
  "Content in 15+ Languages",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "5years";
  
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const plan = pricingPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    } else {
      // Redirect to pricing if invalid plan
      router.push("/pricing");
    }
  }, [planId, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const calculateMonthlyPrice = () => {
    if (!selectedPlan) return 0;
    if (selectedPlan.id === "1month") return selectedPlan.price;
    const months =
      selectedPlan.id === "6months"
        ? 6
        : selectedPlan.id === "1year"
        ? 12
        : selectedPlan.id === "2years"
        ? 24
        : 60;
    return selectedPlan.price / months;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitError("Name and email are required");
      return;
    }

    if (!selectedPlan) {
      setSubmitError("Please select a plan");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: selectedPlan.id,
          planDuration: selectedPlan.duration,
          planPrice: selectedPlan.price,
          planDisplayDuration: selectedPlan.displayDuration,
          ...formData,
        }),
      });

      // Handle redirects
      if (response.status === 307 || response.status === 308) {
        const location = response.headers.get("location");
        throw new Error(
          `API route redirected. Please restart your dev server. Location: ${location || "unknown"}`
        );
      }

      // Try to parse as JSON regardless of content-type
      let data;
      try {
        const text = await response.text();
        if (!text || text.trim() === "") {
          throw new Error("Empty response from server");
        }
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get("content-type"),
          error: parseError,
        });
        throw new Error(
          `Server returned an invalid response (${response.status}). Please check your server console for errors.`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to submit order");
      }

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/pricing?success=true");
      }, 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPlan) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4 max-w-6xl pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Complete Your Order
            </h1>

            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Order Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  We'll contact you shortly to complete your subscription.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to pricing page...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Full name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter address"
                  />
                </div>

                {/* City, State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                {/* Country, Zip */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                      placeholder="Enter country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold rounded-md transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:border-l lg:border-gray-200 lg:pl-12">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Plan Info */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900 text-base">
                  {selectedPlan.displayDuration} Plan
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {selectedPlan.duration}
                </p>
              </div>
              {selectedPlan.savings && (
                <div className="mt-3">
                  <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded text-xs font-medium">
                    {selectedPlan.savings}
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                What's Included:
              </h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${selectedPlan.price}
                  </p>
                  {selectedPlan.id !== "1month" && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      ${calculateMonthlyPrice().toFixed(2)}/month
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                One-time payment • No recurring charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
