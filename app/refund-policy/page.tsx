import type { Metadata } from "next";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Refund Policy – FiooTV | Best IPTV Service",
  description: "FiooTV refund policy. 7-day refund policy. Request a refund via our contact form using the same email and order number.",
  openGraph: {
    title: "Refund Policy – FiooTV | Best IPTV Service",
    description: "FiooTV refund policy. 7-day refund policy. Request a refund via our contact form using the same email and order number.",
    url: `${defaultUrl}/refund-policy`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Refund Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy – FiooTV | Best IPTV Service",
    description: "FiooTV refund policy. 7-day refund policy. Request a refund via our contact form.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-20 pt-36 md:py-28 md:pt-40">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Refund Policy
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              7 Days Refund Policy
            </h2>
            <p className="mb-4 leading-relaxed">
              At Fios Services, we want to ensure that you are 100% happy with
              your purchase. If you have any technical or sales queries, do not
              hesitate to contact us. However, if you feel the service you
              purchased are not the best fit for your requirements and you
              attempted to resolve issues with our support staff, we want to make
              things right.
            </p>
            <p className="mb-4 leading-relaxed">
              Although we&apos;d love to know where things went wrong, or how we
              can improve, follow the steps below for a full refund within 7
              days of your date of purchase.
            </p>
            <p className="leading-relaxed">
              Also, note that we make every attempt to process the refund as
              quickly as possible. But our payment processor or your financial
              institution can take up to 20 days for the refund to reflect in
              your bank account/card.
            </p>
            <p className="mt-4 font-medium leading-relaxed">
              Once you requested a refund you can&apos;t subscribe again to our
              service at any time in the future.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Requesting a Refund
            </h2>
            <p className="mb-4 leading-relaxed">
              <em>Follow the steps below to get your refund request sent to us:</em>
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Use the contact form to request the refund.</li>
              <li>Use the same email address you use to buy our services.</li>
              <li>Include your order number.</li>
            </ol>
            <p className="mt-6">
              <Link
                href="/contact"
                className="font-medium text-primary hover:underline"
              >
                Go to contact form →
              </Link>
            </p>
          </section>
        </div>

        <nav className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">Related</p>
          <div className="mt-2 flex flex-wrap gap-4">
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-primary hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link href="/faqs" className="text-primary hover:underline">
              FAQs
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </main>
  );
}
