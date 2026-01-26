import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Order Confirmed – FiooTV | Thank You for Your Purchase",
  description: "Thank you for your FiooTV subscription order! Your order has been received and will be processed shortly. You'll receive a confirmation email with setup instructions.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Order Confirmed – FiooTV | Thank You for Your Purchase",
    description: "Thank you for your FiooTV subscription order! Your order has been received and will be processed shortly.",
    url: `${defaultUrl}/checkout-success`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Order Confirmed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Confirmed – FiooTV | Thank You for Your Purchase",
    description: "Thank you for your FiooTV subscription order! Your order has been received.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/checkout-success`,
  },
};

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
