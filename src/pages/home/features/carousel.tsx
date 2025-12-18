"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
}

export function Carousel({ items, autoPlay = false, interval = 4000 }: CarouselProps) {
  const [current, setCurrent] = React.useState(0)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const next = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = React.useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  React.useEffect(() => {
    if (!autoPlay) return
    timeoutRef.current = setTimeout(next, interval)
    return () => clearTimeout(timeoutRef.current!)
  }, [current, autoPlay, interval, next])

  return (
    <>
       <div className=" flex items-center justify-between absolute top-1/2 left-0  w-full px-4 z-10">
        <Button variant="ghost" className=" backdrop-blur-sm bg-background/70  border-foreground/20  " size="icon" onClick={prev}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="backdrop-blur-sm bg-background/70 border-foreground/20" size="icon" onClick={next}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="relative  h-[70vh] flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full h-full flex justify-center"
          >
            {items[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center my-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === current ? "bg-primary" : "bg-accent"
            }`}
          />
        ))}
      </div>
    </ >
  )
}
