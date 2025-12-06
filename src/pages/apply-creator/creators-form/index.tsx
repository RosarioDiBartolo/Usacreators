// ============================================================================
// FILE: components/onboarding/onboarding-form.tsx
// Purpose: TanStack Form (no RHF) + Zod via zodValidator (cross-field on submit).
// ============================================================================
"use client";

import { motion, AnimatePresence } from "framer-motion";

import StepIndicator from "./step-indicator";
import { PersonalInfo } from "./personal";
import { SocialInfo } from "./social";
import { Details } from "./details";
import { ReviewConsentStep } from "./review-consent";
import { StepNavigation } from "./step-navigation";
import { contentVariants } from "./utils";

import useApplicationForm from "@/lib/creators/use-application-form";
import { Suspense, useState } from "react";
import { 
  stepKeysMap,
  steps,
} from "@/lib/creators/schemas/creators-apply-shared";

export default function OnboardingForm() {
  const { form, isPending } = useApplicationForm();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep  = steps[currentStepIndex];
  async function nextStep() {
    const fieldNames = stepKeysMap[currentStep];
     const validations = await Promise.all(
      fieldNames.map((field) =>
        form.validateField(`${currentStep}.${field}`, "change")
      )
    );

    const stepHasErrors = validations.some(
      (issues) => issues && issues.length > 0
    );

    if (stepHasErrors) {
      console.error(
        "Error when trying to jump to next\n Step:",
        currentStepIndex,
        "errors:",
        validations
      );
    } else {
      setCurrentStepIndex((s) => s + 1);
    }
  }
  function prevStep() {
    if (currentStepIndex > 0) setCurrentStepIndex((s) => s - 1);
  }
  return (
    <motion.div className=" min-h-full  flex flex-col ">
      {currentStepIndex !== steps.length && (
        <StepIndicator
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={currentStepIndex}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
        className=" flex-1   flex flex-col text-start"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="flex-1  "
          >
            {currentStepIndex === 0 && <PersonalInfo form={form} />}
            {currentStepIndex === 1 && <SocialInfo form={form} />}
            {currentStepIndex === 2 && <Details form={form} />}
            {currentStepIndex === 3 && (
              <Suspense
                fallback={<p>Loading most recent legal related data...</p>}
              >
                <ReviewConsentStep form={form} />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>

        {currentStepIndex !== steps.length && (
          <StepNavigation
            currentStepIndex={currentStepIndex}
            
            isSubmitting={isPending}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={form.handleSubmit}
          />
        )}
      </form>
    </motion.div>
  );
}
