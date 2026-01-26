"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
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

function PricingContent() {
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
    <main className="min-h-screen bg-gray-50 pt-36 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3 tracking-tight">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include full access to our content library.
          </p>
        </div>

        {/* Duration Selector */}  
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-1 mb-8 max-w-xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="relative">
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`px-7 py-3 text-sm font-medium transition-colors relative ${
                    selectedPlan === plan.id
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {plan.displayDuration}
                </button>
                {plan.bestValue && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white px-2 py-0.5 text-xs font-medium">
                    Best Value
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto mb-16 px-1">
          
          <div className={`bg-white border p-10 md:p-12 ${
            currentPlan?.bestValue ? "border-primary" : "border-gray-200"
          }`}>

            <div className="mb-12">
              {/* Duration */}
              <h2 className="text-2xl font-medium text-gray-900 mb-6 tracking-tight">
                {currentPlan?.displayDuration}
              </h2>

              {/* Price */}
              <div className="mb-4">
                <span className="text-6xl md:text-7xl font-light text-gray-900 tracking-tight">
                  ${currentPlan?.price}
                </span>
              </div>

              {/* Savings Badge */}
              {currentPlan?.savings && (
                <div className="mb-6">
                  <span className="text-sm text-primary font-medium">
                    {currentPlan.savings}
                  </span>
                </div>
              )}

              {/* Price per month */}
              {currentPlan && currentPlan.id !== "1month" && (
                <p className="text-gray-500 text-base">
                  ${(currentPlan.price / 
                    (currentPlan.id === "6months" ? 6 : 
                     currentPlan.id === "1year" ? 12 :
                     currentPlan.id === "2years" ? 24 : 60)).toFixed(2)} per month
                </p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <span className="text-gray-700 text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSubscribe}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-medium transition-colors"
            >
              Get Started
            </Button>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <span>Instant Access</span>
                <span>Cancel Anytime</span>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Content</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access to thousands of movies and series across all genres
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Watch Anywhere</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Stream on TV, laptop, tablet, or mobile - anytime, anywhere
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Multi-Language</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Content available in 15+ languages for global entertainment
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-900 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <PricingContent />
    </Suspense>
  );
}
