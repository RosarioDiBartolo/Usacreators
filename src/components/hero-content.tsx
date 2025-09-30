import React from "react";
import { motion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  title = "Connect with all our",
  subtitle = "Creators",
  description = "We connect brands with Our's top content creators for authentic, engaging social media presence.",

  delay = 0.5,
  duration = 1.2,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const highlightVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,

      scale: 1,
      transition: {
        type: "spring",
        duration: duration * 0.7,
        delay: 1.2,
      },
    },
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      },
    },
  };

  return (
    <motion.div
      className="text-center font-montserrat relative z-10 max-w-4xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl blur-3xl pointer-events-none"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Main title */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4   leading-tight"
        variants={itemVariants}
      >
        <motion.span className="inline-block">{title}</motion.span>
        <motion.span
          className="inline-block mx-3  bg-gradient-to-r from-primary to-primary/70 bg-clip-text  "
          variants={itemVariants}
        >
          {subtitle}
        </motion.span>
      </motion.h1>
      {/* Highlighted text */}
      <motion.div
        className="mb-8 perspective-1000"
        variants={highlightVariants}
      >
        <motion.span
          className="text-5xl md:text-7xl lg:text-8xl font-black  bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text   inline-block"
          style={{
            textShadow: "0 0 30px rgba(var(--primary), 0.3)",
            filter: "drop-shadow(0 4px 20px rgba(var(--primary), 0.2))",
          }}
        >
          <span>From</span> <span className=" bg-clip-text text-transparent bg-gradient-to-t from-amber-500 to-primary">MIAMI.</span>
        </motion.span>
      </motion.div>
      {/* Description */}
      <motion.p
        className="text-lg md:text-xl lg:text-2xl mb-8      max-w-3xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        {description}
      </motion.p>
      {/* CTA Button
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <motion.a
          href={buttonHref}
          className="inline-flex items-center justify-center bg-primary   px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          <motion.span className="relative z-10">{buttonText}</motion.span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          <motion.div
            className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
            initial={false}
          />
        </motion.a>
      </motion.div> */}
      <p className="text-primary text-xl font-extrabold my-3">You're either</p>

      <div className="flex gap-1 text-xl md:text-2xl justify-center items-center relative z-10">
        <button
          onClick={() => {
            document.getElementById("brand")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="text-end max-w-52 flex-1   font-bold rounded-s-full bg-gradient-to-b from-primary to-amber-500 text-primary-foreground p-2 px-4"
        >
          A Brand
        </button>

        <button className="text-start max-w-52  flex-1   font-bold rounded-e-full bg-gradient-to-b from-secondary to-stone-800 text-secondary-foreground p-2 px-4">
          A Creator
        </button>
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
  );
};

export default AnimatedText;
