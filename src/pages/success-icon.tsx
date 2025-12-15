import * as React from "react";
import { motion } from "motion/react";

type Props = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** set true if you want it to loop forever */
  loop?: boolean;
};

export function AnimatedCheckIcon({
  size = 24,
  strokeWidth = 2.5,
  className,
  loop = false,
}: Props) {
  const transition = {
    duration: 0.6,
    ease: "easeInOut" as const,
  };

  return (
    <motion.svg
    initial={{
  y: 12,
  opacity: 0,
}}
animate={{
  y: 0,
  opacity: 1,
}}
transition={{
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1], // easeOutCubic
}}

      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circle draws first */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={
          loop
            ? { pathLength: [0, 1, 1], opacity: [1, 1, 1] }
            : { pathLength: 1, opacity: 1 }
        }
        transition={
          loop
            ? { times: [0, 0.6, 1], duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }
            : transition
        }
      />

      {/* Check draws second */}
      <motion.path
        d="M8 12.5l2.5 2.5L16.5 9"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={
          loop
            ? { pathLength: [0, 0, 1], opacity: [1, 1, 1] }
            : { pathLength: 1, opacity: 1 }
        }
        transition={
          loop
            ? { times: [0, 0.55, 1], duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }
            : { ...transition, delay: 0.25 }
        }
      />
    </motion.svg>
  );
}
