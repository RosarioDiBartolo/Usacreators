import React, { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from "framer-motion";
import { Button } from "./ui/button";
import { MousePointer2 } from "lucide-react";

interface AnimatedTextProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  delay?: number;
  duration?: number;
}

const MotionButton = motion(Button);

const DiscoverMore = ({itemVariants}:{itemVariants: Variants}) => {
  const [Hover, setHover] = useState(false);
  return (
    <MotionButton
 
      layout
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      whileHover="hover"
      variants={itemVariants}
      variant={"secondary"}
      size={"none"}
      className=" text-xl p-5 px-8 rounded-full"
    >
      <LayoutGroup>
        <motion.span layout = "preserve-aspect"> Discover More </motion.span>
        <AnimatePresence mode="popLayout">{Hover && <motion.span 
        initial = {{
          opacity: 0
        }}
        animate = {{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }} layout>  < MousePointer2 size={48} /> </motion.span>} </AnimatePresence>
      </LayoutGroup>
    </MotionButton>
  );
};

const itemVariantsTemplate: (duration: number)=> Variants = (duration)=> ({
  hidden: {
    opacity: 0,
    y: 60,

    filter: "blur(10px)",
  },
  hover: {},
  visible:  {
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
  }  ,
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
  title = "Connect with all our",
  subtitle = "Creators",
  description = "We connect brands with Our's top content creators for authentic, engaging social media presence.",
  delay = 0.5,
  duration = 1.2,
}) => {

  const itemVariants = itemVariantsTemplate(duration)
  return (
    <motion.div
      className="text-center  relative z-10 max-w-4xl mx-auto px-4"
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        
        className=" mb-3 bg-gradient-to-t from-amber-400 to-primary-foreground bg-clip-text text-transparent    font-extralight tracking-widest text-2xl         "
        variants={itemVariants}
      >
        Miami Creators.com
      </motion.h3>
      {/* Main title */}
      <motion.h1
        
        className="  text-4xl md:text-4xl  leading-tight"
        variants={itemVariants}
      >
        <motion.span  className=" ">
          {title}
        </motion.span>
        <motion.span 
          className="    bg-clip-text text-transparent bg-radial to-secondary  from-stone-500   mx-3   "
         >
          {subtitle}
        </motion.span>
        <motion.div 
        className="mb-8 perspective-1000" 
         >
          <motion.span className="text-6xl font-normal   bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text   inline-block">
            <span>From</span>{" "}
            <span className=" font-semibold bg-clip-text text-transparent bg-gradient-to-t from-amber-50 to-amber-400">
              MIAMI.
            </span>
          </motion.span>
        </motion.div>
      </motion.h1>
      {/* Highlighted text */}

      {/* Description */}
      <motion.p
        className="text-lg mb-8 text-muted-foreground     max-w-xl mx-auto   font-extralight"
        variants={itemVariants}
        
      >
        {description}
      </motion.p>

      <DiscoverMore itemVariants={itemVariants}/>
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

      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-radial-[at_50%_40%]  from-violet-100/50 animate-pulse via-transparent  rounded-3xl blur-3xl pointer-events-none"
        variants={itemVariants}
      />
    </motion.div>
  );
};

export default AnimatedText;
