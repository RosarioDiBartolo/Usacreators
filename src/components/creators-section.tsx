import { Link } from "react-router-dom";
import Carousel from "./carousel";
import { Button } from "./ui/button";

function CreatorsSection() {
  return (
    <section
      id="brand"
      aria-label="Creators Catalog"
      className="relative mx-auto h-[932px] max-w-[90rem] rounded-[100px] text-center lg:text-left font-bold text-primary-foreground
                 bg-gradient-to-b from-violet-300/40 via-violet-600 to-violet-800 py-20"
    >
      <div className="w-full px-6 md:px-10 xl:px-24 ">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
          {/* Left: Carousel */}
          <div className=" order-2 w-full">
            <Carousel />
          </div>

          {/* Right: Copy + CTAs */}
          <div className="order-2 lg:order-1 mx-auto w-full max-w-2xl tracking-wide space-y-6">
            <h1 className="text-balance text-5xl md:text-7xl font-extrabold tracking-tighter">
              Join our{" "}
              <span className="bg-gradient-to-b from-secondary to-secondary bg-clip-text text-transparent">
                Creators
              </span>{" "}
              Catalog
            </h1>

            <h2 className="mx-auto hidden md:block lg:mx-0 max-w-xl font-semibold text-secondary text-2xl md:text-3xl">
              We collaborate with Miami’s top creators producing
              high-performing, on-brand content for local businesses.
            </h2>

            <h3
              className="text-balance font-extralight text-2xlleading-snug
                           bg-clip-text text-transparent bg-gradient-to-b from-stone-100 to-stone-300"
            >
              Get discovered by brands that match your niche and start landing
              paid collaborations effortlessly.
            </h3>

            <div className="flex flex-col  sm:flex-row gap-4 pt-2">
              <Button
                asChild
                variant="secondary"
                size="none"
                className="rounded-full mx-auto   px-8 py-4 text-xl md:text-2xl font-light hover:-translate-y-3
                           transition-all duration-200 hover:opacity-90 active:scale-85"
                aria-label="Become a Creator"
              >
                <Link to={"/creators"}>Become a Creator</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatorsSection;
