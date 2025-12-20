"use client";

import * as React from "react";
import InfiniteSlider from "../../components/ui/infinite-slider";

import video1 from "@/assets/creators-videos/regina.mp4";
import video2 from "@/assets/creators-videos/regina2.mp4";
import video3 from "@/assets/creators-videos/sabina.mp4";
import video4 from "@/assets/creators-videos/sabina2.mp4";
import video5 from "@/assets/creators-videos/sabina3.mp4";
import video6 from "@/assets/creators-videos/sabina4.mp4";

const videos = [video1, video2, video3, video4, video5, video6];

function VideoCard({ src }: { src: string }) {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  // Pause videos when off-screen (saves CPU/battery a lot)
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible) {
          // try to play; browsers can still block occasionally
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-border/60
        bg-card/50
        shadow-[0_25px_80px_-55px_rgba(0,0,0,0.65)]
        backdrop-blur
        h-fit
      "
    >
      {/* Consistent sizing across videos */}
      <div className="relative aspect-[9/16] w-[210px] sm:w-[240px] md:w-[260px]">
        <video
          ref={ref}
          src={src}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className="
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
        />

        {/* Top highlight + bottom readable fade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />

        {/* subtle ring on hover */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition group-hover:ring-white/10" />
      </div>
    </div>
  );
}

export default function VideosSlider() {
  return (
    <section id="videos" className="relative mx-auto w-full max-w-7xl px-3 py-16 text-center md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
          Miami&apos;s top creators <br className="hidden sm:block" /> across every niche
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          Real UGC, real faces, real performance — swipeable proof of quality brands can trust.
        </p>
      </div>

      <div className="relative mt-10">
        {/* Side fades (looks super clean on infinite sliders) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 z-[5] rounded-3xl bg-[radial-gradient(800px_circle_at_50%_20%,rgba(255,255,255,0.10),transparent_55%)]" />

        <InfiniteSlider
          gap={22}
          duration={55}
          className="w-full py-4"
          // If your InfiniteSlider supports it, add: pauseOnHover
          // pauseOnHover
        >
          {videos.map((v) => (
            <VideoCard key={v} src={v} />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
