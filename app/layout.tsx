import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FiooTV - Best IPTV Service Provider | 4000+ Live Channels | $15.99/Month",
  description: "FiooTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on TV, smartphones, laptops, and handheld devices. Starting at $15.99/month. Cut the cable and save!",
  keywords: ["IPTV", "TV service", "streaming", "live TV", "cable alternative", "FiooTV", "IPTV service provider", "streaming service"],
  authors: [{ name: "FiooTV" }],
  creator: "FiooTV",
  publisher: "FiooTV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    siteName: "FiooTV",
    title: "FiooTV - Best IPTV Service Provider | 4000+ Live Channels",
    description: "FiooTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on any device starting at $15.99/month.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV - Best IPTV Service Provider",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FiooTV - Best IPTV Service Provider | 4000+ Live Channels",
    description: "FiooTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on any device starting at $15.99/month.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: defaultUrl,
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FiooTV",
    url: defaultUrl,
    logo: `${defaultUrl}/opengraph-image.png`,
    description: "FiooTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on TV, smartphones, laptops, and handheld devices.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-855-561-4578",
      contactType: "Customer Service",
      email: "support@fiootv.com",
      availableLanguage: "English",
    },
    sameAs: [
      // Add social media URLs when available
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "IPTV Streaming Service",
    provider: {
      "@type": "Organization",
      name: "FiooTV",
    },
    areaServed: "Worldwide",
    description: "Premium IPTV streaming service with 4000+ live TV channels, 28K+ movies, 6K+ series, and on-demand content.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "39.00",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "39.00",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  };

  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} font-poppins antialiased bg-black text-white`}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
