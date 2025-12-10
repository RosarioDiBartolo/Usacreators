import * as React from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useCenterProgress } from "./use-center-progress";
import { cn } from "@/lib/client-only/utils";
// OPTIONAL: if you use lucide-react already
import { ChevronLeft, ChevronRight } from "lucide-react";

  const ScrollCtx = React.createContext<
  React.RefObject<HTMLDivElement | null> | undefined
>(undefined);
export const ScrollProvider = ScrollCtx.Provider;
type ScrollContainerProps = {
  className?: string;
  children: React.ReactNode;
};

/** Inner track */
export const ScrollContent = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      "h-full flex items-center gap-16 px-6 py-8 snap-x snap-mandatory",
      className
    )}
  >
    {children}
  </div>
);

/** Desktop arrows that control the same scroll container */
function ScrollArrows() {
  const containerRef = React.useContext(ScrollCtx);

  if (!containerRef) return null;

  const scrollByDirection = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    const amount = el.clientWidth  * 0.3; // ~one viewport "page"
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Left arrow */}
      <button
        type="button"
        className="hidden lg:flex absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-900/80 dark:ring-zinc-700"
        onClick={() => scrollByDirection("left")}
      >
        <span className="sr-only">Previous</span>
        {/* use icon if imported, fallback to ‹ */}
        {ChevronLeft ? <ChevronLeft className="h-4 w-4" /> : "‹"}
      </button>

      {/* Right arrow */}
      <button
        type="button"
        className="hidden lg:flex absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-900/80 dark:ring-zinc-700"
        onClick={() => scrollByDirection("right")}
      >
        <span className="sr-only">Next</span>
        {ChevronRight ? <ChevronRight className="h-4 w-4" /> : "›"}
      </button>
    </>
  );
}



 
export function ScrollContainer({ className, children }: ScrollContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <ScrollCtx.Provider value={containerRef}>
      <div className="relative rounded-full  overflow-hidden w-fit max-w-full mx-auto">
        <ScrollArrows />
         <div
          ref={containerRef}
          className={cn(
            "container    [scrollbar-width:none]  [&::-webkit-scrollbar]:hidden mx-auto relative overflow-x-auto",
            className
          )}
          style={{
            scrollSnapType: "x mandatory",
          }}
        >
          {/* Desktop only controls */}
          {/* real spacers / content */}
          {children}
        </div>
      </div>
    </ScrollCtx.Provider>
  );
}

type SnapItemProps = {
  children: React.ReactNode;
  scaleRange?: [number, number, number];
  debug?: boolean;
  className?: string;
};

export function SnapItem({
  children,
  scaleRange = [0.6, 1.2, 0.6],
  debug = false,
  className = "snap-center flex-none",
}: SnapItemProps) {
  const containerRef = React.useContext(ScrollCtx);
  if (!containerRef)
    throw new Error("SnapItem must be inside <ScrollContainer>");
      
  const itemRef = React.useRef<HTMLDivElement>(null);
  const { progress, signedPercentFromCenter } = useCenterProgress({
    container: containerRef,
    target: itemRef,
    axis: "x",
  });

  const scale = useTransform(progress, [0, 0.5, 1], scaleRange);
  const zIndex = useTransform(progress, [0, 0.5, 1], [1, 10, 1]);
  const y = useTransform(progress, [0, 0.5, 1], [0, 0, 0]);

  const [p, setP] = React.useState(0);
  useMotionValueEvent(progress, "change", (v) => debug && setP(v));
  const absProgresss = useTransform(signedPercentFromCenter, (v) => Math.abs(v))
    .get()
    .toFixed(1);

  return (
    <motion.div
      ref={itemRef}
      style={{ scale, zIndex, y }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ progress: MotionValue<number> }>,
              { progress }
            )
          : child
      )}
      {debug && (
        <div className="mt-2 text-[11px] opacity-70 tabular-nums">
          progress: {(p * 100).toFixed(1)}% &nbsp;(|center|: {absProgresss}%)
        </div>
      )}
    </motion.div>
  );
}
