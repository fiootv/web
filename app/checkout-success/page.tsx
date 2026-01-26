"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "28K+ English Movies & Series",
  "28K+ Collection Movies",
  "6K+ English Series",
  "1K+ Documentaries",
  "1.9K+ Kids Movies",
  "395+ Kids Series",
  "Content in 15+ Languages",
];

const planDurations: Record<string, string> = {
  "1month": "1 MONTH",
  "6months": "6 MONTHS",
  "1year": "1 YEAR",
  "2years": "2 YEARS",
  "5years": "5 YEARS",
};

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan");
  const duration = searchParams.get("duration");
  const price = searchParams.get("price");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Redirect to pricing if no plan details
    if (!planId || !duration || !price) {
      router.push("/pricing");
    }
  }, [planId, duration, price, router]);

  if (!mounted || !planId || !duration || !price) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  const planDuration = planDurations[planId] || duration;
  const planPrice = parseFloat(price);

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4 max-w-4xl pt-24 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon and Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
            <p className="text-sm text-gray-500">
              You will receive a confirmation email shortly.
            </p>
          </div>

          {/* Plan Details Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Details
            </h2>

            {/* Plan Info */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {duration} Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    {planDuration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${planPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-base">
                What's Included:
              </h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>We'll review your order and contact you within 24 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You'll receive setup instructions via email once your order is confirmed.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Payment will be collected upon delivery of your service.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white h-12 px-8 text-base font-semibold"
            >
              <Link href="/pricing">
                View Other Plans
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 text-base font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
