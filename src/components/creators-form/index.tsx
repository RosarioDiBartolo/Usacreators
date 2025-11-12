// ============================================================================
// FILE: components/onboarding/onboarding-form.tsx
// Purpose: TanStack Form (no RHF) + Zod via zodValidator (cross-field on submit).
// ============================================================================
"use client";

import { motion, AnimatePresence } from "framer-motion";

import StepIndicator from "./step-indicator";
import { PersonalInfo } from "./personal-info";
import { SocialInfo } from "./social-info";
import { AdditionalInfo } from "./additional-info";
import { ReviewConsentStep } from "./review-consent-step";
import { StepNavigation } from "./step-navigation";
import { contentVariants } from "./utils";

import {
  stepKeysMap,
  steps,
} from "@/lib/creators/schemas/creator-apply-client";

import useApplicationForm from "./use-application-form";
import { Suspense, useState } from "react";
 
export default function OnboardingForm() {
  const { form, isPending } = useApplicationForm();
  const [currentStep, setCurrentStep] = useState(0);
  async function nextStep() {
    const names = stepKeysMap[currentStep];
    const results = await Promise.all(
      names.map((n) => form.validateField(n, "change"))
    );
    const stepHasErrors = results.some((r) => r?.length);

    if (stepHasErrors) {
      console.error(
        "Error when trying to jump to next\n Step:",
        currentStep,
        "errors:",
        results
      );
    } else {
      setCurrentStep((s) => s + 1);
    }
  }
  function prevStep() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }
  return (
    <motion.div
      className="flex-1 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
       
      {currentStep !== steps.length && (
        <StepIndicator
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          steps={steps}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
        className="flex flex-col h-full text-start"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="flex-1 flex"
          >
            {currentStep === 0 && <PersonalInfo form={form} />}
            {currentStep === 1 && <SocialInfo form={form} />}
            {currentStep === 2 && <AdditionalInfo form={form} />}
            {currentStep === 3 && (
              <Suspense
                fallback={<p>Loading most recent legal related data...</p>}
              >
                <ReviewConsentStep form={form} />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>

        {currentStep !== steps.length && (
          <StepNavigation
            currentStep={currentStep}
            steps={steps}
            isSubmitting={isPending}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={() => form.handleSubmit()}
          />
        )}
      </form>
    </motion.div>
  );
}
