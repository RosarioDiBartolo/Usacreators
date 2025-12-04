import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

// Import both client + submit schemas
import { clientSubmitSchema } from "@/lib/creators/schemas/creator-apply-client";
import { z } from "zod"; 
import { uploadToCloudinary } from "@/lib/upload";
import {
  ApiError,
  submitCreatorApplication,
} from "@/lib/creators/subscribe-creator";
import {
  type ApplyCreatorParams,
 } from "@/lib/creators/schemas/creators-apply-shared";
import { useMutation } from "@tanstack/react-query";
import { useCurrentLegal } from "@/lib/legal/hooks";
 

// (Optional) Turnstile helper — replace with your actual integration
async function getTurnstileToken(): Promise<string | undefined> {
  return undefined;
}

const useApplicationForm = () => {
  //Use cached if any...
  const { data: currentVersions } = useCurrentLegal();

  const { mutateAsync: Submit, isPending } = useMutation({
    mutationFn: async ({ value }: { value: DefaultValues }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { profilePictureFile, termsAccepted, ...stripped } = value;
      if (!profilePictureFile) {
        throw "Missing profilePictureFile.";
      }
      const fd = new FormData();
      fd.set("file", profilePictureFile);

      const profilePictureUpload = await uploadToCloudinary({ data: fd });

      //Block End
      const creator =  {
        ...stripped,
        locationYesNo: value.locationYesNo ?? defaultValues.locationYesNo,
        profilePictureUrl: profilePictureUpload?.secure_url,
        bio: value.bio,
        instagram: value.instagram,
        portfolio: value.portfolio,
        tiktok: value.tiktok,
        turnstileToken: await getTurnstileToken(),
        legal: {
          termsVersion: currentVersions.terms,
          privacyVersion: currentVersions.privacy,
        },
      } satisfies ApplyCreatorParams ;

      await submitCreatorApplication({ data: creator });
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

  type DefaultValues = z.input<typeof clientSubmitSchema>;
  // Strongly type defaults to the Zod *input* so unions match (File | undefined, "yes" | "no", etc.)
  const defaultValues = {
    name: "",
    email: "",
    profilePictureFile: undefined,
    bio: null,
    niches: [],
    locationYesNo: "yes",
    portfolio: null,
    instagram: null,
    tiktok: null,
    termsAccepted: false,
    instagramPostUrl: "",
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
