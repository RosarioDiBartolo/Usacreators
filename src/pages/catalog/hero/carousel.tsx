import InfiniteSlider from "@/components/ui/infinite-slider";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
 import { useSuspenseQuery } from "@tanstack/react-query";
 import { Quote } from "lucide-react";
import { motion, Variants } from "motion/react";
import missingPic from "@/assets/images/creator-missing.jpg";

//Could be dangerous... this is a server side file
import { type CreatorRecord } from "@/lib/creators/collection";

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
  creator: CreatorRecord;
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
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
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


export default Creators