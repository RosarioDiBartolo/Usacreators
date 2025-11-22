import CarouselHero from "@/components/creators-carousel";
import PricingSection from "@/pages/catalog/pricing-section";
import Features from "./features";
import SecondSection from "./second-section";
import Header from "@/pages/home/header";
import DemoVideo from "./demo-video";
import BusinessSolution from "./business-solution";
import BookCall from "./book-call";

function CatalogPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-amber-50/40 to-background dark:from-background dark:via-amber-950/30 dark:to-background">
      <Header />

      <main className="relative text-center overflow-hidden space-y-20 md:space-y-24">
        <CarouselHero />

        <SecondSection />

        <Features />

        <DemoVideo />
        <BookCall />
        <BusinessSolution />

        <PricingSection />
      </main>
    </div>
  );
}

export default CatalogPage;
