import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Message Sent – FiooTV | Thank You for Contacting Us",
  description: "Thank you for contacting FiooTV! We've received your message and will get back to you soon. Our support team typically responds within 24 hours.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Message Sent – FiooTV | Thank You for Contacting Us",
    description: "Thank you for contacting FiooTV! We've received your message and will get back to you soon.",
    url: `${defaultUrl}/contact-success`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV Contact Success",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Message Sent – FiooTV | Thank You for Contacting Us",
    description: "Thank you for contacting FiooTV! We've received your message and will get back to you soon.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/contact-success`,
  },
};

export default function ContactSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
