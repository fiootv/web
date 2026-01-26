import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Pricing Plans – FiooTV | Affordable IPTV Subscription Plans",
  description: "Choose the perfect FiooTV plan for you. Starting at $39/month. Flexible plans from 1 month to 5 years. Save up to $1,541 with long-term plans. All plans include 28K+ movies, 6K+ series, and 4000+ live channels.",
  keywords: ["IPTV pricing", "IPTV plans", "streaming subscription", "IPTV cost", "TV service pricing", "FiooTV pricing", "affordable IPTV"],
  openGraph: {
    title: "Pricing Plans – FiooTV | Affordable IPTV Subscription Plans",
    description: "Choose the perfect FiooTV plan for you. Starting at $39/month. Flexible plans from 1 month to 5 years. Save up to $1,541.",
    url: `${defaultUrl}/pricing`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Pricing Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans – FiooTV | Affordable IPTV Subscription Plans",
    description: "Choose the perfect FiooTV plan for you. Starting at $39/month. Flexible plans from 1 month to 5 years.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/pricing`,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
