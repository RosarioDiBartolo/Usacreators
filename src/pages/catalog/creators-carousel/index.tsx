import { Creator } from "@/lib/creators/schemas/creator-apply-server";

import {
  motion,
  useScroll,
  useTransform,
  Variants,
} from "motion/react";
import missingPic from "@/assets/images/creator-missing.jpg";
import InfiniteSlider from "../../../components/ui/infinite-slider";

import { Quote } from "lucide-react";
import FloatingLines from "../../../components/FloatingLines";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useRef } from "react";
import { Skeleton } from "@/components/skeleton";

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
      onlyWithBio: true,
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

  return (<>
 
    <motion.section
      ref={sectionRef}
      className="relative w-full section-padding bg-secondary text-secondary-foreground"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      
      <div className=" absolute inset-0"> 
 <FloatingLines 
     enabledWaves={['top', 'middle', 'bottom']}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={[10, 15, 20]}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={[8, 6, 4]}
    bendRadius={5.0}
    bendStrength={-0.5}
    interactive={true}
    parallax={true} 
  /> </div>
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
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
            className="text-xl text-tertiary/70"
          >
            We already found the Best Content Creators for your needs.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
            className="mb-0 bg-text bg-linear-to-t from-primary to-amber-400"
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
            className="relative p-5 w-full max-w-7xl my-8 mx-auto"
          >                      
            <div 
            className=" w-[120%]  h-[120%]  -left-20 -top-10  absolute top     blur-3xl"
            />

            <div className="relative z-10 rounded-xl overflow-hidden">
 
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
          </motion.div>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
          >
            Get instant access to hand-picked creators with contact info, niche,
            platform stats, pricing ranges, and example deliverables — without
            spending hours on Instagram and TikTok.
          </motion.p>
        </div>
      </div>
    </motion.section>
  </>
  );
};

export default CarouselHero;
