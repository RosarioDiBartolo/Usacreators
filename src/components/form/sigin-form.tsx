// ============================================================================
// FILE: components/onboarding/onboarding-form.tsx
// Purpose: Glue all steps together with RHF + Zod per the provided guide.
// ============================================================================
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import {
  fullSchema,
  stepKeysMap,
  type YesNo,
  type FormDataType,
  steps,
} from "@/lib/form-schemas";
import StepIndicator from "./step-indicator";
import { PersonalInfo } from "./personal-info";
import { SocialInfo } from "./social-info";
import { AdditionalInfo } from "./additional-info";
import { ReviewConsentStep } from "./review-consent-step";
import { StepNavigation } from "./step-navigation";
import { uploadProfileImage, opt, contentVariants } from "./utils";
import { SuccessStep } from "./success";

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormDataType>({
    resolver: zodResolver(fullSchema) as unknown as Resolver<FormDataType>,
    defaultValues: {
      name: "",
      email: "",
      profilePictureFile: null,
      bio: undefined,
      locationYesNo: "yes" as YesNo,
      instagram: undefined,
      tiktok: undefined,
      instagramPost: undefined,
      additionalInfo: undefined,
      termsAccepted: false,
    },
    mode: "onSubmit",
  });

  const { handleSubmit, control, trigger, setValue, getValues } = form;

  async function nextStep() {
    const stepKeys = stepKeysMap[currentStep];
    const isValid = await trigger(stepKeys  );
    if (isValid) setCurrentStep((s) => s + 1);
  }
  function prevStep() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  async function onSubmit(data: FormDataType) {
    try {
      setIsSubmitting(true);
      const profilePictureUrl = data.profilePictureFile
        ? await uploadProfileImage(data.profilePictureFile)
        : undefined;

      const payload = {
        ...data,
        profilePictureUrl,
        bio: opt(data.bio),
        instagram: opt(data.instagram),
        tiktok: opt(data.tiktok),
        instagramPost: opt(data.instagramPost),
        additionalInfo: opt(data.additionalInfo),
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      toast.success("Application submitted successfully!");
      setCurrentStep((s) => s + 1);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
    className="  flex-1 flex flex-col"
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {currentStep !== steps.length - 1 && (
        <StepIndicator currentStep={currentStep} steps={steps} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col h-full text-start  "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="  flex-1 flex sm:items-center"
          >
            {currentStep === 0 && <PersonalInfo control={control} />}
            {currentStep === 1 && <SocialInfo control={control} />}
            {currentStep === 2 && (
              <AdditionalInfo
                control={control}
                handleProfileFile={(file) =>
                  setValue("profilePictureFile", file)
                }
              />
            )}
            {currentStep === 3 && <ReviewConsentStep control={control} />}
            {currentStep === 4 && <SuccessStep />}
          </motion.div>
        </AnimatePresence>

        {currentStep !== steps.length - 1 && (
          <StepNavigation
            currentStep={currentStep}
            steps={steps}
            isSubmitting={isSubmitting}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit(onSubmit)}
          />
        )}
      </form>
    </motion.div>
  );
}
