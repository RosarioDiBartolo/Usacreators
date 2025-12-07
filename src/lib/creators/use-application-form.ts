import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { 
  submitCreatorApplication,
} from "@/lib/creators/subscribe-creator";
import { useMutation } from "@tanstack/react-query";
import { formSteps } from "./schemas/creators-apply-shared";
import { uploadProfilePicture } from "../cloudinary/upload";
import * as Sentry from "@sentry/tanstackstart-react";

type DefaultValues = z.input<typeof formSteps>;

const defaultValues: DefaultValues = {
  personal: {
    name: "",
    email: "",
    locationYesNo: "yes",
  },
  social: {
    portfolio: null,
    instagramPostUrl: "",
    instagram: null,
    tiktok: null,
  },
  details: {
    niches: [],
    bio: null,
    profilePictureFile: undefined,
  },
  legal: {
    termsAccepted: false,
  },
};

const useApplicationForm = () => {
  const navigate = useNavigate();

  const { mutateAsync: Submit, isPending } = useMutation({
    mutationFn: async ({ value }: { value: DefaultValues }) => {
      const { profilePictureFile, ...details } = value.details;

      if (!profilePictureFile) {
        throw new Error("Missing profile picture file.");
      }

       const fd = new FormData();
      fd.set("file", profilePictureFile);

      const uploadResult = await uploadProfilePicture({ data: fd });
      const profilePictureUrl = uploadResult?.secure_url;

      if (!profilePictureUrl) {
        throw new Error("An error occurred while uploading profile picture.");
      }

      const application = {
        ...details,
        ...value.social,
        ...value.personal,
        ...value.legal,
        profilePictureUrl,
      };
      
      const result = await submitCreatorApplication({ data: application });
      return result;
    },

    onSuccess: ( ) => {
      toast.success("Application submitted successfully!");
      navigate({ to: "/success" });
    },

    onError: (error: unknown) => { 
      Sentry.captureException(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSteps,
    },
    onSubmit: Submit,
  });

  return { form, isPending };
};

export type FormType = ReturnType<typeof useApplicationForm>["form"];

export default useApplicationForm;
