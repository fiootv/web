import { ServicesHeroSection } from "@/components/services-hero-section";
import { ServicesIntroSection } from "@/components/services-intro-section";
import { ServicesFeaturesSection } from "@/components/services-features-section";
import { CTABannerSection } from "@/components/cta-banner-section";
import { ByTheNumbersSection } from "@/components/by-the-numbers-section";
import { ContentLibrarySection } from "@/components/content-library-section";
import { ServicesFinalCTASection } from "@/components/services-final-cta-section";

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
