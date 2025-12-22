import { motion } from "motion/react";

import { LockKeyholeOpenIcon } from "lucide-react";
import { RefObject, Suspense } from "react";
import { Skeleton } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import Creators from "./carousel";
import { badgeVariants } from "@/components/ui/badge";

const CarouselHero = ({
  previewRef,
}: {
  previewRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <motion.section
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
        <div className=" flex flex-col items-center">
        <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
            className={
              badgeVariants({
                variant: "outline",
                className: " mt-4",
              }) 
            }
          >
           Just Pick Your Favourite.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="h2"
          >
            <span className=" text-amber-500  underline underline-offset-7 decoration-amber-500 decoration-1   ">
              {" "}
              BEST
            </span>{" "}
            CREATORS IN MIAMI
          </motion.h2>

          
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.22 }}
            className="relative w-full max-w-7xl    mx-auto"
          >
            <div
              className="relative group z-10   p-1 bg-muted/30  border-3 rounded-md lg:rounded-full transition duration-200 border-tertiary lg:border-border hover:border-tertiary 
              overflow-hidden "
            >
              <Button
                onClick={() => {
                  if (!previewRef.current) return;
                  previewRef.current.scrollIntoView({ behavior: "smooth" });
                }}
                variant={"outline"}
                size={"lg"}
                className=" opacity-100 lg:opacity-0 group-hover:opacity-100  duration-500 ease-in-out transition-opacity absolute -translate-1/2 z-40 left-1/2 top-1/2"
              >
                Discover more <LockKeyholeOpenIcon />
              </Button>
              <div
                className="
    transition duration-500 ease-in-out 
    backdrop-blur-xs
    lg:backdrop-blur-none
    group-hover:backdrop-blur-xs
     inset-0 absolute z-30   
      bg-[radial-gradient(circle,transparent_50%,var(--background)_90%)]  "
              />
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
        </div>
      </div>
    </motion.section>
  );
};

export default CarouselHero;
