import React from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import RandomCircles from "./ui/random-circles";

const MotionLink = motion(Link);

const itemVariantsTemplate: (duration: number) => Variants = (duration) => ({
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: delay,
    },
  }),
};

function Hero() {
  const delay = 0.5;
  const duration = 1.2;
  const itemVariants = itemVariantsTemplate(duration);

  return (
    <section
      className="group relative overflow-hidden bg-gradient-to-b to-primary from-amber-100 rounded-b-[100px] max-w-screen min-h-[90vh] text-primary-foreground px-6 md:px-12 lg:px-20 py-20 flex flex-col justify-center items-center"
    >
      <RandomCircles count={15} />
      
      <motion.div
        className="text-center w-full flex flex-col gap-8 max-w-3xl mx-auto relative z-10 px-4"
        variants={containerVariants}
        custom={delay}
        initial="hidden"
        animate="visible"
      >
        {/* Main title */}
        <div>
          <motion.h1 className="" variants={itemVariants}>
            Discover Miami's Top Content Creators and Influencers
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-primary-foreground w-full max-w-xl mx-auto"
            variants={itemVariants}
          >
            We connect <span className="text-white">brands</span> with our's top{" "}
            <span className="text-white">content creators</span> for authentic,
            engaging social media <br />
            presence.{" "}
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 justify-center w-full px-4">
          <MotionLink
            variants={itemVariants}
            whileTap={{ scale: 0.8, opacity: 0.8 }}
            to={"/creators"}
            className="w-full lg:w-auto"
          >
            <Button
              variant="default"
              size={"2xl"}
              onClick={() => {
                const target = document.getElementById("features");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <motion.span>I'm a creator</motion.span>
            </Button>
          </MotionLink>
          
          <MotionLink
            variants={itemVariants}
            whileTap={{ scale: 0.8, opacity: 0.8 }}
            to={"/catalog"}
            className="w-full lg:w-auto"
          >
            <Button
              variant="secondary"
              size={"2xl"}
              onClick={() => {
                const target = document.getElementById("features");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <motion.span>I'm a brand</motion.span>
            </Button>
          </MotionLink>
        </div>

        {/* Floating particles effect */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;