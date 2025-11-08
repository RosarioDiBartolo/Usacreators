// ============================================================================
// FILE: components/onboarding/personal-info.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

import {
  Field as DSField,
  FieldLabel,
   FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { clientFormObject } from "@/lib/creators/schemas/creator-apply-client";
import FileUpload from "./file-upload";
import { FormType } from "./useCreatorsApplyForm";
import { getFieldErrors } from "@/lib/field";
 
export function PersonalInfo({ form }: { form: FormType }) {
  return (
    <FieldGroup>
      {/* name */}
      <form.Field
        name="name"
        validators={{ onChange: clientFormObject.shape.name }}
      >
        {(f) => {

          const errors = getFieldErrors(f)
            
           return (
            <DSField data-invalid={!!errors.length}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={f.state.value ?? ""}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                aria-invalid={!!errors?.length}
                autoComplete="name"
              />
              
              {!!errors?.length && (
                <FieldError errors={  errors  } />
              )}
            </DSField>
          );
        }}
      </form.Field>

      {/* email */}
      <form.Field
        name="email"
        validators={{ onChange: clientFormObject.shape.email }}
      >
        {(f) => {
          

          const errs = getFieldErrors(f)

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
               {!!errs?.length && (
                <FieldError errors={ errs } />
              )}
            </DSField>
          );
        }}
      </form.Field>

      {/* profilePictureFile */}
      <form.Field
        name="profilePictureFile"
        // validazione su submit (schema controlla tipo e size)
        validators={{ onChange:   clientFormObject.shape.profilePictureFile }}
      >
        {(f) => {
          const errs = getFieldErrors(f);
          return (
            <FileUpload
              name={f.name}
              value={f.state.value}
              onChange={  f.handleChange}
              onBlur={f.handleBlur}
              errors={errs}
            />
          );
        }}
      </form.Field>
    </FieldGroup>
  );
}
