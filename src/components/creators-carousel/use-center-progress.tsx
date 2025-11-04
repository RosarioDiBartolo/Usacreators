// useCenterProgress.ts
import * as React from "react";
import { useScroll, useTransform, MotionValue } from "motion/react";

type Axis = "x" | "y";

export function useCenterProgress({
  container,
  target,
  axis = "x",
  clamp = true,
}: {
  container?: React.RefObject<HTMLElement | null>;
  target: React.RefObject<HTMLElement | null>;
  axis?: Axis;
  clamp?: boolean;
}): {
  progress: MotionValue<number>;                // 0..1  (0=start, .5=center, 1=end)
  percent: MotionValue<number>;                 // 0..100
  signedFromCenter: MotionValue<number>;        // -1..+1  (-1 = left/top edge, 0 = centered, +1 = right/bottom edge)
  signedPercentFromCenter: MotionValue<number>; // -100..+100
} {
  const { scrollXProgress, scrollYProgress } = useScroll({
    container,
    target,
    axis,
    // child's CENTER vs container START/END → maps exactly 0 → 0.5 → 1
    offset: ["center start", "center end"],
  });

  const raw = axis === "x" ? scrollXProgress : scrollYProgress;
  const clamped = useTransform(raw, (v) => Math.max(0, Math.min(1, v)))  
  const progress = clamp
    ?  clamped
    : raw;

  const percent = useTransform(progress, (v) => v * 100);
  const signedFromCenter = useTransform(progress, (v) => (v - 0.5) * 2);
  const signedPercentFromCenter = useTransform(progress, (v) => (v - 0.5) * 200);

  return { progress, percent, signedFromCenter, signedPercentFromCenter };
}
