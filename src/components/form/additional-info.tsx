// ============================================================================
// FILE: components/onboarding/additional-info.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

import { motion } from "framer-motion";
import {
  Field as DSField,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { fadeInUp } from "./utils";
import {
  clientFormObject,
 } from "@/lib/creators/schemas/creator-apply-client";
import { FormType } from "./useCreatorsApplyForm";
 
function errorsFromMeta(meta: any): string[] {
  const touchedErrs = (meta?.touchedErrors as string[] | undefined) ?? [];
  const submitErr = (meta?.errors?.onSubmit as string | undefined) ?? undefined;
  return touchedErrs.length ? touchedErrs : submitErr ? [submitErr] : [];
}

export function AdditionalInfo({ form }: { form: FormType
}) {
  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <form.Field name="bio" validators={{ onChange: clientFormObject.shape.bio }}>
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself..."
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>Max 1000 characters.</FieldDescription>
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="additionalInfo"
          validators={{ onChange: clientFormObject.shape.additionalInfo }}
        >
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="additionalInfo">Additional Info</FieldLabel>
                <Textarea
                  id="additionalInfo"
                  placeholder="Anything else you'd like us to know?"
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>Optional. Max 2000 characters.</FieldDescription>
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
    </FieldGroup>
  );
}
