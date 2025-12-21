// ============================================================================
// FILE: components/onboarding/step-indicator.tsx
// (unchanged logic with minor polish)
// ============================================================================
import { AnimatePresence, motion } from "framer-motion";
import { contentVariants } from "./utils";
import { Steps } from "@/lib/creators/schemas/creators-apply-shared";
import { badgeVariants } from "@/components/ui/badge";

export default function StepIndicator({
  currentStepIndex,
}: {
  currentStepIndex: number;
}) {
  const step = Steps[currentStepIndex];
 
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        layoutId={step.id}
        layout
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="    mb-10      "
      >
        <h2
          className={badgeVariants({
            variant: "default",
            className: "  capitalize",
          })}
        >
          <step.icon /> {step.id}
        </h2>
        <motion.p
          className="
            
            text-balance
            text-foreground-focus
            text-5xl md:text-6xl
            leading-tight
            font-bold
          "
        >
          {step.title}
        </motion.p>
        <motion.p
          className="   
            font-normal
          text-balance
            text-base
            sm:text-lg
            leading-relaxed
            text-fground"
        >
          {step.subTitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
