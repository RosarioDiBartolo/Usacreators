// ============================================================================
// FILE: components/onboarding/step-navigation.tsx
// ============================================================================
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

import {
 type Step      // <- use this everywhere
} from "@/lib/creators/schemas/creator-apply-client";
export function StepNavigation({
  currentStep,
  steps,
  isSubmitting,
  nextStep,
  prevStep,
  handleSubmit,
}: {
  currentStep: number;
steps: ReadonlyArray<Step>
  isSubmitting: boolean;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => void;
}) {
  const isLastInteractiveStep = currentStep === steps.length - 1; // before success

   return (
    <div className="flex gap-3 sm:gap-4 justify-between pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-6">
      
      <motion.div whileHover={{ scale: 1.05 }} className="flex-1 sm:flex-none">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0 || isSubmitting}
          className="rounded-xl sm:rounded-2xl w-full sm:w-auto text-sm sm:text-base"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} className="flex-1 sm:flex-none">
        <Button
          type="button"
          onClick={() => (isLastInteractiveStep ? handleSubmit() : nextStep())}
          disabled={isSubmitting}
          className="rounded-xl sm:rounded-2xl w-full sm:w-auto text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Submitting...</span>
            </>
          ) : isLastInteractiveStep ? (
            <>
              <span className="hidden sm:inline">Submit</span>
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
