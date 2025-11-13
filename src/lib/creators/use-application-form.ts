import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

// Import both client + submit schemas
import {
  clientFormObject,
  clientSubmitSchema,
} from "@/lib/creators/schemas/creator-apply-client";
import { z } from "zod";
import { opt } from "@/lib/utils";
import { uploadDirect } from "@/lib/upload";
import { getUploadSignature } from "@/lib/upload-signature";
import {
  ApiError,
  submitCreatorApplication,
} from "@/lib/creators/subscribe-creator";
import {
  Payload,
  payloadSchema,
} from "@/lib/creators/schemas/creators-apply-shared";
import { useMutation } from "@tanstack/react-query";
import { useCurrentLegal } from "@/lib/legal/hooks";

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

// (Optional) Turnstile helper — replace with your actual integration
async function getTurnstileToken(): Promise<string | undefined> {
  return undefined;
}

const useApplicationForm = () => {
  //Use cached if any...
  const { data: currentVersions } = useCurrentLegal();

  const { mutateAsync: Submit, isPending } = useMutation({
    mutationFn: async ({ value }: { value: DefaultValues }) => {
      const { profilePictureFile, termsAccepted, ...stripped } = value;
      if (!profilePictureFile) {
        throw "Missing profilePictureFile.";
      }

      //this is a block
      const policy = await getUploadSignature({
        data: {
          folder: "users/avatars",
          eager: "c_fill,w_768,h_768,q_auto,f_auto",
        },
      });
      const { secure_url: profilePictureUrl } = await uploadDirect(
        profilePictureFile,
        policy
      );
      //Block End
      const payload = await payloadSchema.parseAsync({
        ...stripped,
        profilePictureUrl,
        bio: opt(value.bio),
        instagram: value.instagram,
        portfolio: value.portfolio,
        tiktok: value.tiktok,
        turnstileToken: await getTurnstileToken(),
        termsVersion: currentVersions.terms,
        privacyVersion: currentVersions.privacy,
      } satisfies Payload);

      await submitCreatorApplication({ data: payload });
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      navigate({ to: "/success" });
    },
    onError: (e: { result: ApiError }) => {
      const error =
        e.result?.message ?? "Error in form submission. Please try again.";
      console.log("Mutation Error", e);
      toast.error(error);
    },
  });

  const navigate = useNavigate();

  type FormValues = z.infer<typeof clientFormObject>;
  type DefaultValues = Omit<FormValues, "profilePictureFile"> & {
    profilePictureFile?: FormValues["profilePictureFile"];
  };
  // Strongly type defaults to the Zod *input* so unions match (File | undefined, "yes" | "no", etc.)
  const defaultValues = {
    name: "",
    email: "",
    profilePictureFile: undefined,
    bio: undefined,
    niches: [],
    locationYesNo: "yes",
    portfolio: "",
    instagram: undefined,
    tiktok: undefined,
    termsAccepted: false,
  } satisfies DefaultValues;

  const form = useForm({
    // 1) Tell TanStack how to use Zod
    // 2) Defaults that conform to clientFormSchema input
    defaultValues,

    // 3) Submit-time cross-field validation (adapter wrapper)
    validators: {
      onSubmit: clientSubmitSchema,
    },

    onSubmit: Submit,
  });

  return { form, isPending };
};

export type FormType = ReturnType<typeof useApplicationForm>["form"];

export default useApplicationForm;
