import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/services-hero-section";
import { ServicesIntroSection } from "@/components/services-intro-section";
import { ServicesFeaturesSection } from "@/components/services-features-section";
import { CTABannerSection } from "@/components/cta-banner-section";
import { ByTheNumbersSection } from "@/components/by-the-numbers-section";
import { ContentLibrarySection } from "@/components/content-library-section";
import { ServicesFinalCTASection } from "@/components/services-final-cta-section";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "IPTV Services – FiooTV | Premium Streaming & Live TV Channels",
  description: "Discover FiooTV's premium IPTV services. Access thousands of live TV channels, movies, series, and on-demand content. Multi-device support, HD quality streaming, and 24/7 customer support.",
  keywords: ["IPTV services", "live TV streaming", "IPTV provider", "streaming service", "TV channels", "on-demand content", "FiooTV services"],
  openGraph: {
    title: "IPTV Services – FiooTV | Premium Streaming & Live TV Channels",
    description: "Discover FiooTV's premium IPTV services. Access thousands of live TV channels, movies, series, and on-demand content.",
    url: `${defaultUrl}/services`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV IPTV Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV Services – FiooTV | Premium Streaming & Live TV Channels",
    description: "Discover FiooTV's premium IPTV services. Access thousands of live TV channels, movies, series, and on-demand content.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHeroSection />
      <ServicesIntroSection />
      <ServicesFeaturesSection />
      <CTABannerSection />
      <ByTheNumbersSection />
      <ContentLibrarySection />
      <ServicesFinalCTASection />
    </main>
  );
}
