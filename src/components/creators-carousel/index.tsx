import { Creator } from "@/lib/creators/schemas/creator-apply-server";
import { ScrollProvider } from "./snap";
import { Button } from "../ui/button";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  Variants,
} from "motion/react";
import missingPic from "@/assets/images/creator-missing.jpg";
import InfiniteSlider from "../ui/infinite-slider";
import { useRef } from "react";
import { Quote } from "lucide-react";
import FloatingLines from "../FloatingLines";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";

// Animation variants for each testimonial card
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const CreatorCard = ({ creator }: { creator: Creator }) => {
  const progress = useMotionValue(0);
  const brightness = useTransform(progress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const blur = useTransform(progress, [0, 0.5, 1], [8, 0, 8]);

  const filter = useMotionTemplate`brightness(${brightness}) blur(${blur}px)`;
  const { scrollY } = useScroll();
  const y = useTransform([scrollY, progress], ([v, p]: [number, number]) => {
    return v * Math.abs(0.5 - p);
  });

  return (
    <motion.div
      key={creator.id}
      className="relative overflow-hidden rounded-lg bg-card shadow-sm"
      variants={itemVariants}
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
          <p className=" capitalize text-card-white/40">
            {creator.niches.map((n) => n.replaceAll("_", " ")).join(", ")}
          </p>
        </figcaption>
      </div>
    </motion.div>
  );
};

const CarouselHero = () => {
  const { data: creators } = useSuspenseQuery(creatorsQueryOptions);

  return (
    <section className="    relative w-full  section-padding">
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={[10, 15, 20]}
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Fancy badge */}
        <motion.div className="inline-flex  animate-pulse   items-center gap-2 rounded-full border border-amber-500/40 bg-amber-50/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-900 shadow-[0_0_40px_rgba(245,158,11,0.35)] dark:bg-amber-500/10 dark:text-amber-100">
          <span className="h-1.5 w-1.5 rounded-full  bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
          For Miami brands, agencies & bars
        </motion.div>
        {/* Heading */}
        <div
          className="
           
    "
        ><h1 className=" mb-0  bg-text
    bg-linear-to-b from-amber-950 to-tertiary font-bold">You just have to choose.</h1>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-0!  bg-text
    bg-linear-to-b from-secondary via-amber-900 to-amber-950"
          >
            The only up-to-date catalog of vetted Miami content creators you can
            plug into your campaigns today.
          </motion.h2>
           
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="relative w-full max-w-7xl my-20 mx-auto"
          >
            <div className=" w-[120%]  h-[120%]  -left-20 -top-10 blur-lg  absolute z-30    bg-[radial-gradient(circle,transparent_50%,#f2ecf3_70%)]  " />
            <InfiniteSlider duration={100}>
              {creators.map((c, i) => (
                <CreatorCard key={i} creator={c} />
              ))}
            </InfiniteSlider>
          </motion.div>
          {/* Sub copy */}
           <p className="text-lg md:text-xl lg:text-2xl  font-light leading-relaxed">
          Get instant access to hand-picked creators with contact info, niche,
            platform stats, pricing ranges, and example deliverables — without
            spending hours on Instagram and TikTok.
        </p>
           
        </div>
      </div>
    </section>
  );
};

export default CarouselHero;
