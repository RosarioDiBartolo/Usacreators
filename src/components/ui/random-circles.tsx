import { motion } from "motion/react";

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
    bgColor: Math.random() > 0.5 ? "var(--background)" : "transparent",
    outlineColor:
      Math.random() > 0.5 ? "white" : "rgba(255,255,255,0.5)",
  }));

  return (
    <>
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute group-hover:blur group-hover:brightness-75 transition-[filter] duration-500  rounded-full     "
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


export default RandomCircles