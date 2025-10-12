"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {   step0Schema, step1Schema, fullSchema, stepKeysMap, type YesNo, type FormDataType } from "@/lib/form-schemas";
import StepIndicator from "./step-indicator";
import  PersonalInfo from "./personal-info";
import  SocialInfo from "./social-info";
import AdditionalInfo from "./additional-info";
import StepNavigation from "./step-navigation";
import { uploadProfileImage, opt, contentVariants } from "./utils";
import { steps } from "./data";
import SuccessStep from "./success";

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    profilePictureFile: null,
    bio: "",
    locationYesNo: "yes",
    instagram: "",
    tiktok: "",
    instagramPost: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateFormData<K extends keyof FormDataType>(
    field: K,
    value: FormDataType[K]
  ) {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field as string])
      setErrors(({ [field as string]: _, ...rest }) => rest);
  }

  async function handleProfileFile(file: File | null) {
    if (!file) return updateFormData("profilePictureFile", null);
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image.");
    if (file.size > 3 * 1024 * 1024) return toast.error("Max size 3MB.");
    updateFormData("profilePictureFile", file);
  }

  const validateAndSetErrorsForStep = () => {
    const schema =
      currentStep === 0
        ? step0Schema
        : currentStep === 1
        ? step1Schema
        : fullSchema;
    const parsed = schema.safeParse(formData);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const { fieldErrors } = parsed.error.flatten();
    const stepKeys = new Set(stepKeysMap[currentStep]);
    const next: Record<string, string> = {};
    for (const [k, msgs] of Object.entries(fieldErrors))
      if (stepKeys.has(k  as (typeof stepKeysMap)[number][number]) && msgs?.length) next[k] = msgs[0];
    setErrors(next);
    return false;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (!validateAndSetErrorsForStep()) return;
      setCurrentStep((s) => s + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

   async function handleSubmit() {
  const parsed = fullSchema.safeParse(formData);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    const map: Record<string, string> = {};
    for (const [k, msgs] of Object.entries(fieldErrors))
      if (msgs?.length) map[k] = msgs[0];
    setErrors(map);
    toast.error("Please correct the highlighted fields before submitting.");
    return;
  }

  try {
    setIsSubmitting(true);

    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      profilePictureUrl: formData.profilePictureFile
        ? await uploadProfileImage(formData.profilePictureFile)
        : undefined,
      bio: opt(parsed.data.bio),
      locationYesNo: (parsed.data.locationYesNo || "no") as YesNo,
      instagram: opt(parsed.data.instagram),
      tiktok: opt(parsed.data.tiktok),
      instagramPost: opt(parsed.data.instagramPost),
      additionalInfo: opt(parsed.data.additionalInfo),
    };

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Try to extract a server-provided message if available
      let serverMessage = "";
      try {
        const data = await res.json();
        serverMessage = data.message || "";
      } catch {
        /* ignore JSON parse errors */
      }

      if (res.status >= 500) {
        throw new Error(
          serverMessage || "Server error — please try again later."
        );
      } else if (res.status === 400) {
        throw new Error(serverMessage || "Invalid request. Please check your details.");
      } else if (res.status === 413) {
        throw new Error("File too large. Please upload a smaller image.");
      } else {
        throw new Error(serverMessage || "Something went wrong. Please try again.");
      }
    }

    toast.success("✅ Application submitted successfully!");
    nextStep()
  } catch (e: unknown) {
    let message = "Submission failed. Please try again.";

    if (e instanceof TypeError && e.message.includes("fetch")) {
      // e.g. network failure or CORS
      message = "Network error — please check your internet connection.";
    } else if (e instanceof Error) {
      message = e.message;
    }

    toast.error(message);
    console.error("Submission error:", e);
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <div className="w-full h-screen md:h-fit flex flex-col max-w-lg mx-auto py-8 px-4 relative">
      {currentStep !== 3 &&    <StepIndicator currentStep={currentStep} steps={steps} />}
      <motion.div className="flex-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border h-full shadow-md rounded-3xl overflow-hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep < steps.length - 1)  {nextStep()} else{ handleSubmit();}
            }}
            noValidate
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {currentStep === 0 && (
                  <PersonalInfo
                    formData={formData}
                    errors={errors}
                    updateFormData={updateFormData}
                    handleProfileFile={handleProfileFile}
                  />
                )}
                {currentStep === 1 && (
                  <SocialInfo
                    formData={formData}
                    errors={errors}
                    updateFormData={updateFormData}
                  />
                )}
                {currentStep === 2 && (
                  <AdditionalInfo
                    formData={formData}
                    errors={errors}
                    updateFormData={updateFormData}
                    setErrors={setErrors}
                  />
                )}
                {currentStep === 3 && (
                  <SuccessStep
                    
                  />
                )}
              </motion.div>
            </AnimatePresence>
            {
              currentStep !== 3 && <StepNavigation
              currentStep={currentStep}
              steps={steps}
              isSubmitting={isSubmitting}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
