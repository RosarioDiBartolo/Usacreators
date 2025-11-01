// ============================================================================
// FILE: components/onboarding/personal-info.tsx
// (minor a11y tweaks)
// ============================================================================
"use client";
import { Controller, type Control } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup, 
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ClientFormData as FormDataType } from "@shared/creator-apply-client";
 
import FileUpload from "./file-upload";
import { toast } from "sonner";

export function PersonalInfo({ control, handleProfileFile }: { control: Control<FormDataType>;  handleProfileFile: (file: File | null) => void;
 }) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return handleProfileFile(null);
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file.");
          return;
        }
        if (file.size > 3 * 1024 * 1024) {
          toast.error("Image must be under 3MB.");
          return;
        }
        handleProfileFile(file);
      };
    return (
    <FieldGroup>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              {...field}
              aria-invalid={fieldState.invalid}
              autoComplete="name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              {...field}
              aria-invalid={fieldState.invalid}
              autoComplete="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
             <FileUpload  handleFileChange={handleFileChange}/>
    </FieldGroup>
  );
}
