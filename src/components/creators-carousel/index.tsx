import { Creator } from "@/lib/creators/schemas/creator-apply-server";
import { ScrollContainer, ScrollContent, SnapItem } from "./snap";
import { Button } from "../ui/button";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import missingPic from "@/assets/images/creator-missing.jpg"
const edgePadding = 72;

const CreatorCard = ({
  creator,
  progress,
}: {
  creator: Creator;
  progress: MotionValue<number>;
}) => {
  const brightness = useTransform(progress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const blur = useTransform(progress, [0, 0.5, 1], [8, 0, 8]);

  const filter = useMotionTemplate`brightness(${brightness}) blur(${blur}px)`;
  const { scrollY} = useScroll()
const y = useTransform([scrollY, progress], ([v, p]:[number, number]) => {
  return v * Math.abs(0.5 - p);
}); 

return (
    <motion.div
      style={{
        filter,
         
      }}
      className="  rounded-md group  group-hover: overflow-hidden bg-muted relative  w-[320px] aspect-3/4 shrink-0   border text-background   "
    >
      <div className=" transition opacity-0   absolute inset-0 group-hover:opacity-100 flex backdrop-blur-xs backdrop-brightness-70 flex-col items-start justify-end  p-4 space-y-3">
        <h3
          className="
              "
        >
          {creator.name}
        </h3>
        <p className=" line-clamp-2">{creator.bio ?? creator.additionalInfo}</p>
        <Button className=" px-0" variant={"link"} size={"sm"}>
          See more
        </Button>
      </div>
      <img
        className="   object-cover w-full h-full"
        src={creator.profilePictureUrl ?? missingPic}
      />
    </motion.div>
  );
};

const Carousel = ({ creators }: { creators: Creator[] }) => {
  return (
    <ScrollContainer autoScroll className="   bg-radial from-purple-200/80 to-60% max-w-7xl  py-20  text-start bg-radial ">
      <ScrollContent>
        <div style={{ width: edgePadding, flex: "0 0 auto" }} aria-hidden />
        {creators.map((c, i) => (
          <SnapItem key={i}  >
            <CreatorCard creator={c} />
          </SnapItem>
        ))}
        <div style={{ width: edgePadding, flex: "0 0 auto" }} aria-hidden />
      </ScrollContent>
     </ScrollContainer>
  );
};

export default Carousel;
