import { Card, CardContent } from "@/components/ui/card";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import missingPic from "@/assets/images/creator-missing.jpg";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, Lock, LockOpenIcon, Sparkles } from "lucide-react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { motion } from "motion/react";
import { CreatorRecord } from "@/lib/creators/collection";
import { AvailableNiches } from "@/lib/creators/constants";
import { Badge } from "@/components/ui/badge";

type CatalogPreviewProps = {
  previewRef: RefObject<HTMLDivElement>;
};

const CreatorCard = (c: CreatorRecord) => (
  <Card
    className="
   
   text-start 
   overflow-hidden 
    
    bg-linear-to-bl   
    relative
     "
  >
    <div className="   absolute inset-0" />
    <CardContent className="space-y-4 ">
      <div
        className="
                    relative
                    rounded-2xl    overflow-hidden aspect-square  "
      >
        <img
          className="h-full w-full object-cover"
          src={c.profilePictureUrl ?? missingPic}
          loading="lazy"
        />
        <div
          className="
        absolute
        inset-0
        grainy
          flex justify-center items-center"
        >
          <Button size={"icon"}>
            <Lock />
          </Button>
        </div>
      </div>

      <div
        className="flex 
                    blur-xs  items-center justify-between"
      >
        <div>
          <h4 className="capitalize">{c.name}</h4>
          <p className="text-sm font-extralight text-muted-foreground">
            Miami, Florida
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const NicheButton = ({
  selectedNiches,
  setSelectedNiches,
  niche,
}: {
  niche: { id: string; label: string };
  selectedNiches: string[];
  setSelectedNiches: Dispatch<SetStateAction<string[]>>;
}) => {
  const selected = selectedNiches.includes(niche.id);
  return (
    <Button
      onClick={() => {
        setSelectedNiches((old) =>
          selected ? old.filter((nid) => nid != niche.id) : [...old, niche.id]
        );
      }}
      variant={selected ? "secondary" : "outline"}
      key={niche.id}
    >
      {niche.label}
    </Button>
  );
};

function NichesTags({selectedNiches, setSelectedNiches}:{  selectedNiches: string[];
  setSelectedNiches: Dispatch<SetStateAction<string[]>>}) {
   return (
    <div className="my-3 justify-center border border-secondary overflow-auto md:overflow-hidden rounded-full flex gap-1 p-2">
      {[{ id: "fashion", label: "Fashion" },
  { id: "streetwear", label: "Streetwear" },
  { id: "beauty", label: "Beauty" },
  { id: "skincare", label: "Skincare" },
  { id: "travel", label: "Travel" },
  { id: "luxury_lifestyle", label: "Luxury Lifestyle" },
 ].map((niche) => (
        <NicheButton
          key={niche.id}
          niche={niche}
          selectedNiches={selectedNiches}
          setSelectedNiches={setSelectedNiches}
        />
      ))}
    </div>
  );
}

function CatalogPreview({ previewRef }: CatalogPreviewProps) {
    const [selectedNiches, setSelectedNiches] = useState<string[]>([]);


  const { data: creators } = useSuspenseQuery(
    creatorsQueryOptions({
      cleaned: false, limit: 16
     })
  );

  const filtered = creators.filter(
    c=> selectedNiches.every( n =>  c.niches.includes(n) )
  )

 
 
  return (
    <section
      ref={previewRef}
      id="catalog-preview"
      className="
      border-secondary/40
      outline-secondary/10
        mx-auto
        relative
        overflow-hidden
        max-w-7xl
        border
        bg-linear-to-t from-tertiary/30 via-muted/10
         outline-2   outline-offset-40  
        rounded-[48px] md:rounded-[200px]
        
      "
    >
      {/* Header */}
      <div className="mx-auto   max-w-4xl container p-6 md:p-13 sticky top-0">
        <div className="mx-auto w-full md:w-fit text-center flex flex-col items-center gap-2">
          <p className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Creator catalog preview</span>
          </p>

          <h2 className="text-3xl md:text-5xl">
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

        <NichesTags selectedNiches={selectedNiches} setSelectedNiches={setSelectedNiches} />
      </div>
      <div className="p-8 space-y-10 ">
        <motion.div
          className="
                grid gap-5 grid-cols-3 md:grid-cols-4 lg:grid-cols-4  
              "
        >
          {filtered.map((c) => (
            <CreatorCard {...c} key={c.id} />
          ))}
        </motion.div>

        <div className=" border flex gap-3  text-start p-20 rounded-[170px] mb-2 bg-background  ">
          <div className="flex-1 space-y-4">
            <Badge variant="secondary">Miami Creators</Badge>

            <h2 className="m-0 font-semibold ">
              Unlock the Full Creator Catalog
            </h2>

            <p className="text-muted-foreground">
              Get unlimited access to our complete database of vetted Miami
              creators. Browse niches, platforms, rates, and contact info — all
              in one place, without agencies or commissions.
            </p>

            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex gap-2 items-center">
                <CheckCircleIcon className="h-4 w-4" />
                Access 500+ verified Miami creators
              </li>

              <li className="flex gap-2 items-center">
                <CheckCircleIcon className="h-4 w-4" />
                Filter by niche, demographics, and content style
              </li>

              <li className="flex gap-2 items-center">
                <CheckCircleIcon className="h-4 w-4" />
                Contact creators directly — zero middlemen
              </li>
            </ul>

            <Button
              size="lg"
              className="mt-4 w-fit rounded-full px-6 py-5 text-base font-semibold shadow-sm"
            >
              <LockOpenIcon /> Unlock Full Access
            </Button>
          </div>

          <div className="flex-1 
          bg-linear-to-b from-muted via-muted/70 to-muted/20 border border-secondary/15   rounded-[130px] flex items-center justify-center">
            <div
              className="
      relative w-full max-w-sm 
      aspect-[4/3]
      rounded-3xl 
      border border-secondary/60 
      bg-linear-to-br from-background via-muted/40 to-tertiary/20
      shadow-lg
      overflow-hidden
    "
            >
              {/* Top bar */}
              <div className="absolute rounded-t-3xl overflow-hidden  inset-x-0 top-0 h-9 border-b border-border/60 bg-background/80 backdrop-blur-sm flex items-center justify-between px-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Creator Catalog
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Miami, FL
                </span>
              </div>

              {/* Grid of creator cards */}
              <div className="grid grid-cols-3 gap-2 p-3 pt-11">
                {/* Generic blurred cards */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="
            h-16 rounded-xl 
            bg-muted/40 
            border border-border/40 
            overflow-hidden
          "
                  >
                    <div className="h-full w-full grainy" />
                  </div>
                ))}

                {/* Highlighted locked card */}
                <div className="col-span-3 mt-1">
                  <div
                    className="
            relative flex items-center gap-3 
            rounded-2xl 
            border border-secondary 
            bg-linear-to-r from-tertiary/40 via-muted/40 to-background 
            px-3 py-2
          "
                  >
                    <div className="h-10 w-10 rounded-xl overflow-hidden border border-border/60">
                      <div className="h-full w-full grainy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        Top Miami Creator • Fashion
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Stats, rates &amp; contact info unlocked
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full"
                      >
                        <Lock className="h-3 w-3" />
                      </Button>
                      <span className="text-[9px] text-muted-foreground">
                        Locked
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom badge */}
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="text-[10px]">
                  Preview • Blurred for demo
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogPreview;
