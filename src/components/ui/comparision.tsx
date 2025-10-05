'use client';

import { GripVerticalIcon } from 'lucide-react';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  KeyboardEvent,
  MouseEventHandler,
  TouchEventHandler,
} from 'react';
import { cn } from '@/lib/utils';

/* ========= Context ========= */

type Mode = 'hover' | 'drag';

type ImageComparisonContextType = {
  sliderPosition: number; // 0..100
  setSliderPosition: (pos: number) => void;
  setSliderPositionImmediate: (pos: number) => void; // also updates motionValue
  motionSliderPosition: MotionValue<number>;
  mode: Mode;
  disabled?: boolean;
  step: number;
};

const ImageComparisonContext = createContext<ImageComparisonContextType | undefined>(undefined);

const useImageComparisonContext = () => {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error('useImageComparisonContext must be used within a <Comparison>');
  }
  return context;
};

/* ========= Animated Tabs (controls the slider) ========= */

type TabOpt = { label: string; value: number }; // 0..100

export function TabsControlAnimated({
  options = [
    { label: "Brand’s section", value: 0 },
    { label: "Creator’s section", value: 100 },
  ],
  className,
}: {
  options?: TabOpt[];
  className?: string;
}) {
  const { sliderPosition, setSliderPositionImmediate, disabled } = useImageComparisonContext();

  // active tab = closest to current slider position (so dragging updates active state)
  const activeIndex = useMemo(() => {
    let idx = 0, best = Infinity;
    options.forEach((o, i) => {
      const d = Math.abs(o.value - sliderPosition);
      if (d < best) { best = d; idx = i; }
    });
    return idx;
  }, [options, sliderPosition]);

  return (
    <div
      className={cn(
        "sticky s top-6 w-fit mx-auto  z-50",
        "rounded-full px-1 bg-stone-100/90 backdrop-blur shadow border border-stone-200",
        className
      )}
    >
      <div className="relative p-1 flex gap-1">
        {/* Animated pill */}
        <motion.div
          layout
          layoutId="tabs-active-pill"
          className="absolute top-1 bottom-1 rounded-full bg-white shadow"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          style={{
            left: `calc(${(activeIndex / options.length) * 100}% + ${activeIndex * 0.25}rem)`,
            width: `calc(${(1 / options.length) * 100}% - ${(options.length - 1) * 0.25}rem/${options.length})`,
          }}
        />
        {options.map((opt, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={opt.label}
              type="button"
              disabled={disabled}
              onClick={() => setSliderPositionImmediate(opt.value)}
              className={cn(
                "relative z-10 px-4 py-2 rounded-full text-sm font-medium",
                isActive ? "text-stone-900" : "text-stone-600 hover:text-stone-900",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-pressed={isActive}
              whileHover={!disabled ? { scale: 1.03 } : {}}
              whileTap={!disabled ? { scale: 0.97 } : {}}
              transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.3 }}
            >
              {opt.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ========= Core Comparison ========= */

export type ComparisonProps = HTMLAttributes<HTMLDivElement> & {
  mode?: Mode;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  initialPosition?: number; // default 50
  step?: number; // keyboard step, default 2
  disabled?: boolean;
  // Optional: snap to nearest after drag end
  snapPoints?: number[]; // e.g., [0, 50, 100]
};

export const Comparison = ({
  className,
  mode = 'drag',
  onDragStart,
  onDragEnd,
  initialPosition = 50,
  step = 2,
  disabled = false,
  snapPoints,
  ...props
}: ComparisonProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  // state + motion value
  const [sliderPosition, setSliderPosition] = useState(clamp(initialPosition));
  const motionValue = useMotionValue(sliderPosition);
  const motionSliderPosition = useSpring(motionValue, { stiffness: 250, damping: 30, mass: 3});

  useEffect(() => {
    motionValue.set(sliderPosition);
  }, [sliderPosition, motionValue]);

  const setSliderPositionImmediate = (pos: number) => {
    const v = clamp(pos);
    setSliderPosition(v);
    motionValue.set(v);
  };

  // dragging
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (domRect: DOMRect, clientX: number) => {
    if (disabled) return;
    if (!isDragging && mode === 'drag') return; // in hover it can update on move without drag
    const x = clientX - domRect.left;
    const percentage = clamp((x / domRect.width) * 100);
    setSliderPosition(percentage);
  };

  const handleMouseDrag: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!event.currentTarget) return;
    handleDrag(event.currentTarget.getBoundingClientRect(), event.clientX);
  };

  const handleTouchDrag: TouchEventHandler<HTMLDivElement> = (event) => {
    if (!event.currentTarget) return;
    const touches = Array.from(event.touches);
    handleDrag(event.currentTarget.getBoundingClientRect(), touches.at(0)?.clientX ?? 0);
  };

  const startDrag = () => {
    if (disabled || mode !== 'drag') return;
    setIsDragging(true);
    onDragStart?.();
  };

  const endDrag = () => {
    if (mode !== 'drag') return;
    setIsDragging(false);
    // optional snap on release
    if (snapPoints?.length) {
      const nearest = snapPoints.reduce((prev, cur) =>
        Math.abs(cur - sliderPosition) < Math.abs(prev - sliderPosition) ? cur : prev
      , snapPoints[0]);
      setSliderPositionImmediate(nearest);
    }
    onDragEnd?.();
  };

  // keyboard a11y
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSliderPositionImmediate(sliderPosition - step);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSliderPositionImmediate(sliderPosition + step);
        break;
      case 'Home':
        e.preventDefault();
        setSliderPositionImmediate(0);
        break;
      case 'End':
        e.preventDefault();
        setSliderPositionImmediate(100);
        break;
      case 'PageDown':
        e.preventDefault();
        setSliderPositionImmediate(sliderPosition - step * 5);
        break;
      case 'PageUp':
        e.preventDefault();
        setSliderPositionImmediate(sliderPosition + step * 5);
        break;
    }
  };

  return (
    <ImageComparisonContext.Provider
      value={{
        sliderPosition,
        setSliderPosition,
        setSliderPositionImmediate,
        motionSliderPosition,
        mode,
        disabled,
        step,
      }}
    >
      {/* Put TabsControlAnimated here or from parent as a child */}
      {/* Example default two-tabs control: */}
      <TabsControlAnimated
        options={[
          { label: "Brand’s section", value: 0 },
          { label: "Creator’s section", value: 100 },
        ]}
      />

      <div
        ref={containerRef}
        aria-label="Comparison slider"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
        className={cn(
          'relative isolate w-full select-none overflow-hidden outline-none',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
          className
        )}
        onMouseDown={startDrag}
        onMouseLeave={endDrag}
        onMouseMove={handleMouseDrag}
        onMouseUp={endDrag}
        onTouchStart={startDrag}
        onTouchMove={handleTouchDrag}
        onTouchEnd={endDrag}
        {...props}
      />
    </ImageComparisonContext.Provider>
  );
};

/* ========= Items & Handle ========= */

export type ComparisonItemProps = ComponentProps<typeof motion.div> & {
  position: 'left' | 'right';
  alt?: string; // optional a11y label if you’re not nesting an <img>
};

export const ComparisonItem = ({
  className,
  position,
  alt,
  ...props
}: ComparisonItemProps) => {
  const { motionSliderPosition } = useImageComparisonContext();
  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`);
  const rightClipPath = useTransform(motionSliderPosition, (value) => `inset(0 ${100 - value}% 0 0)`);

  return (
    <motion.div
      aria-hidden={alt ? undefined : true}
      aria-label={alt}
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
      role={alt ? 'img' : 'presentation'}
      style={{ clipPath: position === 'left' ? leftClipPath : rightClipPath }}
      {...props}
    />
  );
};

export type ComparisonHandleProps = ComponentProps<typeof motion.div> & {
  children?: ReactNode;
};

export const ComparisonHandle = ({
  className,
  children,
  ...props
}: ComparisonHandleProps) => {
  const { motionSliderPosition, mode, disabled } = useImageComparisonContext();
  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        '-translate-x-1/2 absolute top-0 z-50 flex h-full w-10 items-center justify-center',
        mode === 'drag' && !disabled && 'cursor-grab active:cursor-grabbing',
        className
      )}
      role="presentation"
      style={{ left }}
      {...props}
    >
      {children ?? (
        <>
          <div className="-translate-x-1/2 absolute left-1/2 h-full w-px bg-background/80" />
          {mode === 'drag' && !disabled && (
            <div className="z-50 flex items-center justify-center rounded-sm bg-background px-0.5 py-1 shadow">
              <GripVerticalIcon className="h-4 w-4 select-none text-muted-foreground" />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};
