// ============================================================================
// FILE: components/onboarding/personal-info.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

import { Field as DSField, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  clientFormSchema,
 } from "@/lib/creators/schemas/creator-apply-client"; 
import FileUpload from "./file-upload";
import { FormType } from "./useCreatorsApplyForm";

function errorsFromMeta(meta: any): string[] {
  const touchedErrs = (meta?.touchedErrors as string[] | undefined) ?? [];
  const submitErr = (meta?.errors?.onSubmit as string | undefined) ?? undefined;
  return touchedErrs.length ? touchedErrs : submitErr ? [submitErr] : [];
}

export function PersonalInfo({ form }: { form:FormType 

}) {
  return (
    <FieldGroup>
      {/* name */}
      <form.Field name="name" validators={{ onChange: clientFormSchema.shape.name }}>
        {(f) => {
          const errs = errorsFromMeta(f.state.meta);
          return (
            <DSField data-invalid={!!errs.length}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={f.state.value ?? ""}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                aria-invalid={!!errs.length}
                autoComplete="name"
              />
              {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
            </DSField>
          );
        }}
      </form.Field>

      {/* email */}
      <form.Field name="email" validators={{ onChange: clientFormSchema.shape.email }}>
        {(f) => {
          const errs = errorsFromMeta(f.state.meta);
          return (
            <DSField data-invalid={!!errs.length}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={f.state.value ?? ""}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                aria-invalid={!!errs.length}
                autoComplete="email"
              />
              {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
            </DSField>
          );
        }}
      </form.Field>

      {/* profilePictureFile */}
      <form.Field
        name="profilePictureFile"
        // validazione su submit (schema controlla tipo e size)
        validators={{ onSubmit: clientFormSchema.shape.profilePictureFile }}
      >
        {(f) => {
          const errs = errorsFromMeta(f.state.meta);
          return (
            <FileUpload
              name={f.name}
              value={f.state.value}
              onChange={(v) => f.handleChange(v)}
              onBlur={f.handleBlur}
              errors={errs}
            />
          );
        }}
      </form.Field>
    </FieldGroup>
  );
}
