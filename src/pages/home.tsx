import CreatorsBrands from "@/components/creator-brand";
import Footer from "@/components/footer";
import Videos from "@/components/videos";
import FAQ from "@/components/faq";
import Hero from "@/components/pricing/animated-shader-hero";
import Features from "@/components/features";
import Header from "@/components/header";

function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Header />

      <Hero />
      <Videos />

      <Features />
      <FAQ />
      <div>
        <CreatorsBrands />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
