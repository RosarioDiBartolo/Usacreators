'use client';
import { cn } from '@/lib/fe-utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import React from 'react';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};// 👇 forwardRef so parent can attach a ref
const InfiniteSlider = React.forwardRef<HTMLDivElement, InfiniteSliderProps>(
  (
    {
      children,
      gap = 16,
      duration = 25,
      durationOnHover,
      direction = "horizontal",
      reverse = false,
      className,
    },
    forwardedRef
  ) => {
    const [currentDuration, setCurrentDuration] = useState(duration);
    const [measureRef, { width, height }] = useMeasure();
    const translation = useMotionValue(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [key, setKey] = useState(0);

    // 🔗 merge the ref from useMeasure with the ref from the parent
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        // give node to useMeasure
        measureRef(node);

        // give node to parent ref
        if (!forwardedRef) return;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
        }
      },
      [measureRef, forwardedRef]
    );

    useEffect(() => {
      let controls;
      const size = direction === "horizontal" ? width : height;
      const contentSize = size + gap;
      const from = reverse ? -contentSize / 2 : 0;
      const to = reverse ? 0 : -contentSize / 2;

      if (!contentSize) return; // avoid NaN on first render

      if (isTransitioning) {
        controls = animate(translation, [translation.get(), to], {
          ease: "linear",
          duration:
            currentDuration *
            Math.abs((translation.get() - to) / contentSize),
          onComplete: () => {
            setIsTransitioning(false);
            setKey((prevKey) => prevKey + 1);
          },
        });
      } else {
        controls = animate(translation, [from, to], {
          ease: "linear",
          duration: currentDuration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          onRepeat: () => {
            translation.set(from);
          },
        });
      }

      return controls?.stop;
    }, [
      key,
      translation,
      currentDuration,
      width,
      height,
      gap,
      isTransitioning,
      direction,
      reverse,
    ]);

    const hoverProps =
      durationOnHover != null
        ? {
            onHoverStart: () => {
              setIsTransitioning(true);
              setCurrentDuration(durationOnHover);
            },
            onHoverEnd: () => {
              setIsTransitioning(true);
              setCurrentDuration(duration);
            },
          }
        : {};

    return (
      <div className={cn("overflow-hidden", className)}>
        <motion.div
          className="flex w-max h-[450px]"
          style={{
            ...(direction === "horizontal"
              ? { x: translation }
              : { y: translation }),
            gap: `${gap}px`,
            flexDirection: direction === "horizontal" ? "row" : "column",
          }}
          ref={setRefs} // 👈 merged ref here
          {...hoverProps}
        >
          {children}
          {children}
        </motion.div>
      </div>
    );
  }
);
 

export default InfiniteSlider;