// ============================================================================
// FILE: components/onboarding/social-info.tsx
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { fadeInUp } from "./utils";
import type { FormDataType } from "@/lib/form-schemas";

export function SocialInfo({ control }: { control: Control<FormDataType> }) {
  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <Controller
          name="locationYesNo"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Do you live in Miami?</FieldLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Controller
          name="instagram"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="instagram">Instagram Profile</FieldLabel>
              <Input
                id="instagram"
                placeholder="@yourhandle or full URL"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Example: @miamicreator or https://instagram.com/miamicreator
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Controller
          name="tiktok"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="tiktok">TikTok Profile</FieldLabel>
              <Input
                id="tiktok"
                placeholder="@yourhandle or full URL"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Example: @miamivibes or https://tiktok.com/@miamivibes
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </motion.div>
    </FieldGroup>
  );
}
