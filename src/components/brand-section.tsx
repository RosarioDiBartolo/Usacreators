import Carousel from "./carousel";
import { Button } from "./ui/button";

function BrandSection() {
  return (
    <section
      id="brand"
      aria-label="Creators Catalog"
      className="relative mx-auto h-fit max-w-[90rem] rounded-[100px] text-center lg:text-left font-bold text-primary-foreground
                 bg-gradient-to-b from-orange-300/40 via-orange-600 to-orange-800 py-20"
    >
      <div className="w-full px-6 md:px-10 xl:px-24 ">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
          
          {/* Left: Carousel */}
          <div className=" order-1 w-full">
            <Carousel />
          </div>

          {/* Right: Copy + CTAs */}
          <div className="order-1 lg:order-2 mx-auto w-full max-w-2xl tracking-wide space-y-6">
            <h1 className="text-balance text-5xl md:text-7xl font-extrabold tracking-tighter">
              Discover Content Creators for your {" "} 
              <span className="bg-gradient-to-b from-secondary to-secondary bg-clip-text text-transparent">
                Brand
              </span>{" "}
               
            </h1>

            <h2 className="mx-auto    lg:mx-0 max-w-xl font-extralight text-orange-00 ">
              We’ve already onboarded top creators ready to deliver on-brand content for your business purposes.
            </h2>

         

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="secondary"
                size="none"
                className="rounded-full mx-auto lg: px-8 py-4 text-xl md:text-2xl font-light hover:-translate-y-3
                           transition-all duration-200 hover:opacity-90 active:scale-85"
                aria-label="Apply as a Creator"
              >
                Browse our Catalog
              </Button>

              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BrandSection;
