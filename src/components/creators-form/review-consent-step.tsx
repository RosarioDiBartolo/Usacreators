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
import { clientFormObject } from "@/lib/creators/schemas/creator-apply-client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormType } from "../../lib/creators/use-application-form";
import { getFieldErrors } from "@/lib/field";
import { SectionBlocks } from "../legal/policy";
import termsData from "@/assets/legal/terms/2025-01-01.json"
 import privacyData from "@/assets/legal/terms/2025-01-01.json"
import { Block } from "@/lib/legal/types";


// const PolicyContent = (policy: Policy, version: PolicyVersion) =>
//   queryOptions({
//     queryKey: ["legal", policy],
//     queryFn: () => getLegalFromPublic({ data: { policy: "terms", version } }),
//   });
export function ReviewConsentStep({
  form,
}: {
  form: FormType;
 
}) {
  //const { data: currentVersions } = useCurrentLegal()

  // const { data: termsData } = useSuspenseQuery(
  //   PolicyContent("terms", currentVersions.terms)
  // );
  // const { data: privacyData } = useSuspenseQuery(
  //   PolicyContent("privacy", currentVersions.privacy)
  // );

  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <div className="rounded-xl border bg-card text-card-foreground p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-3">Review Terms & Privacy</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Please review the key sections below. Expand items to read the full
            text.
          </p>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className=" bg-background  grid grid-cols-2 w-full mb-2">
              <TabsTrigger className=" data-[state=active]:bg-card data-[state=active]:text-card-foreground" value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger className=" data-[state=active]:bg-card data-[state=active]:text-card-foreground" value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              <Accordion type="multiple" className="w-full">
                {privacyData.sections.map((section) => (
                  <AccordionItem
                    key={`terms-${section.title}`}
                    value={`terms-${section.title}`}
                  >
                    <AccordionTrigger className="text-left">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                      <SectionBlocks
                        blocks={section.blocks as Block[]}
                      
                        startLevel={2}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="privacy">
              <Accordion type="multiple" className="w-full">
                {termsData.sections.map((section) => (
                  <AccordionItem
                    key={`terms-${section.title}`}
                    value={`terms-${section.title}`}
                  >
                    <AccordionTrigger className="text-left">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                      <SectionBlocks
                        blocks={section.blocks as Block[]}
                     
                        startLevel={2}
                      />
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
          validators={{ onChange: clientFormObject.shape.termsAccepted }}
        >
          {(f) => {
            const errs = getFieldErrors(f)
            
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
                    I have read and agree to the Terms & Conditions and the
                    Privacy Policy.
                  </FieldLabel>
                </div>
                {!!errs.length && (
                  <FieldError errors={errs } />
                )}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
    </FieldGroup>
  );
}
