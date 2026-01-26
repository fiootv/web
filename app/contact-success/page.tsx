"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto mt-16 flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 md:py-32">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600 bg-green-50">
            <Check className="h-8 w-8 text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Thank you for reaching out
          </h1>
          <p className="mt-3 text-gray-600">
            We&apos;ve received your message and will get back to you soon.
          </p>
          <Button
            asChild
            className="mt-10 h-12 rounded-md border-0 bg-primary px-8 text-base font-medium shadow-none hover:bg-primary/90"
          >
            <Link href="/">Return to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
