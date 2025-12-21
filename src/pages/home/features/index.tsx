import { Carousel } from "./carousel";
import { CarouselItem } from "./carousel-item";

import img1 from "@/assets/features-carousel/phone.jpg";
import img2 from "@/assets/features-carousel/phone2.jpg";
import img3 from "@/assets/features-carousel/portatili.jpg";
import img4 from "@/assets/features-carousel/portatili2.jpg";

/* ---------- DATA (no JSX, no key) ---------- */
const carouselItems = [
  {
    title: "Local reach, global impact",
    description:
      "Be part of a focused Miami network while connecting to worldwide opportunities.",
    image: img1,
  },
  {
    title: "Brand connections",
    description:
      "Match with verified Miami-based brands and agencies looking for local talent.",
    image: img2,
  },
  {
    title: "Verified profiles",
    description:
      "Every creator is reviewed to ensure trust, authenticity, and real impact.",
    image: img3,
  },
  {
    title: "Instant exposure",
    description:
      "Get featured in campaigns, lists, and brand searches as soon as you join.",
    image: img4,
  },
];

function Features() {
  const items = carouselItems.map((item) => (
    <CarouselItem
      key={item.title} // ✅ key added here
      title={item.title}
      description={item.description}
      image={item.image}
    />
  ));

  return (
    <section id="features" className="px-3 py-16 text-center md:py-24">
      <div className="mx-auto max-w-7xl">
        <Carousel items={items} interval={100}>
          <h2 className=" absolute z-10 text-gray-300/80  inset-0 h-fit    mx-auto max-w-3xl text-balance text-4xl font-medium leading-loose md:text-5xl">
            Brand <span className="">features</span>
          </h2>
        </Carousel>
      </div>
    </section>
  );
}

export default Features;
