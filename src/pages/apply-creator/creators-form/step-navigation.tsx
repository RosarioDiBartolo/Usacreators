// ============================================================================
// FILE: components/onboarding/step-navigation.tsx
// ============================================================================
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { steps } from "@/lib/creators/schemas/creators-apply-shared";
 
export function StepNavigation({
  currentStepIndex,
   isSubmitting,
  nextStep,
  prevStep,
  handleSubmit,
}: {
  currentStepIndex: number; 
  isSubmitting: boolean;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => void;
}) {
  const isLastInteractiveStep = currentStepIndex === steps.length - 1; // before success

   return (
    <div className=" sticky bottom-0  py-5"> 
    <div className="   rounded-full backdrop-blur flex gap-3 sm:gap-4 justify-between p-3  border ">
      
      <motion.div whileHover={{ scale: 1.05 }} className="flex-1 sm:flex-none">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStepIndex === 0 || isSubmitting}
          className="rounded-xl sm:rounded-2xl w-full sm:w-auto text-sm sm:text-base"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="   ">Back</span>
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} className="flex-1 sm:flex-none">
        <Button
          type="button"
          onClick={() =>{
             if(isLastInteractiveStep){ 
           
              handleSubmit();
             }else{ nextStep()}

          }}
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
              <span className="  ">Next</span>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </div></div>
  );
}
