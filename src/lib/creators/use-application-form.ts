import { useForm } from "@tanstack/react-form"; 
import { toast } from "sonner";
import { z } from "zod";
import { 
  requestSubscription,
} from "@/lib/creators/request-subscription";
import { useMutation } from "@tanstack/react-query";
import { formSchema } from "./schemas/creators-apply-shared";
import { uploadProfilePicture } from "../cloudinary/upload";
import * as Sentry from "@sentry/tanstackstart-react";

type DefaultValues = z.input<typeof formSchema>;

const defaultValues: DefaultValues = {
  personal: {
    name: "",
    email: "",
    locationYesNo: "yes",
    phone: ""
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
    newsLetter: false,
    termsAccepted: false,
  },
};

const useApplicationForm = ({onSubmitSucces}:{onSubmitSucces: ()=>void }) => {
 
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
      
      const result = await requestSubscription({ data: application });
      return result;
    }, 
    onSuccess: ()=>{
      onSubmitSucces()
    },
    onError: (error ) => { 
      Sentry.logger.error('Submit mutation failed', error);
       if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: Submit,
  });

  return { form, isPending };
};

export type FormType = ReturnType<typeof useApplicationForm>["form"];

export default useApplicationForm;
