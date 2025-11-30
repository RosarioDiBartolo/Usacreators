import { Link } from "@tanstack/react-router";
import { lazy } from "react";
const HeroCanvas = lazy(() => import("./hero-canvas"));

export default function Hero() {
  return (
    <HeroCanvas className=" rounded-b-[8rem]">
      {/* Trust Badge */}
      <div className="mb-8 animate-fade-in-down">
        <div className="flex items-center gap-2 px-6 py-3 bg-primary/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
          {
            <div className="flex">
              {["✨"].map((icon, index) => (
                <span
                  key={index}
                  className={`text-${
                    index === 0 ? "yellow" : index === 1 ? "orange" : "amber"
                  }-300`}
                >
                  {icon}
                </span>
              ))}
            </div>
          }
          <span className="text-orange-100">
            Trusted by forward-thinking teams.
          </span>
        </div>
      </div>

      <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
        {/* Main Heading with Animation */}
        <h1 className="space-y-2">
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
            Miami's Top
          </span>
          <br />
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
            Content Creators and Influencers
          </span>
        </h1>

        {/* Subtitle with Animation */}
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
          <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed">
            We connect <span className="text-white">brands</span> with our's top{" "}
            <span className="text-white">content creators</span> for authentic,
            engaging social media <br />
            presence.{" "}
          </p>
        </div>

        {/* CTA Buttons with Animation */}
        {
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800">
            <button
              onClick={() => {
                throw new Error("Sentry Test Error");
              }}
            >
              Break the world
            </button>
            {
              <Link to={"/creators/apply"}>
                <button className="px-8 w-full sm:w-fit py-4 bg-gradient-to-r from-primary to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
                  I am a Creator
                </button>
              </Link>
            }
            {
              <Link to={"/catalog"}>
                <button className="px-8  w-full sm:w-fit py-4 bg-primary/10 hover:bg-primary/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  I am a Brand
                </button>
              </Link>
            }
          </div>
        }
      </div>
    </HeroCanvas>
  );
}
