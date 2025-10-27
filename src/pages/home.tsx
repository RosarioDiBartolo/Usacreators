import Header from "@/components/header";
import CreatorsBrands from "@/components/creator-brand";
import Footer from "@/components/footer";
import Videos from "@/components/videos";
import FAQ from "@/components/faq";
import Hero from "@/components/animated-shader-hero";
import Features from "@/components/features";

function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Header />

      <Hero />
      <Videos  />

      <Features />
      <FAQ />
      <CreatorsBrands />
      <Footer />
    </div>
  );
}

export default Home;
