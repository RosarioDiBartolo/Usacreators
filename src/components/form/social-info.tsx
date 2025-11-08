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
  clientFormObject,
 } from "@/lib/creators/schemas/creator-apply-client";
import type {   } from "@tanstack/react-form";
import { FormType } from "./useCreatorsApplyForm";
import { getFieldErrors } from "@/lib/field";

 
export function SocialInfo({ form }: { form:FormType 

}) {
  return (
    <FieldGroup className="space-y-6">
      <motion.div variants={fadeInUp}>
        <form.Field
          name="locationYesNo"
          validators={{ onChange: clientFormObject.shape.locationYesNo }}
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
                {!!errs.length && <FieldError errors={errs.map((m) => ({ message: m }))} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <form.Field
          name="instagram"
          validators={{ onChange: clientFormObject.shape.instagram }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
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
          validators={{ onChange: clientFormObject.shape.tiktok }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
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
          validators={{ onChange:  clientFormObject.shape.instagramPost }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
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
