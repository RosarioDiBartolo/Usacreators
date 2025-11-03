import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import React, { PropsWithChildren, useRef, useState, useContext } from "react";

const ScrollContainerCtx = React.createContext<React.RefObject<HTMLDivElement> | null>(null);

const SnapItem = ({ children }: PropsWithChildren) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const containerRef = useContext(ScrollContainerCtx);

  // Center-to-center progress: 0 at right edge, 0.5 centered, 1 at left edge
  const { scrollXProgress } = useScroll({
    container: containerRef!,
    target: itemRef,
    axis: "x",
    offset: ["center start", "center end"],
  });

  // Map to signed percent: -100 (right edge) → 0 (center) → +100 (left edge)
  const percentFromCenter = useTransform(scrollXProgress, [0, 0.5, 1], [-100, 0, 100]);

  // Example effect: scale up at center
  const scale = useTransform(scrollXProgress, [0, .4, .6, .9, 1.3], [.2, .8, 1.2, .8, .2]);

  // Debug / UI readout
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollXProgress, "change", (v) => setPct(v));

  return (
    <motion.div
      ref={itemRef}
      style={{  scale,  willChange: "transform" }} // <- apply scale
      className="relative origin-center snap-center shrink-0 min-w-56 h-full"
    >
      {children}

      {/* overlay label: signed percentage with 1 decimal */}
      <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-mono text-white">
        {pct.toFixed(1)}%
      </div>
    </motion.div>
  );
};

function SnapScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollContainerCtx.Provider value={containerRef}>
      <motion.div
        ref={containerRef}
        className="flex justify-center gap-8 mx-auto bg-muted max-w-[80vw] h-64 snap-x snap-mandatory overflow-x-auto overflow-y-hidden py-8"
      >
        {[...Array(10)].map((_, i) => (
          <SnapItem key={i}>
            <div className="h-full w-[320px] rounded-xl border bg-secondary text-secondary-foreground" />
          </SnapItem>
        ))}
      </motion.div>
    </ScrollContainerCtx.Provider>
  );
}

export default SnapScroll;
