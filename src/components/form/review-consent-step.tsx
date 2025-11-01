// ============================================================================
// FILE: components/onboarding/review-consent-step.tsx
// ============================================================================
"use client";
import { type Control, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInUp } from "./utils";
import { Checkbox } from "@/components/ui/checkbox";
import type { ClientFormData as FormDataType } from "@shared/creator-apply-client";

import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { termsData } from "@/lib/terms-and-conditions";
import { privacyPolicy } from "@/lib/privacy-policies";

// ✅ Assicurati che questi file esistano.
//    - terms-data.tsx è quello con il contenuto che hai incollato
 

// ❕Se NON hai ancora la privacy, commenta le 2 righe seguenti e le parti marcate sotto:
// import { privacyData } from "@/components/legal/privacy-data";

export function ReviewConsentStep({ control }: { control: Control<FormDataType> }) {
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
              {/* Se non hai ancora privacyData, commenta questa riga: */}
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            {/* TERMS */}
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
        <Controller
          name="termsAccepted"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="termsAccepted"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel htmlFor="termsAccepted" className="leading-snug">
                  I have read and agree to the Terms & Conditions and the Privacy Policy.
                </FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </motion.div>
    </FieldGroup>
  );
}
