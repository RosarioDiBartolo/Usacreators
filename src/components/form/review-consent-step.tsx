// ============================================================================
// FILE: components/onboarding/review-consent-step.tsx
// TanStack Form version (no RHF).
// ============================================================================
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field as DSField,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import {
  clientFormSchema,
 } from "@/lib/creators/schemas/creator-apply-client"; 

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { termsData } from "@/lib/terms-and-conditions";
import { privacyPolicy } from "@/lib/privacy-policies";
import { FormType } from "./useCreatorsApplyForm";

function errorsFromMeta(meta: any): string[] {
  const touchedErrs = (meta?.touchedErrors as string[] | undefined) ?? [];
  const submitErr = (meta?.errors?.onSubmit as string | undefined) ?? undefined;
  return touchedErrs.length ? touchedErrs : submitErr ? [submitErr] : [];
}

export function ReviewConsentStep({
  form,
  termsVersion,
  privacyVersion,
}: {
  form: FormType ;
  termsVersion?: string;
  privacyVersion?: string;
}) {
  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <div className="rounded-xl border bg-card text-card-foreground p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-3">Review Terms & Privacy</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Please review the key sections below. Expand items to read the full text.
          </p>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-2">
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              <Accordion type="multiple" className="w-full">
                {termsData.map((item, idx) => (
                  <AccordionItem key={`terms-${idx}`} value={`terms-${idx}`}>
                    <AccordionTrigger className="text-left">{item.title}</AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="privacy">
              <Accordion type="multiple" className="w-full">
                {privacyPolicy.map((item, idx) => (
                  <AccordionItem key={`privacy-${idx}`} value={`privacy-${idx}`}>
                    <AccordionTrigger className="text-left">{item.title}</AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="termsAccepted"
          validators={{ onChange: clientFormSchema.shape.termsAccepted }}
        >
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
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
                  <FieldLabel htmlFor="termsAccepted" className="leading-snug">
                    I have read and agree to the Terms & Conditions and the Privacy Policy.
                  </FieldLabel>
                </div>
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
    </FieldGroup>
  );
}
