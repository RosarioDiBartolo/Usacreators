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
import { Input } from "@/components/ui/input";
import { fadeInUp } from "./utils";
import type { FormDataType } from "@/lib/form-schemas";
import { toast } from "sonner";

export function AdditionalInfo({
  control,
  handleProfileFile,
}: {
  control: Control<FormDataType>;
  handleProfileFile: (file: File | null) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return handleProfileFile(null);
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB.");
      return;
    }
    handleProfileFile(file);
  };

  return (
    <FieldGroup className="space-y-6">
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
      <motion.div variants={fadeInUp}>
        <Field>
          <FieldLabel htmlFor="profilePictureFile">
            Profile Picture (optional)
          </FieldLabel>
          <Input
            id="profilePictureFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <FieldDescription>JPG, PNG, or WEBP under 3MB.</FieldDescription>
        </Field>
      </motion.div>
    </FieldGroup>
  );
}
