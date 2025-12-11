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
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";  
import { FormType } from "../../../lib/creators/use-application-form";
import { getFieldErrors } from "@/lib/field";
import { formSchema } from "@/lib/creators/schemas/creators-apply-shared";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
  
export function PersonalInfo({ form }: { form: FormType }) {
  const step= formSchema.shape.personal.shape
  return (
    <FieldGroup>
      {/* name */}
      <form.Field
        name="personal.name"
        validators={{ onChange:  step.name }}
      >
        {(f) => {

          const errors = getFieldErrors(f)
            
           return (
            <DSField data-invalid={!!errors.length}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
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
        name="personal.email"
        validators={{ onChange: step.email }}
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
 
        <form.Field
          name="personal.locationYesNo"
          validators={{ onChange: step.locationYesNo }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel>Do you live in Miami?</FieldLabel>
                <RadioGroup
                  onValueChange={(v) => f.handleChange(v as "yes" | "no")}
                  value={f.state.value ?? "yes"}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="miami-yes" />
                    <Label htmlFor="miami-yes">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="miami-no" />
                    <Label htmlFor="miami-no">No</Label>
                  </div>
                </RadioGroup>
                <FieldDescription>
                  We ask this to connect with nearby creators for events.
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
    </FieldGroup>
  );
}
