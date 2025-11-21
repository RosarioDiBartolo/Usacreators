import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Sparkles, PhoneCall } from "lucide-react";

function DemoVideo() {
  return (
    <section className="px-4 py-14 md:py-20 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left copy */}
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-900/90 dark:bg-amber-950/40 dark:text-amber-100">
            <Sparkles className="h-3.5 w-3.5" />
            <span>See the catalog in action</span>
          </div>

          <h2 className="mt-4 bg-text bg-linear-to-b from-secondary via-amber-900 to-amber-950">
            Watch the Demo
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed max-w-xl text-muted-foreground">
            In this short walkthrough we show you exactly how brands use Miami
            Creators to discover local UGC talent, review example content and
            organize their next campaign in just a few clicks.
          </p>

          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>How the catalog is structured for fast decision-making.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>What kind of data you see on each creator profile.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>How we support you from first shortlist to signed brief.</span>
            </li>
          </ul>

          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button className="inline-flex items-center justify-center gap-2">
              <PlayCircle className="h-4 w-4" />
              Watch the demo
            </Button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-900/80 dark:text-amber-100/90 underline-offset-4 hover:underline"
            >
              <PhoneCall className="h-4 w-4" />
              Prefer a live walkthrough? Book a call
            </button>
          </div>
        </div>

        {/* Right: video card */}
        <div className="flex-1 w-full max-w-xl mx-auto">
          <div className="relative aspect-video rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-900 p-[2px] shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
            <div className="relative h-full w-full rounded-3xl  bg-muted overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
              <div className="relative flex flex-col items-center gap-3 text-center px-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 rounded-full border-amber-100/80 bg-white/90 hover:bg-white"
                >
                  <PlayCircle className="h-8 w-8 text-amber-700" />
                </Button>
                <p className="text-sm md:text-base text-amber-50/95 max-w-sm">
                  Get a first look at how your team will browse, filter and
                  shortlist Miami creators inside the platform.
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-amber-200/90">
                  <Clock className="h-3.5 w-3.5" />
                  <span>2–3 minute walkthrough · No fluff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoVideo;
