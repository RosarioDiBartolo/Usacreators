import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import  { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import c1 from "@/assets/creators/brand-section-thumbnail.jpg";
import c2 from "@/assets/creators/ella-don-v1fnzFmQ6vU-unsplash.jpg";
import c3 from "@/assets/creators/wesley-tingey-JOhjfzjeJLw-unsplash.jpg";
import c4 from "@/assets/creators/laura-chouette-N9a5oS06Er4-unsplash.jpg";

export interface CardType {
  thumbnail: string;
}

const fakeCards: CardType[] = [
  { thumbnail: c1 },
  { thumbnail: c2 },
  { thumbnail: c3 },  
    { thumbnail: c4 },  

    

];
 
const getCardAnimation = (offset: number, index: number, activeIndex: number, radius = 150) => {
  const isActive = activeIndex === index;
  
  // Angle for circular positioning
  const angle = (offset * 30 * Math.PI) / 180; // 30° per offset
  const x = Math.sin(angle) * radius;
  const y = -Math.cos(angle) * radius / 2; // slight vertical offset for perspective

  return {
    zIndex: isActive ? 30 : 20 - Math.abs(offset),
    opacity: isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.3),
    scale: isActive ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15),
    rotate: offset * 15, // small tilt
    x,
    y,
    filter: isActive ? "none" : `blur(${Math.abs(offset) * 0.5}px)`,
  };
};

const Card = ({ card, index, activeIndex, total, onCardClick }: {
  card: CardType;
  index: number;
  activeIndex: number;
  total: number;
  onCardClick: (index: number) => void;
}) => {
  const offset = (index - activeIndex + total) % total;
  const normalizedOffset = offset > total / 2 ? offset - total : offset;
  
  const animationProps = getCardAnimation(normalizedOffset, index, activeIndex);

  return (
    <motion.div
      layout
      initial={animationProps}
      animate={animationProps}
      exit={{ 
        opacity: 0, 
        scale: 0.8,
        x: normalizedOffset > 0 ? 200 : -200,
        transition: { duration: 0.4 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        mass: 0.5,
        duration: 0.6 
      }}
      className={cn(
        "origin-bottom shadow-2xl rounded-2xl bg-background text-foreground border-2 border-white/20 w-full h-96 overflow-hidden absolute inset-0 cursor-pointer",
        "backdrop-blur-sm"
      )}
      onClick={() => onCardClick(index)}
      whileHover={{ 
        scale: index === activeIndex ? 1.02 : animationProps.scale * 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <img 
        src={card.thumbnail} 
        alt={`Card ${index + 1}`} 
        className="w-full h-full object-cover"
      />
      {/* Overlay for better text readability if you add content later */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

type CarouselIndicatorProps = {
  index: number;
  setIndex: (idx: number)=>void;
  itemsCount: number;
  className?: string;
  classNameButton?: string;
};

const CarouselIndicator = ({ index, setIndex, itemsCount, className, classNameButton }: CarouselIndicatorProps) => (
  <div className={cn("absolute bottom-4 z-40 flex w-full items-center justify-center", className)}>
    <div className="flex space-x-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
      {Array.from({ length: itemsCount }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => setIndex(i)}
          className={cn(
            "h-3 w-3 rounded-full transition-all duration-300 transform",
            index === i
              ? "bg-white scale-110"
              : "bg-white/50 hover:bg-white/70 scale-100",
            classNameButton
          )}
        />
      ))}
    </div>
  </div>
);

type CarouselNavigationProps = {
  index: number;
  setIndex: (idx: number)=> void;
  itemsCount: number;
  alwaysShow?: boolean;
  className?: string;
  classNameButton?: string;
};

const CarouselNavigation = ({ index, setIndex, itemsCount, alwaysShow = false, className, classNameButton }: CarouselNavigationProps) => {
  const buttonClass = cn(
    "pointer-events-auto h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white",
    alwaysShow ? "opacity-100" : "opacity-0 group-hover/hover:opacity-100",
    alwaysShow ? "disabled:opacity-30" : "group-hover/hover:disabled:opacity-30",
    classNameButton
  );

  return (
    <div className={cn("pointer-events-none absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4", className)}>
      <button
        type="button"
        aria-label="Previous slide"
        className={buttonClass}
        disabled={index === 0}
        onClick={() => index > 0 && setIndex(index - 1)}
      >
        <ChevronLeft className="stroke-zinc-800" size={24} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={buttonClass}
        disabled={index + 1 === itemsCount}
        onClick={() => index < itemsCount - 1 && setIndex(index + 1)}
      >
        <ChevronRight className="stroke-zinc-800" size={24} />
      </button>
    </div>
  );
};

const CardsStack = ({ cards = fakeCards }: { cards?: CardType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % cards.length);
  }, [cards.length]);
 

  const handleCardClick = useCallback((index: number) => {
    const newDirection = index > activeIndex ? 1 : -1;
    setDirection(newDirection);
    setActiveIndex(index);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className=" w-md max-w-full flex justify-center">
      <div className="relative max-w-full w-xs h-[425px] group/hover">
        <AnimatePresence mode="popLayout" custom={direction}>
          {cards.map((card, i) => (
            <Card 
              key={`${card.thumbnail}-${i}`} 
              card={card} 
              index={i} 
              activeIndex={activeIndex} 
              total={cards.length}
              onCardClick={handleCardClick}
            />
          ))}
        </AnimatePresence>

        <CarouselNavigation 
          index={activeIndex} 
          setIndex={(newIndex) => {
            const dir = newIndex > activeIndex ? 1 : -1;
            setDirection(dir);
            setActiveIndex(newIndex);
          }} 
          itemsCount={cards.length} 
        />
        <CarouselIndicator 
          index={activeIndex} 
          setIndex={(newIndex) => {
            const dir = newIndex > activeIndex ? 1 : -1;
            setDirection(dir);
            setActiveIndex(newIndex);
          }} 
          itemsCount={cards.length} 
        />
      </div>
    </div>
  );
};

export default CardsStack;