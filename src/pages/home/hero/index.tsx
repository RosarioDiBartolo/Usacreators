import { Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Building2, ArrowRight } from "lucide-react";

const HeroCanvas = lazy(() => import("./hero-canvas"));

export default function Hero() {
  return (
    <section id="hero">
      <Suspense
        fallback={
          <div className="h-[95vh] rounded-b-[4rem] bg-black/40" aria-hidden />
        }
      >
        <HeroCanvas className="h-[95vh] rounded-b-[4rem]">
          {/* Trust Badge */}
          <div className="my-8 animate-fade-in-down">
            <div className="flex items-center gap-2 px-6 py-3 bg-primary/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
              <span className="text-yellow-300">✨</span>
              <span className="text-orange-100">
                Trusted by forward-thinking teams.
              </span>
            </div>
          </div>

          <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
            {/* Main Heading */}
            <h1 className="space-y-2">
              <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
                Miami&apos;s Top
              </span>
              <br />
              <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
                Content Creators and Influencers
              </span>
            </h1>

            {/* Subtitle */}
            <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
              <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed">
                We connect <span className="text-white">brands</span> with
                Miami&apos;s top{" "}
                <span className="text-white">content creators</span> for
                authentic, engaging social media <br />
                presence.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800">
              <Link to="/creators/apply" aria-label="Apply as a Creator">
                <Button
                  size="lg"
                  className="
                  group w-full sm:w-fit px-8 py-7 rounded-full
                  bg-gradient-to-r from-primary to-yellow-500
                  hover:from-orange-600 hover:to-yellow-600
                  text-white/90 hover:text-white
                  transition-all duration-300
                  hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/25
                  focus-visible:ring-2 focus-visible:ring-orange-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                "
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 opacity-90" />
                    <span>I am a Creator</span>
                    <ArrowRight className="h-5 w-5 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                </Button>
              </Link>
              <Link
                to="/catalog"
                aria-label="Browse the Creator Catalog as a Brand"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="
                  group w-full sm:w-fit px-8 py-7 rounded-full
                  bg-primary/10 hover:bg-primary/20
                  border border-orange-300/30 hover:border-orange-300/50
                  text-orange-100
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:scale-[1.03]
                  focus-visible:ring-2 focus-visible:ring-orange-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                "
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 opacity-90" />
                    <span>I am a Brand</span>
                    <ArrowRight className="h-5 w-5 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </HeroCanvas>
      </Suspense>
    </section>
  );
}
