import Carousel from "./carousel";
import { Button } from "./ui/button";

function BrandSection() {
  return (
    <section
      id="brand"
      aria-label="Creators Catalog"
      className="relative mx-auto max-w-[90rem] md:rounded-[100px] h-full text-center lg:text-left font-bold text-primary-foreground
                 bg-gradient-to-b from-orange-300/40 via-orange-600 to-orange-800 py-20"
    >
      <div className="px-6 md:px-10 xl:px-24 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto ">

          {/* Left: Carousel */}
          <Carousel />

          {/* Right: Copy + CTA */}
          <div className="flex flex-col justify-end max-w-2xl mx-auto lg:mx-0 space-y-6 tracking-wide">
            <h1 className="text-balance text-5xl md:text-7xl font-extrabold tracking-tighter">
              Discover Content Creators for your{" "}
              <span className="bg-gradient-to-b from-secondary to-secondary bg-clip-text text-transparent">
                Brand
              </span>
            </h1>

            <h2 className="max-w-xl font-extralight text-orange-00">
              We’ve already onboarded top creators ready to deliver on-brand content for your business purposes.
            </h2>

            <Button
              variant="secondary"
              size="none"
              className="rounded-full w-fit lg:mx-0 mx-auto px-8 py-4 text-xl md:text-2xl font-light hover:-translate-y-3 transition-all duration-200 hover:opacity-90 active:scale-85"
              aria-label="Apply as a Creator"
            >
              Browse our Catalog
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BrandSection;
