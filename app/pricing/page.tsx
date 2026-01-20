"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>("5years");

  const currentPlan = pricingPlans.find((plan) => plan.id === selectedPlan);

  // Check for success message
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      // You could show a success toast here
      console.log("Order submitted successfully");
    }
  }, [searchParams]);

  const handleSubscribe = () => {
    router.push(`/checkout?plan=${selectedPlan}`);
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-[1000px]">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-3">
            OUR PLANS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Budget Friendly
            <br />
            <span className="text-primary">Packages</span>
          </h1>
        </div>

        {/* Duration Selector */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {pricingPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {plan.displayDuration}
                {plan.bestValue && (
                  <span className="ml-1.5 text-xs">★</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`relative bg-white rounded-2xl p-8 md:p-12 border transition-all duration-300 ${
              currentPlan?.bestValue
                ? "border-primary shadow-lg"
                : "border-gray-200 shadow-sm"
            }`}
          >
            {/* Best Value Badge */}
            {currentPlan?.bestValue && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-white px-4 py-1 rounded-full font-semibold text-xs">
                  ★ Best Value ★
                </div>
              </div>
            )}

            <div className="text-center mb-10">
              {/* Duration */}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                {currentPlan?.duration}
              </h2>

              {/* Price */}
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-5xl md:text-6xl font-bold text-gray-900">
                  ${currentPlan?.price}
                </span>
              </div>

              {/* Savings Badge */}
              {currentPlan?.savings && (
                <div className="inline-block mb-4">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {currentPlan.savings}
                  </span>
                </div>
              )}

              {/* Price per month */}
              {currentPlan && currentPlan.id !== "1month" && (
                <p className="text-gray-500 text-sm">
                  ${(currentPlan.price / 
                    (currentPlan.id === "6months" ? 6 : 
                     currentPlan.id === "1year" ? 12 :
                     currentPlan.id === "2years" ? 24 : 60)).toFixed(2)}/month
                </p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3.5 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSubscribe}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
            >
              Subscribe Now
            </Button>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-xs">
                ✓ Instant Access • ✓ Cancel Anytime • ✓ Secure Payment
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-gray-900 font-semibold mb-2 text-sm">Premium Content</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Access to thousands of movies and series across all genres
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="text-gray-900 font-semibold mb-2 text-sm">Watch Anywhere</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Stream on TV, laptop, tablet, or mobile - anytime, anywhere
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-gray-900 font-semibold mb-2 text-sm">Multi-Language</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Content available in 15+ languages for global entertainment
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4 text-sm">Have questions?</p>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View FAQs
          </Button>
        </div>
      </div>
    </main>
  );
}
