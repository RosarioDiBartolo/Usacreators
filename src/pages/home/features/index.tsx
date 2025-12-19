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
    <section id="features" className="px-3 py-16 text-center md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-tight md:text-5xl">
          Brand <span className="text-foreground-focus">features</span>
        </h2>

        <p className="
            font-normal
            text-balance
            text-base
            sm:text-lg
            leading-relaxed
            text-foreground">
          Everything creators need to look legit, get discovered, and start working with local Miami brands faster.
        </p>

        <div className="mt-10">
          <Carousel items={items} autoPlay interval={5000} />
        </div>
      </div>
    </section>
  );
}

export default Features;
