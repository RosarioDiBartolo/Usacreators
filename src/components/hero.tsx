import React from "react";
import { motion } from "motion/react";
import CreatorsAvatars from "./creators-avatars";
import HeroContent from "./hero-content";

// random circles generator with motion
const RandomCircles = ({ count = 12 }) => {
  const circles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 60) + 20, // 20px - 80px
    left: Math.random() * 90, // % of container width
    duration: Math.random() * 15 + 10, // 10s - 25s
    delay: .2, // stagger start
    opacity: Math.random() * 0.5 + 0.4, // 0.4 - 0.9
    outlineOffset: Math.floor(Math.random() * 8), // 0 - 7px
    bgColor: Math.random() > 0.5 ? "var(--secondary)" : "transparent",
    outlineColor:
      Math.random() > 0.5 ? "white" : "rgba(255,255,255,0.5)",
  }));

  return (
    <>
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full  brightness-90 transition"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.left}%`,
            opacity: circle.opacity,
            backgroundColor: circle.bgColor,
            outline: `2px solid ${circle.outlineColor}`,
            outlineOffset: `${circle.outlineOffset}px`,
          }}
          initial={{ top: "100%", opacity: 0 }}
          animate={{
            top: `-${circle.size}px`, // float off top
            x: [0, -10, 10, 0], // wiggle
            opacity: [0, circle.opacity, 0], // fade in/out
          }}
          transition={{
            duration: circle.duration,
            delay: circle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
};

function Hero() {
  return (
    <section
      className="group relative  overflow-hidden rounded-b-[100px]
      bg-gradient-to-b from-primary to-primary/30 max-h-[90vh]
      text-primary-foreground px-6 md:px-12 lg:px-20 pt-20"
    >
      <RandomCircles count={15} />

      <div
        className="relative transition  container mx-auto max-w-4xl
        flex flex-col gap-12 p-12 items-center"
      >
        <CreatorsAvatars />
        <HeroContent />
        </div>
    </section>
  );
}

export default Hero;
