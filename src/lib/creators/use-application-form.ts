import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { z } from "zod";
import {
  ApiError,
  submitCreatorApplication,
} from "@/lib/creators/subscribe-creator";

import { useMutation } from "@tanstack/react-query";
import { formSteps } from "./schemas/creators-apply-shared";
import { uploadProfilePicture } from "../cloudinary/upload";

const useApplicationForm = () => {
  //Use cached if any...

  const { mutateAsync: Submit, isPending } = useMutation({
    mutationFn: async ({ value }: { value: DefaultValues }) => {
      const {profilePictureFile, ...details} = value.details
      if(!profilePictureFile){
        throw "Missing profilePictureFile.";
       }
      const fd = new FormData();
   
        fd.set("file", profilePictureFile );
        
        const profilePictureUrl = (await uploadProfilePicture({ data: fd }))?.secure_url;
        if ( !profilePictureUrl){
                  throw "An Error occurred while uploading profile picture.";
         } 
         const application = {...details,...value.social, ...value.personal,...value.legal, profilePictureUrl }
        await submitCreatorApplication({ data: application });
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

  type DefaultValues = z.input<typeof formSteps>;
  // Strongly type defaults to the Zod *input* so unions match (File | undefined, "yes" | "no", etc.)
  const defaultValues = {
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
  } satisfies DefaultValues;

  const form = useForm({
    // 1) Tell TanStack how to use Zod
    // 2) Defaults that conform to clientFormSchema input
    defaultValues,

    // 3) Submit-time cross-field validation (adapter wrapper)
    validators: {
      onSubmit: formSteps,
    },

    onSubmit: Submit,
  });

  return { form, isPending };
};

export type FormType = ReturnType<typeof useApplicationForm>["form"];

export default useApplicationForm;
