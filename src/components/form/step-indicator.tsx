// ============================================================================
// FILE: components/onboarding/step-indicator.tsx
// (unchanged logic with minor polish)
// ============================================================================
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Step } from "@shared/creator-apply-client";
import { Dispatch, SetStateAction } from "react";
  
export default function StepIndicator({
  currentStep,
  setCurrentStep,
  steps,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
steps: ReadonlyArray<Step>
}) {

  const step = steps[currentStep]
  const pct = (currentStep / (steps.length - 1)) * 100;
  return (
    <motion.div
      className="p-6 h-fit"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
       
         <motion.h2
         layoutId = {step.id}
        className=" capitalize my-0 bg-text bg-gradient">{step.id}</motion.h2>
        
            <div className="w-full bg-muted h-1 sm:h-1.5 rounded-full overflow-hidden mt-2 sm:mt-3">
        <motion.div
          className="  h-full bg-gradient-to-r from-amber-400 to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
        
      </div>
      <div className=" py-4 hidden sm:flex gap-1 sm:gap-6 sm:justify-between">
        {steps.map((step, index) => (
          <motion.button
          disabled = {index > currentStep}
          onClick={()=>{
                setCurrentStep(index)
              }}
              type="button"
            key={step.id}
            className="flex disabled:cursor-not-allowed cursor-pointer flex-col items-center flex-1 sm:flex-none"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
 
              className={cn(
                "w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-default transition-colors",
                index < currentStep
                  ? "bg-gradient-to-b from-amber-400 to-primary"
                  : index === currentStep
                  ? "bg-gradient-to-b from-amber-400 to-primary ring-2 sm:ring-4 ring-primary/20"
                  : "bg-muted"
              )}
              aria-current={index === currentStep ? "step" : undefined}
              aria-label={step.id}
            />
            <span
              className={cn(
                "text-xs sm:text-sm mt-1 sm:mt-1.5 hidden sm:block",
                index <= currentStep
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step.id}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
