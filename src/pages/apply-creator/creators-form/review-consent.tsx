// ============================================================================
// FILE: components/onboarding/review-consent-step.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field as DSField,
  FieldLabel,
  FieldGroup,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";

import { FormType } from "../../../lib/creators/use-application-form";
import { getFieldErrors } from "@/lib/field";
import { formSchema } from "@/lib/creators/schemas/creators-apply-shared";
 
export function ReviewConsentStep({ form }: { form: FormType }) {
  return (
    <FieldGroup className="space-y-6">
      {/* Consent checkbox (required) */}
      <form.Field
        name="legal.termsAccepted"
        validators={{ onChange: formSchema.shape.legal.shape.termsAccepted }}
      >
        {(f) => {
          const errs = getFieldErrors(f);

          return (
            <DSField data-invalid={!!errs.length}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="termsAccepted"
                  checked={!!f.state.value}
                  onCheckedChange={(v) => f.handleChange(!!v)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />

                <FieldLabel
                  htmlFor="termsAccepted"
                  className="leading-snug text-sm"
                >
                  Polices
                </FieldLabel>
                              </div>

                <FieldDescription>
                  I confirm that I have read and agree to the Terms &amp;
                  Conditions and Privacy Policy .
                </FieldDescription>

                <p className="text-xs text-muted-foreground">
                  You’ll need to accept this to submit your application.
                </p>
                {!!errs.length && <FieldError errors={errs} />}
             </DSField>
          );
        }}
      </form.Field>

      {/* Newsletter checkbox (optional) */}
      <form.Field
        name="legal.newsLetter"
        // Assuming you have this in your Zod schema under formSchema.shape.legal.shape.newsletterOptIn
        validators={{
          onChange: formSchema.shape.legal.shape.newsLetter,
        }}
      >
        {(f) => {
          const errs = getFieldErrors(f);

          return (
            <DSField data-invalid={!!errs.length}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="newsletterOptIn"
                  checked={!!f.state.value}
                  onCheckedChange={(v) => f.handleChange(!!v)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />

                <FieldLabel
                  htmlFor="newsletterOptIn"
                  className="leading-snug text-sm"
                >
                  Newsletter subscription
                </FieldLabel>  </div>
                <FieldDescription>
                  I accept to receive occasional updates, tips and Miami
                  campaign opportunities from Miami Creators via email.
                </FieldDescription>

                <p className="text-xs text-muted-foreground">
                  This is mandatory and necessary for the philosoplhy of our
                  serivice.
                </p>
                {!!errs.length && <FieldError errors={errs} />}
             
            </DSField>
          );
        }}
      </form.Field>
    </FieldGroup>
  );
}
