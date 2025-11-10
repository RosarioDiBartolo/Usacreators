// ============================================================================
// FILE: components/onboarding/additional-info.tsx
// ============================================================================
"use client";
import { type Control, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
 import { fadeInUp } from "./utils";
import type { ClientFormData as FormDataType  } from "@shared/creator-apply-client";
import { Input } from "../ui/input";
 
export function AdditionalInfo({
  control,
 }: {
  control: Control<FormDataType>;
 }) {
   

  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <Controller
          name="portfolio"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="portfolio">Portfolio</FieldLabel>
              <Input
                id="portfolio"
                placeholder="A link to your portfolio"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>A website or a pdf document url.</FieldDescription>
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {fieldState.invalid && !field.value && <p className=" border border-muted p-3 rounded-md bg-muted/30 flex flex-wrap gap-1  text-foreground text-xs">
                You don't have a Portfolio? Use this 
                <div><a className=" text-primary" href="https://www.canva.com/design/DAG4IWo1-Zg/OwSss0CsHKWkd3PciOKM2Q/view?utm_content=DAG4IWo1-Zg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" >
                template </a> </div> for fast subscription.
              </p>}
            </Field>
          )}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself..."
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>Max 1000 characters.</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Controller
          name="additionalInfo"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="additionalInfo">Additional Info</FieldLabel>
              <Textarea
                id="additionalInfo"
                placeholder="Anything else you'd like us to know?"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Optional. Max 2000 characters.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </motion.div>
       
    </FieldGroup>
  );
}
