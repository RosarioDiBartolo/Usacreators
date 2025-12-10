import * as React from "react";
import { cn } from "@/lib/client-only/utils";

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text or content inside the button */
  children?: React.ReactNode;
  /** Background color for animation layer (Tailwind color class or custom value) */
  animationColor?: string;
  /** Text color before hover */
  textColor?: string;
  /** Text color after hover */
  hoverTextColor?: string;
  /** Animation speed (ms) */
  duration?: number;
}

/**
 * A flexible animated button with a hover background sweep effect.
 */
const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children = "Animated Button",
      className,
      animationColor = "bg-purple-600",
      textColor = "text-black",
      hoverTextColor = "text-white",
      duration = 500,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all rounded-md bg-white group/animated-button outline-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
          className
        )}
      >
        {/* Animated background layer */}
        <span
          className={cn(
            "absolute bottom-0 left-0 w-48 h-48 rounded rotate-[-40deg] -translate-x-full translate-y-full ease-out group-hover/animated-button:translate-x-0 group-hover/animated-button:-translate-y-12",
            animationColor
          )}
          style={{
            transitionDuration: `${duration}ms`,
          }}
        />
        {/* Text layer */}
        <span
          className={cn(
            "relative z-10 transition-colors ease-in-out",
            textColor,
            `group-hover/animated-button:${hoverTextColor}`
          )}
          style={{
            transitionDuration: `${duration * 0.6}ms`,
          }}
        >
          {children}
        </span>
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
