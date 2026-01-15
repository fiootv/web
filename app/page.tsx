import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { ByTheNumbersSection } from "@/components/by-the-numbers-section";
import { ContentLibrarySection } from "@/components/content-library-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { CTABannerSection } from "@/components/cta-banner-section";
import { PopularMoviesSection } from "@/components/popular-movies-section";
import { FAQSection } from "@/components/faq-section";
import { ReviewsSection } from "@/components/reviews-section";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <ByTheNumbersSection />
        <ContentLibrarySection />
        <WhyChooseSection />
        <CTABannerSection />
        <PopularMoviesSection />
        <FAQSection />
        <ReviewsSection />
      </Suspense>
    </main>
  );
}
