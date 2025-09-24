import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

const CreatorsAvatars = () => {
  const [hover, setHover] = useState(false);

  const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
  ];

  const numPeople = 99;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0.5, y: 10, x: 400, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      x: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
     
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-flex items-center"
    >
      {/* Avatars container */}
      <motion.div
      layout
        className="bg-secondary shadow-2xl text-muted-foreground items-center rounded-full overflow-hidden p-2 gap-3 flex cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ layout: {
          type:  "keyframes"    },  type: "spring", stiffness: 200, damping: 15 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <LayoutGroup>
          <motion.div
            layout
            className="z-10 flex -space-x-3 rtl:space-x-reverse"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {avatarUrls.map((url, index) => (
              <motion.img
                key={index}
                className="shadow-xl h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                src={url}
                width={40}
                height={40}
                alt={`Avatar ${index + 1}`}
                variants={avatarVariants}
                whileHover={{ scale: 1.15, rotate: 3 }}
              />
            ))}

            <motion.a
              key="extra-people"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
              href=""
              variants={avatarVariants}
              whileHover={{ scale: 1.15, rotate: 3 }}
            >
              +{numPeople}
            </motion.a>
          </motion.div>
          <AnimatePresence mode="popLayout">
            {hover && (
              <motion.span
                initial={{ opacity: 0  }}
                animate={{ opacity: 1  }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="  left-full mx-3 whitespace-nowrap text-sm font-medium"
              >
                99+ USA Creators all in one platform
              </motion.span>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </motion.div>
  );
};

export default CreatorsAvatars;
