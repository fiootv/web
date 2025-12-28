import { HeroSection } from "@/components/hero-section";
import { ByTheNumbersSection } from "@/components/by-the-numbers-section";
import { ContentLibrarySection } from "@/components/content-library-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ByTheNumbersSection />
      <ContentLibrarySection />
    </main>
  );
}
