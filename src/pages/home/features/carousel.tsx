"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/client-only/utils";

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, scale: 0.98 }),
};

export function Carousel({
  items,
  autoPlay = false,
  interval = 4500,
  className,
}: CarouselProps) {
  const count = items.length;

  const [[current, direction], setState] = React.useState<[number, number]>([
    0, 1,
  ]);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = React.useState(false);

  const goTo = React.useCallback(
    (index: number) => {
      if (count === 0) return;
      const nextIndex = (index + count) % count;
      const dir = nextIndex > current ? 1 : -1;
      setState([nextIndex, dir]);
    },
    [count, current]
  );

  const next = React.useCallback(() => {
    if (count === 0) return;
    setState(([prev]) => [(prev + 1) % count, 1]);
  }, [count]);

  const prev = React.useCallback(() => {
    if (count === 0) return;
    setState(([prev]) => [(prev - 1 + count) % count, -1]);
  }, [count]);

  // Autoplay
  React.useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => next(), interval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoPlay, paused, interval, next, current, count]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  if (count === 0) return null;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-6xl",
        "select-none",
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Features carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slide area */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_25px_80px_-45px_rgba(0,0,0,0.55)]">
        {/* soft glow / vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_20%,rgba(255,255,255,0.10),transparent_55%)]" />

        <div className="relative h-[54vh] min-h-[360px] md:h-[560px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;
                if (offset < -80 || velocity < -600) next();
                else if (offset > 80 || velocity > 600) prev();
              }}
            >
              {items[current]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        {count > 1 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 md:px-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={prev}
              aria-label="Previous slide"
              className={cn(
                "pointer-events-auto",
                "h-11 w-11 rounded-full",
                "bg-background/70 backdrop-blur-md",
                "border border-border/60",
                "shadow-sm",
                "hover:bg-background/85"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={next}
              aria-label="Next slide"
              className={cn(
                "pointer-events-auto",
                "h-11 w-11 rounded-full",
                "bg-background/70 backdrop-blur-md",
                "border border-border/60",
                "shadow-sm",
                "hover:bg-background/85"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2 backdrop-blur-md">
              {items.map((_, index) => {
                const active = index === current;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={active ? "true" : "false"}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      active ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                    )}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
