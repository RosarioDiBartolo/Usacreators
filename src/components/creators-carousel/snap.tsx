import * as React from "react";
import { motion, useMotionValueEvent, useTransform } from "motion/react";
import { useCenterProgress } from "./use-center-progress";

const ScrollCtx = React.createContext<React.RefObject<HTMLDivElement> | null>(null);

type ScrollContainerProps = {
  /** Visual padding left/right so first/last cards can center */
  edgePadding?: number; // px
  /** Classes applied to the *inner track* (gap, padding, etc.) */
  trackClassName?: string;
  /** Classes applied to the *outer scroller* (rarely needed) */
  className?: string;
  children: React.ReactNode;
};

/**
 * Outer scroller (no padding) + inner track (your layout).
 * We pass the *outer scroller* to the hook to keep geometry exact.
 */
export function ScrollContainer({
  edgePadding = 64,
  trackClassName = "flex gap-8 px-6 py-8 snap-x snap-mandatory items-stretch",
  className = "w-full overflow-x-auto",
  children,
}: ScrollContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={className}
      // allows snapping to consider space before/after
      style={{
        scrollSnapType: "x mandatory",
        scrollPaddingLeft: edgePadding,
        scrollPaddingRight: edgePadding,
      }}
    >
      <ScrollCtx.Provider value={containerRef}>
        <div className={trackClassName}>
          {/* real spacers so first/last can center */}
          <div style={{ width: edgePadding, flex: "0 0 auto" }} aria-hidden />
          {children}
          <div style={{ width: edgePadding, flex: "0 0 auto" }} aria-hidden />
        </div>
      </ScrollCtx.Provider>
    </div>
  );
}

type SnapItemProps = {
  children: React.ReactNode;
  /** Optional: scale when centered */
  scaleRange?: [number, number, number]; // [at start, at center, at end]
  /** Optional: show live % debug label */
  debug?: boolean;
  /** Extra classes on the item wrapper */
  className?: string;
};

/**
 * A child that reports/animates by how much it's centered inside the scroller.
 * Returns a motion.div with snap-center and no flex shrinking.
 */
export function SnapItem({
  children,
  scaleRange = [0.8, 1.2, 0.8],
  debug = false,
  className = "snap-center flex-none",
}: SnapItemProps) {
  const containerRef = React.useContext(ScrollCtx);
  if (!containerRef) throw new Error("SnapItem must be inside <ScrollContainer>");

  const itemRef = React.useRef<HTMLDivElement>(null);
  const { progress, signedPercentFromCenter } = useCenterProgress({
    container: containerRef,
    target: itemRef,
    axis: "x",
  });

  // Example effect: scale up at center
  const scale = useTransform(progress, [0, 0.5, 1], scaleRange);

  // Optional debug readout
  const [p, setP] = React.useState(0);
  useMotionValueEvent(progress, "change", (v) => debug && setP(v));
  const absProgresss = useTransform(signedPercentFromCenter, (v) => Math.abs(v)).get().toFixed(1)
  return (
    <motion.div
      ref={itemRef}
      style={{ scale }}
      className={className}
    >
      {children}
      {debug && (
        <div className="mt-2 text-[11px] opacity-70 tabular-nums">
          progress: {(p * 100).toFixed(1)}% &nbsp;(|center|:{" "}
          { absProgresss}%)
        </div>
      )}
    </motion.div>
  );
}
