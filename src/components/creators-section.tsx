import React, { useMemo } from "react";
import Carousel from "./carousel";
import { Component as ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Globe } from "lucide-react";

const BRAND_LOGOS = ["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne", "Hooli"];

const CREATOR_CATEGORIES = [
  "App Creators",
  "UGC Creators",
  "Short‑form Editors",
  "Voiceover Artists",
  "Fitness & Nutrition",
  "Fashion & Beauty",
  "Food & Hospitality",
  "Real Estate",
  "Automotive",
  "Tech & SaaS",
];

const PERKS = [
  "Get inbound brand requests (no cold DMs)",
  "Global exposure with geo‑targeting",
  "Keep ownership of your content",
  "Weekly featured creator spotlight",
  "Fast payouts & transparent briefs",
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function LogosMarquee() {
  return (
    <div className=" w-full backdrop-brightness-50  border-y border-yellow-400/40 ">
      <div
        className="flex gap-10 py-4 animate-[scroll_x_25s_linear_infinite] whitespace-nowrap"
        aria-label="Brands that work with our creators"
      >
        {BRAND_LOGOS.concat(BRAND_LOGOS).map((name, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 ring-1 ring-white/10"
          >
            <Globe className="h-4 w-4" aria-hidden />
            <span className="text-sm text-yellow-100/80 tracking-wide">{name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll_x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
function CategoryChips() {
  // Precompute random positions for each category
  const randomized = useMemo(() =>
    CREATOR_CATEGORIES.map((c) => ({
      label: c,
      top: Math.random() * 80,   // percentage
      left: Math.random() * 80,  // percentage
    })), []
  );

  return (
    <div className=" w-full">
      {randomized.map((item, i) => (
        <span
          key={i}
          className="absolute inline-flex items-center gap-2 rounded-full 
                     border border-yellow-400/40 bg-white/5 
                     px-4 py-1.5 text-sm text-yellow-100/90 
                     shadow-sm hover:scale-110 transition-transform"
          style={{ top: `${item.top}%`, left: `${item.left}%` }}
        >
          <Sparkles className="h-4 w-4" />
          {item.label}
        </span>
      ))}
    </div>
  );
}


function PerkList() {
  return (
    <ul className="mt-6 space-y-3" aria-label="Perks">
      {PERKS.map((p) => (
        <li key={p} className="flex justify-center gap-3 text-yellow-50/90">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-400" aria-hidden />
          <span className="text-base leading-relaxed">{p}</span>
        </li>
      ))}
    </ul>
  );
}

function TinyStats() {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-center">
      {[
        { k: ">12k", v: "Creators" },
        { k: "3.4k", v: "Brands" },
        { k: "48h", v: "Avg. Response" },
      ].map((s) => (
        <div key={s.v} className="rounded-xl border border-white/10 bg-white/5 px-3 py-4">
          <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-amber-400">
            {s.k}
          </div>
          <div className="text-xs uppercase tracking-wide text-yellow-100/70">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

export default function CreatorsSection() {
  return (
    <div className=" ">
    <section
      id="brand"
      className="max-w-[90rem]  mx-auto border-yellow-400 bg-gradient-to-b from-primary/70   to-amber-100  text-start font-bold text-primary-foreground"
      aria-labelledby="creators-heading"
    >
      <div className="w-full overflow-hidden">
        <div className="mx-auto flex flex-col justify-between text-center w-full    items-center gap-12 px-6 py-20 xl:px-16">
          <div className="order-2 xl:order-1">
            <div className="">
              <ImageAutoSlider />
            </div>
            <div className="mt-4 flex items-center gap-3 text-yellow-100/80">
              <ShieldCheck className="h-5 w-5" aria-hidden />
              <span className="text-sm font-medium">Verified briefs. Clear usage rights. You stay in control.</span>
            </div>
          </div>

          <div className="order-1 xl:order-2 flex-1">
            <h2
              id="creators-heading"
              className="mt-2 bg-gradient-to-t from-yellow-300 to-yellow-100 bg-clip-text pb-2 text-5xl md:text-6xl text-transparent"
            >
              Apply to our catalog
            </h2>

            <p className="mt-3 max-w-xl text-balance bg-gradient-to-t from-stone-500 via-yellow-100 to-yellow-100 bg-clip-text text-lg font-semibold text-transparent">
              Join our catalog and get contacted by brands from all over the world.
            </p>

            <PerkList />
            <TinyStats />

            <form
              className="mt-8 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We'll be in touch.");
              }}
              aria-label="Quick apply"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Your email"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-gradient-to-b from-stone-300 to-stone-800 px-5 py-3 text-lg font-extrabold uppercase tracking-wide text-transparent bg-clip-text shadow-lg hover:scale-[1.01] active:scale-[.99]"
                aria-label="Submit application"
              >
                <span className="bg-gradient-to-b from-secondary-foreground to-amber-500 bg-clip-text text-transparent">Apply now</span>
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </form>

            <div className="mt-4 text-sm text-yellow-100/80">
              Prefer a quick call? <a href="#book" className="underline decoration-dotted underline-offset-4 hover:text-yellow-50">Book a 10‑min intro</a>.
            </div>
          </div>
        </div>
      </div>


      <style jsx>{`
        .text-balance { text-wrap: balance; }
      `}</style>
    </section>
    </div>
  );
}
