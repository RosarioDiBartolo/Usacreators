import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import missingPic from "@/assets/images/creator-missing.jpg";
import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  LockKeyholeIcon,
  MailIcon,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { RefObject } from "react";
import { motion, Variants } from "motion/react";
import { SiInstagram, SiTiktok } from "react-icons/si";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { CreatorRecord } from "@/lib/creators/collection";

type CatalogPreviewProps = {
  previewRef: RefObject<HTMLDivElement>;
};

const containerVariants: Variants = {
  rest: {},
  hover: {},
};

const gridVariants: Variants = {
  rest: {
     scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  hover: {
     scale: 0.98,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const overlayVariants: Variants = {
  rest: {
    opacity: 0,
    scale: 0.95,
    y: 18,
    pointerEvents: "none",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  hover: {
    opacity: 1,
    scale: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
const FullAccessDialog = () => (
  <motion.div
    variants={overlayVariants}
    className="
                absolute inset-0 z-20
                flex items-center justify-center px-3
              "
  >
    <div className="max-w-md mx-auto rounded-[2.5rem] border bg-background/90 backdrop-blur-xl px-8 py-7 shadow-xl flex flex-col gap-4 text-center">
      <div className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="h-3 w-3" />
        <span>Gain full access</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold">
          Unlock the full Miami creator catalog
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Browse{" "}
          <span className="font-medium text-foreground">
            500+ vetted UGC creators
          </span>{" "}
          by niche, platform, budget and content style. View ratings, example
          work and contact details in one place.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 bg-background/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Unlimited catalog searches
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 bg-background/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Direct contact links
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 bg-background/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          New creators added weekly
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          className="rounded-full px-8 mx-auto"
          onClick={() => {
            window.location.href = "/catalog";
          }}
        >
          View plans & get access
        </Button>
        <p className="text-[11px] text-muted-foreground">
          No agency retainers. Just transparent access to Miami’s best UGC
          creators.
        </p>
      </div>
    </div>
  </motion.div>
);
const CreatorCard = (c: CreatorRecord)=>(
   <Card className="text-start p-0! relative overflow-hidden p-0" >
    <div className=" bg-white/20 absolute inset-0"/>
                  <CardContent className="space-y-1 !p-2 ">
                    <div className="rounded-2xl overflow-hidden aspect-square  ">
                      <img
                        className="h-full w-full object-cover"
                        src={c.profilePictureUrl ?? missingPic}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex blur-xs items-center justify-between">
                      <div>
                        <h4 className="capitalize">{c.name}</h4>
                        <p className="text-sm font-extralight text-muted-foreground">
                          Miami, Florida
                        </p>

                       </div>
                    </div>

                   
                  </CardContent>

          
                </Card>
)
function CatalogPreview({ previewRef }: CatalogPreviewProps) {
  const { data: creators } = useSuspenseQuery(
    creatorsQueryOptions({
      cleaned: false, limit: 16
     })
  );

  const isMobile = useIsMobile();

  const visibleCreators = isMobile ? creators.slice(0, 3) : creators;

  return (
    <section
      ref={previewRef}
      id="catalog-preview"
      className="
        mx-auto
        relative
        overflow-hidden
        max-w-7xl
        border
        bg-gradient-to-t  
        outline outline-offset-40 outline-2 outline-border
        rounded-[48px] md:rounded-[200px]
      "
    >
      {/* Header */}
      <div className="mx-auto p-6 md:p-13 sticky top-0">
        <div className="mx-auto w-full md:w-fit text-center flex flex-col items-center gap-2">
          <p className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Creator catalog preview</span>
          </p>

          <h2 className="text-3xl md:text-5xl">
            Our top-rated creators in Miami
          </h2>

          <p className="max-w-xl text-muted-foreground">
            A handpicked snapshot of the talent inside our catalog —
            <span className="font-medium text-foreground">
              {" "}
              filtered, vetted,
            </span>{" "}
            and ready to produce high-performing UGC for your brand.
          </p>
        </div>

        <div className="flex flex-wrap justify-center w-full my-3 gap-2 text-[10px] md:text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-muted-foreground md:backdrop-blur">
            <Users className="h-3 w-3" />
            <span>500+ creators in database</span>
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-muted-foreground md:backdrop-blur">
            <Star className="h-3 w-3 fill-amber-400/80 text-amber-400" />
            <span>Avg. rating 4.8 / 5</span>
          </span>
        </div>
      </div>

      {/* MOBILE: simple static layout, no heavy blur / motion */}
      {isMobile ? (
        <div className="p-4 rounded-2xl pb-6  relative  bg-muted ">
          <div className=" absolute inset-0 bg-linear-to-t from-background z-10 flex flex-col items-end">
            <div className="w-full     mt-auto    pointer-events-auto">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                <Sparkles className="h-3 w-3" />
                <span>Gain full access</span>
              </div>

              <div className="rounded-2xl   5 shadow-lg px-4 py-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">
                    Unlock the full Miami creator catalog
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Browse{" "}
                    <span className="font-medium text-foreground">
                      500+ vetted UGC creators
                    </span>{" "}
                    by niche, platform, budget and content style — all in one
                    place.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 bg-background/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Unlimited catalog searches
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 bg-background/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Direct contact links
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 bg-background/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    New creators added weekly
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Button
                    size="sm"
                    className="rounded-full px-5 w-full"
                    onClick={() => {
                      window.location.href = "/catalog";
                    }}
                  >
                    View plans & get access
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center">
                    No agency retainers. Just transparent access to Miami’s best
                    UGC creators.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1  blur-xs opacity-70">
            {visibleCreators.slice(1).map((c) => (
              <CreatorCard {...c} key={c.id} />
            ))}
          </div>
        </div>
      ) : (
        // DESKTOP: fancy motion + blur + overlay
        <div className="relative p-8">
          
          <div className=" absolute inset-0 
          bg-linear-to-t from-background from-20% z-10
          ">

          </div>
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <motion.div
              variants={gridVariants}
              className="
                grid gap-5 grid-cols-3 md:grid-cols-4 container max-w-6xl mx-auto 
              "
            >
              {visibleCreators.map((c) => (
               <CreatorCard {...c} key = {c.id} />
              ))}
            </motion.div>
 
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default CatalogPreview;
