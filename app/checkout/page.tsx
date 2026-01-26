"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  orderNotes: string;
  paymentMethod: string;
  agreeToTerms: boolean;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "5years";
  
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "United States (US)",
    zipCode: "",
    orderNotes: "",
    paymentMethod: "cash_on_delivery",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setSubmitError("First name, last name, and email are required");
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmitError("You must agree to the Terms and conditions to place an order");
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
          name: `${formData.firstName} ${formData.lastName}`,
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

      // Redirect to success page with plan details
      router.push(`/checkout-success?plan=${selectedPlan.id}&duration=${encodeURIComponent(selectedPlan.displayDuration)}&price=${selectedPlan.price}`);
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Billing details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name, Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      First name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Last name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Company name (optional)
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter company name"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Country / Region <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="United States (US)">United States (US)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Street Address */}
                <div>
                  <Label htmlFor="addressLine1" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Street address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900 mb-2"
                    placeholder="House number and street name"
                  />
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>

                {/* Town / City */}
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Town / City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter town or city"
                  />
                </div>

                {/* State */}
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a state</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                  </select>
                </div>

                {/* ZIP Code */}
                <div>
                  <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    ZIP Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter ZIP code"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary bg-white text-gray-900"
                    placeholder="Enter phone number"
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

                {/* Additional Information Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Additional information
                  </h3>
                  <div>
                    <Label htmlFor="orderNotes" className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Order notes (optional)
                    </Label>
                    <textarea
                      id="orderNotes"
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                    />
                  </div>
                </div>

                {/* Payment Options */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Payment
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="cash_on_delivery"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={formData.paymentMethod === "cash_on_delivery"}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <div className="flex-1">
                        <Label htmlFor="cash_on_delivery" className="text-sm font-medium text-gray-900 cursor-pointer block">
                          Cash on delivery
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Policy Text */}
                <div className="pt-4">
                  <p className="text-sm text-gray-600">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                      Privacy policy
                    </Link>
                    .
                  </p>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm font-medium text-gray-700 cursor-pointer">
                    I have read and agree to the website{" "}
                    <Link href="/terms-and-conditions" className="text-primary hover:underline">
                      Terms and conditions
                    </Link>{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {submitError}
                  </div>
                )}

                {/* Place Order Button */}
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
                    "Place Order"
                  )}
                </Button>
              </form>
          </div>

          {/* Right Side - Your Order */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:border-l lg:border-gray-200 lg:pl-12">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Your order
            </h2>

            {/* Plan Info */}
            <div className="pb-6 mb-6 border-b border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {selectedPlan.displayDuration} Plan
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedPlan.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${selectedPlan.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">SUBTOTAL</span>
                <span className="text-gray-900 font-medium">${selectedPlan.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Tax</span>
                <span className="text-gray-900 font-medium">$0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-900 font-medium">Free Shipping</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">TOTAL</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${selectedPlan.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
