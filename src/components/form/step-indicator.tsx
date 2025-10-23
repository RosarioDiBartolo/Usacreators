import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Step } from "@/lib/form-schemas";
 const StepIndicator = ({ currentStep, steps }: { currentStep: number; steps:  Step[]}) => {
  const pct = (currentStep / (steps.length - 1)) * 100;

  return (
    <motion.div
      className="mb-6 sm:mb-8 px-4 sm:px-6 pt-4 sm:pt-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-1 sm:gap-2 sm:justify-between mb-2">
        {steps.map((step, index) => (
          <motion.div key={step.id} className="flex flex-col items-center flex-1 sm:flex-none" whileHover={{ scale: 1.05 }}>
            <motion.button
              type="button"
              className={cn(
                "w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-colors",
                index < currentStep
                  ? "bg-primary"
                  : index === currentStep
                  ? "bg-primary ring-2 sm:ring-4 ring-primary/20"
                  : "bg-muted"
              )}
              aria-current={index === currentStep ? "step" : undefined}
              aria-label={step.title}
            />
            <span
              className={cn(
                "text-xs sm:text-sm mt-1 sm:mt-1.5 hidden sm:block",
                index <= currentStep  ? "text-primary font-medium" :    "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="w-full bg-muted h-1 sm:h-1.5 rounded-full overflow-hidden mt-2 sm:mt-3">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default StepIndicator;
