// ============================================================================
// FILE: components/onboarding/step-indicator.tsx
// (unchanged logic with minor polish)
// ============================================================================
import { AnimatePresence, motion } from "framer-motion";
import { contentVariants } from "./utils";
import { Steps } from "@/lib/creators/schemas/creators-apply-shared";

export default function StepIndicator({
  currentStepIndex,
}: {
  currentStepIndex: number;
}) {
  const step = Steps[currentStepIndex];
  const pct = (currentStepIndex / (Steps.length - 1)) * 100;

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
        className=" max-w-lg mx-auto   min-h-30      "
      >
        {/* <div className=" max-w-xs mx-auto bg-muted h-1 sm:h-1.5 rounded-full overflow-hidden mt-2 sm:mt-3">
        <motion.div
          className="  h-full bg-linear-to-r from-amber-400 to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div> */}

        <motion.h3 className=" font-extrabold capitalize    ">
          {step.title}
        </motion.h3>
        <motion.p className=" leading-tight text-muted-foreground">
          {step.subTitle}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
