import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Checkout – FiooTV | Complete Your IPTV Subscription Order",
  description: "Complete your FiooTV subscription order. Secure checkout with multiple payment options. Enter your billing details and place your order.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Checkout – FiooTV | Complete Your IPTV Subscription Order",
    description: "Complete your FiooTV subscription order. Secure checkout with multiple payment options.",
    url: `${defaultUrl}/checkout`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Checkout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout – FiooTV | Complete Your IPTV Subscription Order",
    description: "Complete your FiooTV subscription order. Secure checkout with multiple payment options.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/checkout`,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
