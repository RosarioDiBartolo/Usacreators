"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import logo from "@/assets/logo-no-text.png";
import React, { useRef, useState, type SetStateAction } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}
export const Navbar = ({
  children,
  className,
  visible,
  setVisible,
}: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY.current;
    lastY.current = latest;

    // Add hysteresis to prevent flicker
    if (latest > 120 && diff > 0) setVisible(true);
    else if (latest < 80 && diff < 0) setVisible(false);
  });

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full pointer-events-none",
        className
      )}
    >
      <div className="mx-auto  w-full max-w-7xl lg:px-4 lg:pt-4 pointer-events-auto">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible }
              )
            : child
        )}
      </div>
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      layout
      style={{
        justifyContent: visible ? "space-between" : "center",
      }}
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
       
        boxShadow: visible
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
        opacity: visible ? 1 : 0.98,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        " transition-colors hidden lg:flex z-[60] mx-auto   w-full flex-row items-center  gap-12  rounded-full px-6 py-3  ",
        visible
          ? "!bg-background/70 text-foreground"
          : " text-white  ",
        className
      )}
    >
      {React.Children.map(
        children,
        (child) =>
          React.isValidElement(child) && (
            <motion.div key={child.key} layout>
              {child}
            </motion.div>
          )
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
       
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex  flex-row items-center justify-center gap-1 text-sm font-medium",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative font-bold px-4 py-2 transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
        >
          <AnimatePresence>
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 h-full w-full rounded-full bg-primary"
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
          <span
            className={cn(
              "relative z-10",
              hovered === idx && "text-primary-foreground"
            )}
          >
            {item.name}
          </span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 0 0 rgba(0, 0, 0, 0)",
 
        borderRadius:   "12px"  
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "relative z-50 flex w-full flex-col items-center justify-between   lg:hidden !p-3",
          "bg-white/80 dark:bg-neutral-950/80" ,
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.98 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "w-full flex flex-col items-start gap-4 px-2 overflow-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 z-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <IconX className="text-black dark:text-white w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <IconMenu2 className="text-black dark:text-white w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 text-sm font-normal text-black dark:text-white"
    >
      <img
        className="rounded-full"
        src={logo}
        alt="logo"
        width={45}
        height={45}
      />
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" |"secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center whitespace-nowrap";

  const variantStyles = {
    outline:
      "shadow-none bg-gradient-to-t from-primary/10 to-tertiary/40 text-primary-foreground border border-accent  hover:bg-accent hover:text-accent-foreground", 
   
    primary:
      "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:bg-primary hover:text-primary-foreground",
    secondary:
      "bg-secondary shadow-none text-secondary-foreground  hover:bg-accent hover:text-accent-foreground", 
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-t from-primary to-tertiary text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
