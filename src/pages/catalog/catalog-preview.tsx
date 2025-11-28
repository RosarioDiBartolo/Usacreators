import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import missingPic from "@/assets/images/creator-missing.jpg";
import { Button } from "@/components/ui/button";
import {
  BookmarkIcon,
  MailIcon,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { RefObject } from "react";
import { motion, Variants } from "motion/react";

type CatalogPreviewProps = {
  previewRef: RefObject<HTMLDivElement>;
};

const containerVariants: Variants = {
  rest: {},
  hover: {},
};

const gridVariants: Variants = {
  rest: {
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  hover: {
    filter: "blur(10px)",
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

function CatalogPreview({ previewRef }: CatalogPreviewProps) {
  const { data: creators } = useSuspenseQuery(
    creatorsQueryOptions({
      cleaned: false,
      limit: 6,
    })
  );

  return (
    <section
      ref={previewRef}
      id="catalog-preview"
      className="
      mx-auto 
     
      bg-gradient-to-t from-tertiary/30 via-muted/30 
 
        
      outline outline-offset-40 outline-2 outline-border 
      relative 
      overflow-hidden 
      rounded-[200px] 
      max-w-7xl
       border"
    >
      <div className="mx-auto   p-13   "> 
      <div className="mx-auto w-fit text-center flex flex-col items-center">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          <span>Creator catalog preview</span>
        </p>

        <h2 className="">Our top-rated creators in Miami</h2>

        <p className="max-w-xl text-sm text-muted-foreground">
          A handpicked snapshot of the talent inside our catalog —
          <span className="font-medium text-foreground">
            {" "}
            filtered, vetted,
          </span>{" "}
          and ready to produce high-performing UGC for your brand.
        </p>
      </div>

      <div className="flex w-fit my-3 mx-auto flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-muted-foreground backdrop-blur">
          <Users className="h-3 w-3" />
          <span>500+ creators in database</span>
        </span>

        <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-muted-foreground backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400/80 text-amber-400" />
          <span>Avg. rating 4.8 / 5</span>
        </span>
      </div>
</div>
      <div className="relative p-8    ">
        <ProgressiveBlur
          className="pointer-events-none z-10 absolute inset-0"
          blurIntensity={1}
        />

        {/* Motion container: hover here controls blur + overlay */}
        <motion.div
          className=" relative max-h-[100vh] "
          variants={containerVariants}
          initial="rest"
          animate="rest"
          
          whileHover="hover"
        >
          {/* Grid of creators – blurred via motion */}
          <motion.div
            variants={gridVariants}
            className="
              
               grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            "
          >
            {creators.map((c) => (
              <Card className="text-start" key={c.id}>
                <CardContent>
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img
                      className="max-h-full w-full object-cover"
                      src={c.profilePictureUrl ?? missingPic}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="capitalize">{c.name}</h4>
                      <p className="text-sm font-extralight text-muted-foreground">
                        Miami, Florida
                      </p>

                      <hr className="my-3 bg-muted px-3 h-[1.5px] rounded-full" />

                      <div className="max-h-12 overflow-hidden flex gap-3 flex-wrap my-2">
                        {c.niches.map((n) => (
                          <Button
                            key={n}
                            size="xs"
                            variant="outline"
                            className="line-clamp-1 bg-tertiary/10 capitalize"
                          >
                            {n.replaceAll("_", " ")}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {c.instagram && (
                      <a href={c.instagram}>
                        <Button size="icon" variant="outline">
                          <IconBrandInstagram />
                        </Button>
                      </a>
                    )}

                    {c.tiktok && (
                      <a href={c.tiktok}>
                        <Button size="icon" variant="outline">
                          <IconBrandTiktok />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="flex flex-wrap gap-3 w-full">
                    <Button
                      className="rounded-md"
                      variant="outline"
                      size="icon"
                    >
                      <MailIcon />
                    </Button>
                    <Button
                      className="rounded-md"
                      variant="outline"
                      size="icon"
                    >
                      <BookmarkIcon />
                    </Button>
                    <Button size="sm" className="rounded-md flex-1">
                      Send a message
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </motion.div>

          {/* Overlay content inviting to buy the catalog */}
          <motion.div
            variants={overlayVariants}
            className="
              absolute   inset-0 z-20 pointer-events-auto
              flex items-center justify-center
            "
          >
            <div className="max-w-md mx-auto rounded-3xl border bg-background/90 backdrop-blur-xl px-6 py-6 sm:px-8 sm:py-7 shadow-xl flex flex-col gap-4 text-center">
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
                  by niche, platform, budget and content style. View ratings,
                  example work and contact details in one place.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
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
                  className="rounded-full px-6 sm:px-8 mx-auto"
                  onClick={() => {
                    // TODO: replace with your real checkout / pricing route
                    window.location.href = "/catalog";
                  }}
                >
                  View plans & get access
                </Button>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  No agency retainers. Just transparent access to Miami’s best
                  UGC creators.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CatalogPreview;
