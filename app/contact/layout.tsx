import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Contact Us – FiooTV | Get Support & Help",
  description: "Contact FiooTV support team. Email us at support@fiootv.com or call +1-855-561-4578. Get help with setup, billing, technical issues, or general inquiries. We're here to help!",
  keywords: ["FiooTV contact", "IPTV support", "customer service", "FiooTV help", "contact IPTV provider", "streaming support"],
  openGraph: {
    title: "Contact Us – FiooTV | Get Support & Help",
    description: "Contact FiooTV support team. Email us at support@fiootv.com or call +1-855-561-4578. Get help with setup, billing, or technical issues.",
    url: `${defaultUrl}/contact`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Contact FiooTV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us – FiooTV | Get Support & Help",
    description: "Contact FiooTV support team. Email us at support@fiootv.com or call +1-855-561-4578.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
