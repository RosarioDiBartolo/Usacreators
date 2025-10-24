 import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

const InfiniteSlider = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  // Convert children into an array for duplication
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="  overflow-hidden w-full py-10  ">
      <motion.div
        className={cn("flex", className)}
        animate={{
          x: ["0%", "-50%"], // only move halfway through duplicated content
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 6, // slower = smoother
            ease: "linear",
          },
        }}
      >
        {/* Duplicate content twice for seamless looping */}
        {items.concat(items).map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteSlider;
