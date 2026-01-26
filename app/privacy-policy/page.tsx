import type { Metadata } from "next";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Privacy Policy – FiooTV | Best IPTV Service",
  description:
    "FiooTV privacy policy. How we collect, use, and protect your information. Cookies, data usage, and policy updates.",
  openGraph: {
    title: "Privacy Policy – FiooTV | Best IPTV Service",
    description: "FiooTV privacy policy. How we collect, use, and protect your information. Cookies, data usage, and policy updates.",
    url: `${defaultUrl}/privacy-policy`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy – FiooTV | Best IPTV Service",
    description: "FiooTV privacy policy. How we collect, use, and protect your information.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-20 pt-36 md:py-28 md:pt-40">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Fiootv collects and manages user data according to the following
          Privacy Policy. By using the Website, you agree to the terms of this
          Privacy Policy.
        </p>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Cookies
            </h2>
            <p className="leading-relaxed">
              Cookies are small-sized text files saved by your browser on your
              computer, and the browser will send this file to our server only
              when you visit our website. We use cookies technology to improve
              the quality of Fiootv website. By default, your browser is set to
              allow cookies, but you can always choose to block cookies in your
              browser&apos;s settings.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              The Information We Collect
            </h2>
            <p className="leading-relaxed">
              In some cases, we collect information regarding what pages within
              site you look at, how long you look at them for and how many times
              you look at them. This information allows us to optimize our
              website and make sure that Appurse.com provide the best possible
              experience for our users.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              How We Use the Information
            </h2>
            <p className="leading-relaxed">
              We may use this information to learn how this website is being
              used and to gauge the popularity of different parts of the site.
              Knowing how many times specific sections of the site are viewed,
              we can adjust our contents and make improvements to optimize our
              service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Track abuse if it occurs
            </h2>
            <p className="leading-relaxed">
              We will disclose information we have when required to do so by
              law, for example, in response to a court order. We may disclose
              such information in response to a law enforcement agency&apos;s
              request.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Property Claim
            </h2>
            <p className="leading-relaxed">
              The trademarks and logos of all the merchants displayed on the
              website are the property of their respective owners. Fiootv is not
              affiliated or associated with any of them.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Safety Concern
            </h2>
            <p className="leading-relaxed">
              Please be assured that Fiootv only provides original apps and APK
              files without any cheat, modifications or virus. Your personal
              information will NOT be shared with any other third party without
              your explicit permission.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Policy Change
            </h2>
            <p className="leading-relaxed">
              We may amend this Privacy Policy from time to time. Use of
              information we collect now is subject to the Privacy Policy in
              effect at the time such information is used. A user is bound by
              any changes to the Privacy Policy when he or she uses the Services
              after such changes have been first posted.
            </p>
            <p className="mt-4 leading-relaxed">
              Should you have any question or concern, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </section>
        </div>

        <nav className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">Related</p>
          <div className="mt-2 flex flex-wrap gap-4">
            <Link
              href="/refund-policy"
              className="text-primary hover:underline"
            >
              Refund Policy
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
