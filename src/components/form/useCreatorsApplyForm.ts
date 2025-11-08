import {  useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { uploadProfileImage, opt } from "./utils";

// Import both client + submit schemas
import {
  clientSubmitSchema,
  ClientFormData,
} from "@/lib/creators/schemas/creator-apply-client";
import { getLegalVersions } from "@/lib/legal/utils";

// ---- Types ----
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

// Use the *input* of the CLIENT schema as the canonical form shape

// ---- API error helpers ----
function applyFieldErrorsFromApiTanStack(
  form: FormType,
  details?: ApiError["details"]
) {
  if (!details?.fieldErrors) return;

  for (const [name, errs] of Object.entries(details.fieldErrors)) {
    const key = name as keyof FormData;
    const message = Array.isArray(errs) ? errs[0] : String(errs);

    form.setFieldMeta(key, (prev) => ({
      ...prev,
      // Prefer errorMap so you can scope by cause (onSubmit here)
      errorMap: { ...(prev?.errorMap ?? {}), onSubmit: message },
      touched: true,
    }));
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

async function handleNonOkResponse(res: Response, form: FormType) {
  const data = (await res.json()) as ApiError;
  if (res.status === 400 && data?.details?.fieldErrors) {
    applyFieldErrorsFromApiTanStack(form, data.details);
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

const useCreatorApplyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [legalVersions, setLegalVersions] = useState<{
    termsVersion: string;
    privacyVersion: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLegalVersions()
      .then(setLegalVersions)
      .catch(() => setLegalVersions(null));
  }, []);

  // Strongly type defaults to the Zod *input* so unions match (File | undefined, "yes" | "no", etc.)
  const defaultValues: ClientFormData = {
    name: "",
    email: "",
    profilePictureFile: undefined as File | undefined,
    bio: undefined,
    locationYesNo: "yes",
    instagram: undefined,
    tiktok: undefined,
    instagramPost: undefined,
    additionalInfo: undefined,
    termsAccepted: false,
  };

  const form = useForm({
    // 1) Tell TanStack how to use Zod

    // 2) Defaults that conform to clientFormSchema input
    defaultValues,

    // 3) Submit-time cross-field validation (adapter wrapper)
    validators: {
      onSubmit: clientSubmitSchema,
     },

    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);

        const current = await getLegalVersions();

        const profilePictureUrl = value.profilePictureFile
          ? await uploadProfileImage(value.profilePictureFile)
          : undefined;

        const payload = {
          ...value,
          profilePictureUrl,
          bio: opt(value.bio),
          instagram: opt(value.instagram),
          tiktok: opt(value.tiktok),
          instagramPost: opt(value.instagramPost),
          additionalInfo: opt(value.additionalInfo),
          turnstileToken: await getTurnstileToken(),
          termsVersion: current.termsVersion,
          privacyVersion: current.privacyVersion,
        };

        const res = await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          if (res.status === 409) {
            const err = (await handleNonOkResponse(res, form)) as ApiError;

            if (err?.reason === "version_mismatch") {
              if (err.termsVersion && err.privacyVersion) {
                setLegalVersions({
                  termsVersion: err.termsVersion,
                  privacyVersion: err.privacyVersion,
                });
              } else {
                try {
                  const latest = await fetchLegalVersions();
                  setLegalVersions(latest);
                } catch {}
              }
              form.setFieldValue("termsAccepted", false);
              // ✅ valid cause name in new API:
              form.validateField("termsAccepted", "change");
            }
          } else {
            await handleNonOkResponse(res, form);
          }
          return;
        }

        toast.success("Application submitted successfully!");
        navigate({ to: "/success" });
        setCurrentStep((s) => s + 1);
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : "Network error. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return { form, isSubmitting, currentStep, setCurrentStep, legalVersions };
};

export type FormType = ReturnType<typeof useCreatorApplyForm>["form"];
 
export default useCreatorApplyForm;
