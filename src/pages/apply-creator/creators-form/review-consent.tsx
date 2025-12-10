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
} from "@/components/ui/field";

import { FormType } from "../../../lib/creators/use-application-form";
import { getFieldErrors } from "@/lib/field";
import { formSteps } from "@/lib/creators/schemas/creators-apply-shared";
import { Link } from "@tanstack/react-router";

export function ReviewConsentStep({ form }: { form: FormType }) {
  return (
    
      <FieldGroup className="space-y-6">
        {/* Title + short explanation */}
         <p className="text-sm text-muted-foreground">
          Before submitting your application, please review our{" "}
          <Link
            to="/legal/terms"
            className="font-medium underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/legal/privacy"
            className="font-medium underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </Link>
          . We want everything to be clear and transparent about how Miami
          Creators works with you and your data.
        </p>

        {/* Consent checkbox (required) */}
        <form.Field
          name="legal.termsAccepted"
          validators={{ onChange: formSteps.shape.legal.shape.termsAccepted }}
        >
          {(f) => {
            const errs = getFieldErrors(f);

            return (
              <DSField data-invalid={!!errs.length}>
                <div className="flex items-center gap-3">
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
                    I confirm that I have read and agree to the{" "}
                    <Link
                      to="/legal/terms"
                      className="font-medium underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/legal/privacy"
                      className="font-medium underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </FieldLabel>
                </div>
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
          // Assuming you have this in your Zod schema under formSteps.shape.legal.shape.newsletterOptIn
          validators={{
            onChange: formSteps.shape.legal.shape.newsLetter,
          }}
        >
          {(f) => {
            const errs = getFieldErrors(f);

            return (
              <DSField data-invalid={!!errs.length}>
                <div className="flex items-center gap-3">
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
                    I accept to receive occasional updates, tips and Miami
                    campaign opportunities from Miami Creators via email.
                  </FieldLabel>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is mandatory and necessary for the philosoplhy of our serivice.
                </p>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </FieldGroup>
    
  );
}
