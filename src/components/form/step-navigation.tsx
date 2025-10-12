import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import type { Step } from "@/lib/form-schemas";

export default function StepNavigation({
  currentStep,
  steps,
  isSubmitting,
  nextStep,
  prevStep,
  handleSubmit,
}: {
  currentStep: number;
  steps: Step[];
  isSubmitting: boolean;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => void;
}) {
  return (
    <div className="flex justify-between pt-6 pb-4 px-4">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0 || isSubmitting}
          className="rounded-2xl"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          type="button"
          onClick={() =>
            currentStep === steps.length - 1 ? handleSubmit() : nextStep()
          }
          disabled={isSubmitting}
          className="rounded-2xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : currentStep === steps.length - 1 ? (
            <>
              Submit <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Next <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
