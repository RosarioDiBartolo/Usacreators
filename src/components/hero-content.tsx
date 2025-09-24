import React from "react";
import { motion } from "framer-motion";

// ✨ Hero text content (fades in after delay)
const HeroContent = () => {
  return (
    <motion.div
      className="text-center font-montserrat relative z-10"
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 3, ease: "easeOut" }}
    >
      <h1 className="text-3xl md:text-5xl tracking-tight lg:text-6xl font-extrabold mb-6 dark:text-white">
        Connect with all our<span className="px-3"> Creators</span>
        <br /> <span className=" text-7xl text-primary">From MIAMI.</span>
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-6">
        We connect brands with Our's top content creators for authentic,
        engaging social media presence.
      </p>
      <a
        href="#get-started"
        className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
      >
        Get in Touch!
      </a>
    </motion.div>
  );
};

export default HeroContent;
