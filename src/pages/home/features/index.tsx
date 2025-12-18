import { Carousel } from "./carousel";
import { CarouselItem } from "./carousel-item";
import img1 from "@/assets/features-carousel/phone.jpg";

import img2 from "@/assets/features-carousel/phone2.jpg";
import img3 from "@/assets/features-carousel/portatili.jpg";
import img4 from "@/assets/features-carousel/portatili2.jpg";

const items = [
  <CarouselItem
    key="1"
    title="Local reach, global impact"
    description="Be part of a focused Miami network while connecting to worldwide opportunities."
    image={img1}
  />,
  <CarouselItem
    key="2"
    title="Brand connections"
    description="Match with verified Miami-based brands and agencies looking for local talent."
    image={img2}
  />,
  <CarouselItem
    key="3"
    title="Verified profiles"
    description="Every creator is reviewed to ensure trust, authenticity, and real impact."
    image={img3}
  />,
  <CarouselItem
    key="4"
    title="Instant exposure"
    description="Get featured in campaigns, lists, and brand searches as soon as you join."
    image={img4}
  />,
];

function Features() {
  return (
    <section
      id="features"
      className="
    px-3
    text-center "
    >
      <div className="relative max-w-7xl mx-auto
       
      ">
        <h2
          className="
          w-full
          text-white/70
        text-5xl md:text-6xl
       leading-tight md:leading-snug
        font-normal
        capitalize
        absolute  inset-0 h-fit mx-auto   z-10
        text-center
         
      
    "
        >
          Brand <span className=" text-white"> features </span> 
        </h2>
        <Carousel items={items}   interval={5000} />
      </div>
    </section>
  );
}

export default Features;
