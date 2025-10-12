import type { Step } from "@/lib/form-schemas";

export const steps: Step[] = [
  { id: "personal", title: "Personal Info" },
  { id: "social", title: "Location & Socials" },
  { id: "additional", title: "Anything Else?" },
    { id: "success", title: "Success!" },

] as const;