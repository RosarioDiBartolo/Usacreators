// ============================================================================
// FILE: components/onboarding/step-indicator.tsx
// (unchanged logic with minor polish)
// ============================================================================
import { motion } from "framer-motion";
import { cn } from "@/lib/client-only/utils";
import { Dispatch, SetStateAction } from "react";
import { steps } from "@/lib/creators/schemas/creators-apply-shared";

export default function StepIndicator({
  currentStepIndex,
  setCurrentStepIndex,
}: {
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  currentStepIndex: number;
}) {
  const step = steps[currentStepIndex];
  const pct = (currentStepIndex / (steps.length - 1)) * 100;
  return (
    <motion.div
      className="p-6 h-fit  "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.h3
        layoutId={step}
        className=" capitalize my-0 bg-text bg-gradient"
      >
        {step}
      </motion.h3>

     
      {/* <div className=" py-4 hidden sm:flex gap-1 sm:gap-6 sm:justify-between">
        {steps.map((step, index) => (
          <motion.button
            disabled={index > currentStepIndex}
            onClick={() => {
              setCurrentStepIndex(index);
            }}
            type="button"
            key={step}
            className="flex disabled:cursor-not-allowed cursor-pointer flex-col items-center flex-1 sm:flex-none"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={cn(
                "w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-default transition-colors",
                index < currentStepIndex
                  ? "bg-linear-to-b from-amber-400 to-primary"
                  : index === currentStepIndex
                    ? "bg-linear-to-b from-amber-400 to-primary ring-2 sm:ring-4 ring-primary/20"
                    : "bg-muted"
              )}
              aria-current={index === currentStepIndex ? "step" : undefined}
              aria-label={step}
            />
            <span
              className={cn(
                "text-xs sm:text-sm mt-1 sm:mt-1.5 hidden sm:block",
                index <= currentStepIndex
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </motion.button>
        ))}
      </div> */}
  <div className="w-full bg-muted h-1 sm:h-1.5 rounded-full overflow-hidden mt-2 sm:mt-3">
        <motion.div
          className="  h-full bg-linear-to-r from-amber-400 to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
