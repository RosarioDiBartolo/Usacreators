import Features from "@/components/features/features-sections";
import Header from "@/components/header";
import CreatorsBrands from "@/components/creator-brand";
import Footer from "@/components/footer";
import VideosSlider from "@/components/videos-slider";
import FAQ from "@/components/faq";
import Hero from "@/components/animated-shader-hero";

function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Header />

      <Hero />
      <VideosSlider />
      <Features />
      <FAQ />
      <CreatorsBrands />
      <Footer />
    </div>
  );
}

export default Home;
