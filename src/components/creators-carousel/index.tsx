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

const Carousel = ({ creators }: { creators: Creator[] }) => {
   return (
    <div className=" relative w-full max-w-7xl mx-auto">
      <div className=" w-[120%]  h-[120%]  -left-20 -top-10 blur-lg  absolute z-30    bg-[radial-gradient(circle,transparent_50%,#f2ecf3_70%)]  " />
      <InfiniteSlider duration={100}>
        {creators.map((c, i) => (
          <CreatorCard key={i} creator={c} />
        ))}
      </InfiniteSlider>
    </div>
  );
};

export default Carousel;
