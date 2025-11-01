// ============================================================================
// FILE: components/onboarding/onboarding-form.tsx
// Purpose: Glue all steps together with RHF + Zod per the provided guide.
// Implements anonymous, server-verified legal acceptance (no client acceptedAt).
// ============================================================================
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver, type UseFormSetError } from "react-hook-form";

import StepIndicator from "./step-indicator";
import { PersonalInfo } from "./personal-info";
import { SocialInfo } from "./social-info";
import { AdditionalInfo } from "./additional-info";
import { ReviewConsentStep } from "./review-consent-step";
import { StepNavigation } from "./step-navigation";
import { uploadProfileImage, opt, contentVariants } from "./utils";

import {
  stepKeysMap,
  steps,
  fullSchema, // zod schema used by the client
  type ClientFormData, // <- use this everywhere
} from "@shared/creator-apply-client";
import { useNavigate } from "react-router-dom";

// ---- helpers ----
type ApiError = {
  success?: boolean;
  code?: string;
  message?: string;
  details?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] };
  requestId?: string;
  reason?: string; // e.g., "version_mismatch"
  termsVersion?: string;
  privacyVersion?: string;
};

function applyFieldErrorsFromApi(
  setError: UseFormSetError<ClientFormData>,
  details?: ApiError["details"]
) {
  if (!details?.fieldErrors) return;
  for (const [name, errs] of Object.entries(details.fieldErrors)) {
    const message = Array.isArray(errs) ? errs[0] : String(errs);
    // Cast the key so TS is happy; server can send only valid field names by contract
    setError(name as keyof ClientFormData, { type: "server", message });
  }
}

function toastApiError(err: ApiError, status: number) {
  const base = err.message || "Something went wrong.";
  const ref = err.requestId ? ` • Ref: ${err.requestId}` : "";
  switch (status) {
    case 400:
      return toast.error(`Invalid data. ${base}${ref}`);
    case 403:
      return toast.error(`Captcha failed. ${base}${ref}`);
    case 429:
      return toast.error(`Too many requests. ${base}${ref}`);
    case 409:
      if (err.code === "DUPLICATE_EMAIL")
        return toast.error(`This email already applied.${ref}`);
      if (err.code === "DUPLICATE_INSTAGRAM")
        return toast.error(`This Instagram already applied.${ref}`);
      if (err.code === "DUPLICATE_TIKTOK")
        return toast.error(`This TikTok already applied.${ref}`);
      if (err.reason === "version_mismatch")
        return toast.error(
          `Our Terms/Privacy changed. Please review and accept the new version.`
        );
      return toast.error(`Conflict. ${base}${ref}`);
    case 503:
      return toast.error(`Captcha unavailable. ${base}${ref}`);
    default:
      return toast.error(`${base}${ref}`);
  }
}

async function handleNonOkResponse(
  res: Response,
  setError: UseFormSetError<ClientFormData>
) {
  const data = (await res.json()) as ApiError;
  if (res.status === 400 && data?.details?.fieldErrors) {
    applyFieldErrorsFromApi(setError, data.details);
  }
  toastApiError(data, res.status);
  return data;
}

// (Optional) Turnstile helper — replace with your actual integration
async function getTurnstileToken(): Promise<string | undefined> {
  return undefined;
}

// ⚖️ Load current legal versions from static registry (no-store to avoid staleness)
async function fetchLegalVersions(): Promise<{
  termsVersion: string;
  privacyVersion: string;
}> {
  const res = await fetch("/legal/registry.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load legal registry");
  const reg = await res.json();
  return {
    termsVersion: String(reg?.terms?.current ?? ""),
    privacyVersion: String(reg?.privacy?.current ?? ""),
  };
}

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [legalVersions, setLegalVersions] = useState<{
    termsVersion: string;
    privacyVersion: string;
  } | null>(null);
  const navigate = useNavigate();

  const form = useForm<ClientFormData>({
    resolver: zodResolver(fullSchema) as unknown as Resolver<ClientFormData>,
    defaultValues: {
      name: "",
      email: "",
      profilePictureFile: undefined, // <- not null; matches optional File
      bio: undefined,
      locationYesNo: "yes", // <- no external YesNo type needed
      instagram: undefined,
      tiktok: undefined,
      instagramPost: undefined,
      additionalInfo: undefined,
      termsAccepted: false,
    },
    mode: "onSubmit",
  });

  const { handleSubmit, control, trigger, setValue, getValues } = form;

  // Load legal versions on mount so you can link to exact versions in your consent UI
  useEffect(() => {
    fetchLegalVersions()
      .then(setLegalVersions)
      .catch(() => setLegalVersions(null));
  }, []);

  async function nextStep() {
    const stepKeys = stepKeysMap[currentStep];
    const isValid = await trigger(stepKeys);
    if (isValid) setCurrentStep((s) => s + 1);
  }
  function prevStep() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

    
  async function onSubmit(data: ClientFormData) {
    try {
      setIsSubmitting(true);

      // 1) Always refresh current legal versions right before submit
      const current = await fetchLegalVersions();

      // 2) Upload image if provided
      const profilePictureUrl = data.profilePictureFile
        ? await uploadProfileImage(data.profilePictureFile)
        : undefined;

      // 3) Build payload (NO client acceptedAt)
      const payload = {
        ...data,
        profilePictureUrl,
        bio: opt(data.bio),
        instagram: opt(data.instagram),
        tiktok: opt(data.tiktok),
        instagramPost: opt(data.instagramPost),
        additionalInfo: opt(data.additionalInfo),

        turnstileToken: await getTurnstileToken(), // or remove if unused

        // Send server the exact versions we are showing
        termsVersion: current.termsVersion,
        privacyVersion: current.privacyVersion,
      };

      // 4) Post to API
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Special handling for version mismatch (409)
        if (res.status === 409) {
          const err = (await handleNonOkResponse(
            res,
            form.setError
          )) as ApiError;

          // If server says versions changed, update local state and force re-accept
          if (err?.reason === "version_mismatch") {
            if (err.termsVersion && err.privacyVersion) {
              setLegalVersions({
                termsVersion: err.termsVersion,
                privacyVersion: err.privacyVersion,
              });
            } else {
              // Fallback: re-fetch registry
              try {
                const latest = await fetchLegalVersions();
                setLegalVersions(latest);
              } catch {
                /* ignore */
              }
            }
            // Force user to re-tick consent (they must accept the new version)
            setValue("termsAccepted", false, {
              shouldValidate: true,
              shouldTouch: true,
            });
          }
        } else {
          await handleNonOkResponse(res, form.setError);
        }
        return;
      }

      toast.success("Application submitted successfully!");

      navigate("/success")
      setCurrentStep((s) => s + 1);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Network error. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }
   return (
    <motion.div
      className="flex-1 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {currentStep !== steps.length   && (
        <StepIndicator
        setCurrentStep = {setCurrentStep}
        currentStep={currentStep} steps={steps} />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
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
            className="flex-1 flex "
          >
            {currentStep === 0 && (
              <PersonalInfo
                control={control}
                 handleProfileFile={(file) =>
                  setValue("profilePictureFile", file || undefined)
                }
              />
            )}
            {currentStep === 1 && <SocialInfo control={control} />}
            {currentStep === 2 && (
              <AdditionalInfo
                control={control}
                
              />
            )}

            {/* Pass exact version strings to the consent step (optional UI) */}
            {currentStep === 3 && (
              <ReviewConsentStep
                control={control}
                // @ts-expect-error Add these props to the component if desired
                termsVersion={legalVersions?.termsVersion}
                privacyVersion={legalVersions?.privacyVersion}
              />
            )}

            {/* {currentStep === 4 && <SuccessStep />} */}
          </motion.div>
        </AnimatePresence>

        {currentStep !== steps.length   && (
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
