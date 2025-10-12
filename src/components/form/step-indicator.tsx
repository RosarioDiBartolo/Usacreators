import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Step } from "@/lib/form-schemas";
 const StepIndicator = ({ currentStep, steps }: { currentStep: number; steps:  Step[]}) => {
  const pct = (currentStep / (steps.length - 1)) * 100;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-2 sm:justify-between mb-2">
        {steps.map((step, index) => (
          <motion.div key={step.id} className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
            <motion.button
              type="button"
              className={cn(
                "w-2 h-2 rounded-full cursor-pointer transition-colors",
                index < currentStep
                  ? "bg-primary"
                  : index === currentStep
                  ? "bg-primary ring-4 ring-primary/20"
                  : "bg-muted"
              )}
              aria-current={index === currentStep ? "step" : undefined}
              aria-label={step.title}
            />
            <span
              className={cn(
                "text-xs mt-1.5 hidden sm:block",
                index <= currentStep  ? "text-primary font-medium" :    "text-background" 
              )}
            >
              {step.title}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2">
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
