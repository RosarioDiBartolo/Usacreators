import { Creator } from "@/lib/creators/schemas/creator-apply-server";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
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
import { Suspense } from "react";
import { Skeleton } from "@/components/skeleton";

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

const Creators = () => {
  const { data: creators } = useSuspenseQuery(creatorsQueryOptions({
    onlyWithBio: true,
  
  }));

  return (
    <InfiniteSlider duration={100}>
      {creators.map((c, i) => (
        <CreatorCard key={i} creator={c} />
      ))}
    </InfiniteSlider>
  );
};
const CarouselHero = () => {
  return (
    <section className="  relative w-full  section-padding">
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
          For Miami based businesses and brands
        </motion.div>
        {/* Heading */}
        <div
          className="
           
    "
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="
            text-xl  text-amber-700"
          >
            We already found the Best Content Creators for your needs.
          </motion.p>

          <h2
            className=" 
            mb-0   
            bg-text
            bg-linear-to-t from-primary to-amber-400
            "
          >
            You Just Pick Your Favourite.
          </h2>
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

            <Suspense
              fallback={
                 <div className=" flex items-center justify-center gap-6 h-[450px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key = {i} className= " border rounded-md bg-white/20 p-5 gap-5 flex flex-col relative w-full h-full  ">
                        <Skeleton className=" rounded-md   flex-1" />
                      <div className="w-full space-y-2  ">
                        <Skeleton className="h-6 w-full     " />
                        <Skeleton className="h-6 w-2/3   " />
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <Creators />
            </Suspense>
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
