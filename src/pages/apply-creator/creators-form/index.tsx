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
import {   useState } from "react";
import {
  stepKeysMap,
  Steps,
} from "@/lib/creators/schemas/creators-apply-shared";
import ConfirmStep from "./confirm";

export default function OnboardingForm() {
  const { form, isPending } = useApplicationForm({
    onSubmitSucces: () => {
      setCurrentStepIndex(Steps.length - 1);
    },
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = Steps[currentStepIndex];
  const confirmStep = currentStep.schema === null;
  async function nextStep() {
    if (currentStep.schema) {
      const fieldNames = stepKeysMap[currentStep.id];
      const validations = await Promise.all(
        fieldNames.map((field) =>
          form.validateField(`${currentStep.id}.${field}`, "change")
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
    } else {
      throw new Error("Cant't go a step forward");
    }
  }
  function prevStep() {
    if (currentStepIndex > 0) setCurrentStepIndex((s) => s - 1);
  }
  return (
    <motion.div
      className="
        min-h-full relative 

        p-10 py-30 flex flex-col gap-10 text-center 
        container   max-w-xl mx-auto   rounded-2xl   "
    >
      <StepIndicator currentStepIndex={currentStepIndex} />

      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        noValidate
        className=" flex-1 relative flex flex-col text-start"
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
              <ReviewConsentStep form={form} />
            )}   {confirmStep && <ConfirmStep form={form}  />}
          </motion.div>
        </AnimatePresence>
      </motion.form>

      <StepNavigation
        currentStepIndex={currentStepIndex}
        isSubmitting={isPending}
        nextStep={nextStep}
        prevStep={prevStep}
        handleSubmit={form.handleSubmit}
      />
    </motion.div>
  );
}
