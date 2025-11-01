import { Images } from "lucide-react";
import React, { ChangeEvent, useRef } from "react";
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";

function FileUpload({
  handleFileChange,
}: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  
}) {
  const inpRef = useRef<HTMLInputElement>(null);
  return (
    <Field className=" ">
      <FieldLabel className="  " htmlFor="profilePictureFile">
        Profile Picture (optional)
      </FieldLabel>
      <Button onClick={() => inpRef.current?.click()}>
        <Images size={24} />
        {}
      </Button>
      <Input
        ref={inpRef}
        className=" hidden"
        id="profilePictureFile"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <FieldDescription>JPG, PNG, or WEBP under 3MB.</FieldDescription>
    </Field>
  );
}

export default FileUpload;
