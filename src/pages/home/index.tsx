import CreatorsBrands from "@/pages/home/creator-brand";
import Footer from "@/pages/home/footer";
import Videos from "@/pages/home/videos";
import FAQ from "@/pages/home/faq";
import Hero from "@/pages/home/hero";
import Features from "@/pages/home/features";
import Header from "@/pages/home/header";

function Home() {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-25">

        <Hero />
        <Videos />

        <Features />
        <FAQ />
        <div>
          <CreatorsBrands />
          <Footer />
        </div>
      </div>
    </>

  );
}

export default Home;
