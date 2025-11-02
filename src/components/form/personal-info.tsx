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
 
export function PersonalInfo({
  control,
 }: {
  control: Control<FormDataType>;
 }) {
   
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
      <Controller
  control={control}
  name="profilePictureFile"
  // Optional: client-side rules; for strict checks, prefer Zod in the schema
  rules={{
    validate: (file: File | undefined) => {
      if (!file) return true;                     // allow empty unless required
      if (!["image/jpeg","image/png","image/webp"].includes(file.type)) return "Allowed: JPG, PNG, WEBP.";
      if (file.size > 3 * 1024 * 1024) return "Max size is 3 MB.";
      return true;
    },
  }}
  render={({ field, fieldState }) => (
    <FileUpload
      field={field}
      fieldState={fieldState}
    />
  )}
/>

    </FieldGroup>
  );
}
