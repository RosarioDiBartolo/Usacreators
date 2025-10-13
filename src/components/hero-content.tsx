import React from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "./ui/button";
interface AnimatedTextProps {
 
  delay?: number;
  duration?: number;
}

const MotionButton = motion(Button);

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
const AnimatedText: React.FC<AnimatedTextProps> = ({
 
   delay = 0.5,
  duration = 1.2,
}) => {
  const itemVariants = itemVariantsTemplate(duration);
  return (
    <motion.div
      className="text-center w-full  relative z-10  mx-auto px-4"
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      {/* <motion.h3
        className=" text-4xl mb-3 bg-gradient-to-t from-amber-400 to-primary-foreground bg-clip-text text-transparent    font-extralight tracking-widest      "
        variants={itemVariants}
      >
        Miami Creators.com
      </motion.h3> */}

      {/* Main title */}
      <motion.h1
        className=" text-6xl  font-bold  "
        variants={itemVariants}
      >
        <motion.span className=" "> Connect with all our Creators</motion.span>
        <motion.div className="mb-2 perspective-1000  bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text   ">
             <span className=" bg-clip-text text-transparent bg-radial from-amber-100 to-amber-400 font-extrabold">
              From Miami.
            </span>
         </motion.div>
      </motion.h1>
      {/* Highlighted text */}

      {/* Description */}
      <motion.p
        className="text-xl text-primary-foreground/80 mb-8      max-w-xl mx-auto "
        variants={itemVariants}
      >
        We connect brands with our's top content creators for authentic, engaging social media presence.
      </motion.p>

      <MotionButton
        variants={itemVariants}
        variant="secondary"
        whileTap={{ scale: 0.8, opacity: 0.8 }}
        onClick={() => {
          const target = document.getElementById("features");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
        size="none"
        className="text-xl p-5 px-8 rounded-full"
      >
        <motion.span>Wanna see more?</motion.span>
      </MotionButton>

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

      {/* <div className="flex flex-wrap   gap-8 text-xl md:text-2xl
       justify-center items-center relative z-10">
        <MotionButton
          variants={buttonVariants}
          size={ "none"}
          onClick={() => {
            document.getElementById("brand")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className=" cursor-pointer tracking-tight shadow-xl shadow-amber-900/50  max-w-56 w-full        rounded-2xl bg-gradient-to-b from-primary to-amber-500 text-primary-foreground  p-4 px-8"
        >
          Brand
        </MotionButton>
         

        <MotionButton
                  variants={buttonVariants}

        variant={"secondary"}
        size={"none"}
        className="cursor-pointer tracking-tight   shadow-xl shadow-amber-900/50  max-w-56   w-full       rounded-2xl    p-4 px-8">
          Creator
        </MotionButton>
      </div> */}
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
