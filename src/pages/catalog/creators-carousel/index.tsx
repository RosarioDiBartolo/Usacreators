import { Creator } from "@/lib/creators/schemas/creator-apply-server";

import { motion, useScroll, useTransform, Variants } from "motion/react";
import missingPic from "@/assets/images/creator-missing.jpg";
import InfiniteSlider from "../../../components/ui/infinite-slider";

import { LockKeyholeOpenIcon, Quote } from "lucide-react";
import FloatingLines from "../../../components/FloatingLines";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useRef } from "react";
import { Skeleton } from "@/components/skeleton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";

// Animation variants for each testimonial card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    y: -2,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

const sliderContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const CreatorCard = ({
  creator,
  index,
}: {
  creator: Creator;
  index: number;
}) => {
  return (
    <motion.div
      key={creator.id}
      className="relative overflow-hidden rounded-xl bg-card shadow-sm"
      variants={cardVariants}
      custom={index}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="relative">
        <img
          src={creator.profilePictureUrl ?? missingPic}
          alt={creator.name}
          className="h-120 w-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content within the card */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
        <Quote className="mb-4 h-8 w-8 text-white/40" aria-hidden="true" />
        <blockquote className="text-base line-clamp-3 font-medium leading-relaxed">
          {creator.bio}
        </blockquote>
        <figcaption className="mt-4 line-clamp-2">
          <p className="font-semibold text-card-white/100">
            &mdash; {creator.name}
          </p>
          <p className="capitalize text-card-white/40">
            {creator.niches.map((n) => n.replaceAll("_", " ")).join(", ")}
          </p>
        </figcaption>
      </div>
    </motion.div>
  );
};

const Creators = () => {
  const { data: creators } = useSuspenseQuery(
    creatorsQueryOptions({
      cleaned: true,
    })
  );

  return (
    <motion.div
      variants={sliderContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full"
    >
      <InfiniteSlider duration={100}>
        {creators.map((c, i) => (
          <CreatorCard key={c.id ?? i} creator={c} index={i} />
        ))}
      </InfiniteSlider>
    </motion.div>
  );
};

const CarouselHero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax on the slider block as you scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sliderY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const sliderScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);
  const blurGlowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.7]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative   section-padding   w-full    "
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto   space-y-6">
        {/* Fancy badge */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-50/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-900 shadow-[0_0_40px_rgba(245,158,11,0.35)] dark:bg-amber-500/10 dark:text-amber-100"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
          For Miami based businesses and brands
        </motion.div>

        {/* Heading */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="   tracking-widest flex gap-2 justify-center items-center  text-amber-600"
          >
           <div className="   bg-amber-600   h-[0.5px]  w-12" /> 
            BEST CREATORS IN MIAMI
            <div className="   bg-amber-600   h-[0.5px]  w-12" /> 
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
            className="my-0 bg-text bg-linear-to-t from-primary to-amber-400"
          >
            You Just Pick Your Favourite.
          </motion.h2>
        </div>

        <div>
          {/* Slider + parallax + glow */}
          <motion.div
            style={{ y: sliderY, scale: sliderScale }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.22 }}
            className="relative w-full max-w-7xl    mx-auto"
          >
            <div className="relative group z-10 border-3 p-5 bg-muted transition duration-200 hover:border-tertiary 
            rounded-full overflow-hidden ">
              <Button 
              variant={"outline"}
              size={"lg"} className=" opacity-0 group-hover:opacity-100  duration-500 ease-in-out transition-opacity absolute -translate-1/2 z-40 left-1/2 top-1/2">
                Discover more <LockKeyholeOpenIcon/>
              </Button>
              <div className="   transition duration-500 ease-in-out group-hover:backdrop-blur-xs inset-0 absolute z-30    bg-[radial-gradient(circle,transparent_50%,var(--background)_90%)]  " />
              <div className="rounded-full overflow-hidden ">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center gap-6 h-[450px]">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                            delay: i * 0.06,
                          }}
                          className="border rounded-xl bg-white/10 dark:bg-zinc-900/40 p-5 gap-5 flex flex-col relative w-full h-full"
                        >
                          <Skeleton className="rounded-md flex-1" />
                          <div className="w-full space-y-2">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-2/3" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  }
                >
                  <Creators />
                </Suspense>
              </div>
            </div>
          </motion.div>

       
        </div>
      </div>
    </motion.section>
  );
};

export default CarouselHero;
