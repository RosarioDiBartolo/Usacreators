import { AvatarCircles } from "@/components/ui/avatar-circles";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
function CreatorsAvatars() {

  const [Hover, setHover] = useState(false)
  return (
    <motion.div
    onMouseEnter={
      ()=> setHover(true)
    }
    onMouseLeave={()=> setHover(false)}
      layout
      className="bg-secondary shadow-2xl text-muted-foreground items-center rounded-full overflow-hidden p-2 gap-3 px-7 flex cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <LayoutGroup>
        <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />

        {/* Hidden text that fades in on hover */}
        <AnimatePresence mode="popLayout"> 
        {Hover && 
          <motion.span
        layout
          className=" "
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: -10 }}
          exit={{opacity:0, }}
          transition={{ duration: 0.5 }}
        >
          99+ Usa Creators all in one platform
        </motion.span>}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  );
}

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export default CreatorsAvatars;
