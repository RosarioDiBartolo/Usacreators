// ============================================================================
// FILE: components/onboarding/file-upload.tsx
// Purpose: Decoupled from RHF. Works with TanStack form fields.
// ============================================================================
"use client";

import { Images } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { MAX_PIC_SIZE } from "@/lib/creators/constants";

type Props = {
  name: string;
  value?: File | undefined;
  onChange: (file: File | undefined) => void;
  onBlur: () => void;
  errors?: string[]; // collected errors for this field
};

function FileUpload({ name, value, onChange, onBlur, errors }: Props) {
  const inpRef = useRef<HTMLInputElement>(null);
  const selectedName = value?.name ?? undefined;

  return (
    <Field data-invalid={!!errors?.length}>
      <FieldLabel htmlFor={name}>Profile Picture</FieldLabel>

      <Button type="button" onClick={() => inpRef.current?.click()}>
        <Images size={24} />
        {selectedName || <span className="ml-2">Upload</span>}
      </Button>

      <Input
        ref={inpRef}
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange(file ?? undefined);
        }}
        onBlur={onBlur}
      />

      <FieldDescription id={`${name}-desc`}>
        JPG, PNG, or WEBP under {MAX_PIC_SIZE}MB.
      </FieldDescription>

      {!!errors?.length && <FieldError errors={errors} />}
    </Field>
  );
}

export default FileUpload;
