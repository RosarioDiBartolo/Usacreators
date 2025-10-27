import Features from "@/components/features/features-sections";
import Header from "@/components/header";
import CreatorsBrands from "@/components/creator-brand";
import Footer from "@/components/footer";
import VideosSlider from "@/components/videos-slider";
import FAQ from "@/components/faq";
import Hero from "@/components/animated-shader-hero";
import { Carousel } from "@/components/features-carousel";
import { CarouselItem } from "@/components/carousel-item";
import csrc from "@/assets/good-faces-T4p72-fc2_A-unsplash.jpg"
  const items = [
    <CarouselItem key="1" title="The home of Miami's top creators and brands" description="Join the largest catalog of verified creators in Miami. Get discovered by local brands, collaborate on real campaigns, and access exclusive research tools built to grow your influence." image={csrc} />,
    <CarouselItem key="2" title="Slide 2" description="Second cool card" image="/img2.jpg" />,
    <CarouselItem key="3" title="Slide 3" description="Third awesome card" image="/img3.jpg" />,
  ]
function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Header />

      <Hero />
      <VideosSlider />
      <Features />
      

   <Carousel items={items} autoPlay interval={5000} />
      <FAQ />
      <CreatorsBrands />
      <Footer />
    </div>
  );
}

export default Home;
