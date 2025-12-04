import CarouselHero from "@/pages/catalog/hero";
import Features from "./features";
import SecondSection from "./second-section";
import Header from "@/pages/home/header";
import DemoVideo from "./demo-video";
import BookCall from "./book-call";
import CatalogPreview from "./catalog-preview";
import { useRef } from "react";
import CatalogFAQ from "./faq";

function CatalogPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative min-h-screen     ">
      <Header />

      <main className="relative text-center overflow-hidden space-y-20 md:space-y-24">
        <CarouselHero previewRef={previewRef} />

        <SecondSection />

        <Features />

        <DemoVideo />
        <CatalogFAQ />
        <CatalogPreview previewRef={previewRef} />
        <BookCall />
      </main>
    </div>
  );
}

export default CatalogPage;
