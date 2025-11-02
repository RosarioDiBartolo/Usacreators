// FileUpload.tsx
import { Images } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import type { ControllerRenderProps, ControllerFieldState } from "react-hook-form";
import type {ClientFormData} from "@shared/creator-apply-client"
import { MAX_PIC_SIZE } from "@shared/constants";
type Props = {
  field: ControllerRenderProps<ClientFormData , "profilePictureFile">;
  fieldState: ControllerFieldState;
};

function FileUpload({ field, fieldState }: Props) {
  const inpRef = useRef<HTMLInputElement>(null);
  const selectedName =    field.value?.name ?? undefined  
  return (
    <Field>
      <FieldLabel htmlFor="profilePictureFile">Profile Picture</FieldLabel>

         <Button className="" type="button" onClick={() => inpRef.current?.click()}>
          <Images size={24} />
          {selectedName || <span className="ml-2">Upload</span>}
        </Button>

         
      <Input
        ref={(el) => {
          inpRef.current = el!;
          field.ref(el);
        }}
        id="profilePictureFile"
        name={field.name}
        type="file"
        accept="image/*"
        className="hidden"
        // IMPORTANT: forward to RHF
        onChange={(e) => {
          const file = e.target.files?.[0];
          field.onChange(file ?? undefined); // keep as a single File (not FileList)
        }}
        onBlur={field.onBlur}
      />

      <FieldDescription id="profilePictureFile-desc">
        JPG, PNG, or WEBP under {MAX_PIC_SIZE}MB.
      </FieldDescription>

      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  );
}

export default FileUpload;
