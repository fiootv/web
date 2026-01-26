import type { Metadata } from "next";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Terms and Conditions – FiooTV | Best IPTV Service",
  description:
    "FiooTV terms and conditions. Usage, service terms, refund policy, compatibility, and other terms for using our IPTV streaming service.",
  openGraph: {
    title: "Terms and Conditions – FiooTV | Best IPTV Service",
    description: "FiooTV terms and conditions. Usage, service terms, refund policy, compatibility, and other terms for using our IPTV streaming service.",
    url: `${defaultUrl}/terms-and-conditions`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions – FiooTV | Best IPTV Service",
    description: "FiooTV terms and conditions. Usage, service terms, refund policy, and compatibility.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-20 pt-36 md:py-28 md:pt-40">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Terms and Conditions
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Fiootv provides an online video streaming service which allows clients
          to browse distinctive offerings of live and on-demand programs.
          Consequently, by accessing or using any of the Fiootv services, You
          acknowledge and consent to these terms:
        </p>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Changes to the Terms and Conditions
            </h2>
            <p className="leading-relaxed">
              We may, at any time, and at our sole discretion, adjust these
              Terms and Conditions of Use, including our Privacy Policy, with or
              without notice to the Client. Any such alteration will be
              effective instantly upon open posting. Your proceeded use of our
              Service and this Site following any such alteration constitutes
              your acknowledgment of these adjusted Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Minimum age requirement
            </h2>
            <p className="leading-relaxed">
              In order to become a member and utilize the Fiootv services, you
              must be 18 years old or older.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Usage and service terms
            </h2>
            <p className="leading-relaxed">
              You may not either directly or through the use of any device,
              software, internet site, web-based service, or other means,
              re-stream, distribute, broadcast or transmit the content.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Third party purchases
            </h2>
            <p className="leading-relaxed">
              Your transactions and other dealings with third party vendors that
              are found on or through the service, including &quot;Add To
              Cart&quot;, and other comparable programs, are solely between you
              and such dealer.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Quality of streams
            </h2>
            <p className="leading-relaxed">
              A perfect viewing experience relies upon your network access and
              device capabilities. The elements will be based on your location,
              internet capacity, the number of devices connected to the same
              network, the content you have chosen, and the configuration of the
              device you are using. Subsequently, Fiootv can&apos;t make any
              guarantees about the content in these regards. Please note sharing
              a subscription will result in permanent suspension or device ban.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              VPN or Proxy usage
            </h2>
            <p className="leading-relaxed">
              Using a VPN or proxy servers is not allowed while connecting to
              our servers and will result in permanent suspension.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Unsupported regions
            </h2>
            <p className="leading-relaxed">
              Our services are unavailable in the following countries: Iran,
              China.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Number of channels and movies (VOD)
            </h2>
            <p className="leading-relaxed">
              The number of channels and movies in the VOD library can be
              changed anytime based on the updates that done every week.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Accuracy of information
            </h2>
            <p className="leading-relaxed">
              All the data you submit to our database must be accurate and
              updated. You are responsible for all utilization of your account.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Compatibility
            </h2>
            <p className="leading-relaxed">
              In order to access the services, you must use devices that meet
              the system and compatibility prerequisites that we establish in
              our Help Center.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Internet service and data usage
            </h2>
            <p className="leading-relaxed">
              You are in charge of any expenses related to your network access
              used to get to our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Sharing a subscription
            </h2>
            <p className="leading-relaxed">
              Sharing a subscription is not permitted. You can only have one
              active stream open at any given time. However, by purchasing
              extra connections, you can watch on multiple devices at the same
              time.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Purchase details
            </h2>
            <p className="leading-relaxed">
              In order to make a purchase, you will need to follow the ordering
              procedures described via the service. Pricing details for products
              and the procedures for payment and delivery are displayed via the
              service and are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Suspension and downtime
            </h2>
            <p className="leading-relaxed">
              In the extension of our rights to end or suspend your access
              delineated above, you acknowledge that: your access and usage of
              the services might be suspended for the length of any sudden or
              unscheduled downtime or unavailability of any portion or all of
              the services for any reason.
            </p>
            <p className="mt-4 leading-relaxed">
              All correspondences and notice to be made or offered in
              understanding with this Agreement ought to be in the English
              language. We maintain all authority to instantly end or limit your
              use of the services or access to content at any time, without
              notice or liability, if Fiootv determines in its sole discretion
              that you have breached these Terms, disregarded any law, rule, or
              regulation.
            </p>
            <p className="mt-4 leading-relaxed">
              The Fiootv logo, and other Fiootv marks, graphics, scripts, are
              trademarks of Fiootv. None of the Fiootv trademarks may be copied,
              downloaded, or otherwise exploited.
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
              href="/refund-policy"
              className="text-primary hover:underline"
            >
              Refund Policy
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
