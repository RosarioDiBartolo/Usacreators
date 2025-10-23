import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Search } from "lucide-react";

/* CTA Button */
const CTALink = ({
  to,
  children,
  colorVar,
  className,
}: PropsWithChildren<{ to: string; colorVar: string; className?: string }>) => {
  const color = `var(${colorVar})`;
  const accent = `var(--accent, ${color})`;

  return (
    <Link to={to}>
      <motion.button
        initial={{ boxShadow: `0 0 10px ${color}` }}
        animate={{
          boxShadow: [`0 0 10px ${color}`, `0 0 20px ${color}`, `0 0 10px ${color}`],
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 25px ${color}, 0 0 40px ${accent}`,
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: `0 0 40px ${color}, 0 0 80px ${accent}`,
        }}
        className={cn(
          className,
          "flex items-center gap-2 text-white text-lg sm:text-2xl font-bold px-8 sm:px-14 py-3 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300"
        )}
      >
        {children}
      </motion.button>
    </Link>
  );
};

/* Animation Variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = (factor: number): Variants => ({
  hidden: { opacity: 0, x: 50 * factor, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
});

interface SectionProps {
  coming: "left" | "right";
  image: string;
  titlePrefix: string;
  highlight: string;
  highlightGradient: string;
  subtitle: string;
  description: string;
  children: ReactNode;
}

/* Section */
function Section({
  image,
  coming,
  titlePrefix,
  highlight,
  highlightGradient,
  subtitle,
  description,
  children,
}: SectionProps) {
  const factor = coming === "left" ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 * factor, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex-1 relative flex items-end overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={`${highlight} collaboration`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[var(--creator-brand-overlay-dark)]" />
      </div>

      {/* Animated Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 p-8 sm:p-12 lg:p-16 pb-20 w-full"
      >
        <div className="max-w-[571px] space-y-8 lg:space-y-12">
          <motion.h2
            variants={itemVariants(factor)}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
          >
            <span className="text-white">{titlePrefix}</span>
            <span
              className={`bg-gradient-to-b ${highlightGradient} bg-clip-text text-transparent`}
            >
              {highlight}
            </span>{" "}
            <span className="text-[var(--creator-brand-overlay-light)]">
              {subtitle}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants(factor)}
            className="text-[var(--creator-brand-overlay-light)] text-xl font-normal leading-normal tracking-[1.6px] max-w-[571px]"
          >
            {description}
          </motion.p>

          <motion.div variants={itemVariants(factor)}>{children}</motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Sections Data */
const sections = [
  {
    id: "brand",
    coming: "left" as const,
    titlePrefix: "You're a ",
    highlight: "Brand",
    highlightGradient: "from-white to-[var(--creator-brand-gradient-purple)]",
    subtitle: "looking for content Creators",
    description:
      "Connect with verified creators who understand your brand vision and can produce authentic content that resonates.",
    children: (
      <CTALink colorVar="--color-violet-500" className="bg-violet-500" to="/catalog">
            <Search strokeWidth={3}   className=" " />

        Explore our Catalog
      </CTALink>
    ),
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/050e42f4e21e456fc1a5945bd70aa563b85a0b4f?width=1280",
  },
  {
    id: "creator",
    coming: "right" as const,
    titlePrefix: "You're a ",
    highlight: "Creator",
    highlightGradient:
      "from-white via-white to-[var(--creator-brand-gradient-orange)]",
    subtitle: "looking for Brand collaborations",
    description:
      "We’ve already onboarded top creators ready to deliver on-brand content for your business.",
    children: (
      <CTALink colorVar="--primary" className="bg-primary       " to="/creators">
            <UserPlus strokeWidth={3}   />

       Apply as a Creator 
      </CTALink>
    ),
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/20cf6364b91e0975383ef2014ac5c8180c4e4baf?width=1280",
  },
];

/* Main Component */
export default function CreatorsBrands() {
  return (
    <section className="w-full max-w-[1200px] mx-auto font-poppins">
      <div className="flex flex-col lg:flex-row rounded-t-[60px] overflow-hidden lg:rounded-t-[100px] min-h-[150vh] lg:min-h-[903px]">
        {sections.map((section) => (
          <Section key={section.id} {...section}>
            {section.children}
          </Section>
        ))}
      </div>
    </section>
  );
}
