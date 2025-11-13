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
import { clientFormObject } from "@/lib/creators/schemas/creator-apply-client";
import type {} from "@tanstack/react-form";
import { FormType } from "../../lib/creators/use-application-form";
import { getFieldErrors } from "@/lib/field";

export function SocialInfo({ form }: { form: FormType }) {
  return (
    <FieldGroup className="space-y-6">
      {/* Miami yes/no */}
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
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
       {/* Portfolio */}
      <motion.div variants={fadeInUp}>
        <form.Field
          name="portfolio"
          validators={{ onChange: clientFormObject.shape.portfolio }}
        >
          {(f) => {
            const errs = getFieldErrors(f);
            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="portfolio">Portfolio</FieldLabel>
                <Input
                  id="portfolio"
                  placeholder="full URL"
                  value={f.state.value }
                  onChange={(e) => f.handleChange(e.target.value)}
                  onBlur={f.handleBlur}
                  aria-invalid={!!errs.length}
                />
                <FieldDescription>
                  You don&apos;t have a portfolio? Use our free{" "}
                  <a
                    className="text-primary underline underline-offset-2"
                    href="https://www.canva.com/design/DAG4IWo1-Zg/OwSss0CsHKWkd3PciOKM2Q/view?utm_content=DAG4IWo1-Zg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                    target="_blank"
                    rel="noreferrer"
                  >
                    template
                  </a>{" "}
                  for a quick setup.
                </FieldDescription>
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      {/* Instagram */}
      <motion.div variants={fadeInUp}>
        <form.Field
          name="instagram"
          validators={{
            onChangeListenTo: ["tiktok"],
            onChange: ({ value, fieldApi }) => {
              const tiktok = fieldApi.form.getFieldValue("tiktok");

              // If both socials are empty → error
              if (!value && !tiktok) {
                return [{message: "Provide at least one social (Instagram or TikTok)."}];
              }

              // If this field has a value, validate it with Zod
              if (value) {
                const parsed =
                  clientFormObject.shape.instagram.safeParse(value);
                if (!parsed.success) {
                  // Return the first issue message (what TanStack expects)
                  return (
                    parsed.error.issues  || [{message: "Invalid Instagram profile."}]
                  );
                }
              }

              return undefined;
            },
          }}
        >
          {(f) => {
            const errs = getFieldErrors(f);

            return (
              <DSField data-invalid={!!errs.length}>
                <FieldLabel htmlFor="instagram">
                  Instagram Profile
                </FieldLabel>
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
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>

      {/* TikTok */}
      <motion.div variants={fadeInUp}>
        <form.Field
          name="tiktok"
          validators={{
            onChangeListenTo: ["instagram"],
            onChange: ({ value, fieldApi }) => {
              const instagram = fieldApi.form.getFieldValue("instagram");

              // If both socials are empty → error
              if (!value && !instagram) {
                return [{message: "Provide at least one social (Instagram or TikTok)."}];
              }

              // If this field has a value, validate it with Zod
              if (value) {
                const parsed = clientFormObject.shape.tiktok.safeParse(value);
                if (!parsed.success) {
                  return ( parsed.error.issues  || [{message: "Invalid TikTok profile."}] );
                }
              }

              return undefined;
            },
          }}
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
                {!!errs.length && <FieldError errors={errs} />}
              </DSField>
            );
          }}
        </form.Field>
      </motion.div>
    </FieldGroup>
  );
}
