// ============================================================================
// FILE: components/onboarding/social-info.tsx
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { fadeInUp } from "./utils";
import {
  clientFormSchema,
 } from "@/lib/creators/schemas/creator-apply-client";
import type {   } from "@tanstack/react-form";
import { FormType } from "./useCreatorsApplyForm";

function errorsFromMeta(meta: any): string[] {
  const touchedErrs = (meta?.touchedErrors as string[] | undefined) ?? [];
  const submitErr = (meta?.errors?.onSubmit as string | undefined) ?? undefined;
  return touchedErrs.length ? touchedErrs : submitErr ? [submitErr] : [];
}

export function SocialInfo({ form }: { form:FormType 

}) {
  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <form.Field
          name="locationYesNo"
          validators={{ onChange: clientFormSchema.shape.locationYesNo }}
        >
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
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
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="instagram"
          validators={{ onChange: clientFormSchema.shape.instagram }}
        >
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="instagram">Instagram Profile</FieldLabel>
                <Input
                  id="instagram"
                  placeholder="@yourhandle or full URL"
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>
                  Example: @miamicreator or https://instagram.com/miamicreator
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="tiktok"
          validators={{ onChange: clientFormSchema.shape.tiktok }}
        >
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="tiktok">TikTok Profile</FieldLabel>
                <Input
                  id="tiktok"
                  placeholder="@yourhandle or full URL"
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>
                  Example: @miamivibes or https://tiktok.com/@miamivibes
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="instagramPost"
          validators={{ onChange: clientFormSchema.shape.instagramPost }}
        >
          {(f) => {
            const errs = errorsFromMeta(f.state.meta);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="instagramPost">Instagram post URL (optional)</FieldLabel>
                <Input
                  id="instagramPost"
                  placeholder="https://instagram.com/p/..."
                  value={f.state.value ?? ""}
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
    </FieldGroup>
  );
}
