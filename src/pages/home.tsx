import Header from "@/components/header";
import CreatorsBrands from "@/components/creator-brand";
import Footer from "@/components/footer";
import Videos from "@/components/videos";
import FAQ from "@/components/faq";
import Hero from "@/components/animated-shader-hero";
import Features from "@/components/features";
import SnapScroll from "@/components/snap-scroll";

function Home() {
  return (
    <div className="flex flex-col gap-20">
 
      <Hero />
      <Videos />

      <Features />
      <FAQ />
      <SnapScroll />
      <div>
        <CreatorsBrands />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
