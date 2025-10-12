 
 import { motion,   } from "motion/react";

 import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
 } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { fadeInUp } from "./utils";
import { Label } from "../ui/label";
import type { FormDataType } from "@/lib/form-schemas";

function AdditionalInfo({
  formData,
  errors,
  updateFormData 
}: {
  formData: FormDataType;
  errors: Record<string, string>;
  updateFormData: <K extends keyof FormDataType>(
    field: K,
    value: FormDataType[K]
  ) => void;
 }) {
  return (
    <>
      {" "}
      <CardHeader>
        {" "}
        <CardTitle>Anything Else?</CardTitle>{" "}
        <CardDescription>Add any extra details</CardDescription>{" "}
      </CardHeader>{" "}
      <CardContent className="space-y-4">
        {" "}
        <motion.div variants={fadeInUp} className="space-y-2">
          {" "}
          <Label htmlFor="additionalInfo">
            {" "}
            Anything else we should know?{" "}
          </Label>{" "}
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            maxLength={2000}
            value={formData.additionalInfo}
            onChange={(e) => updateFormData("additionalInfo", e.target.value)}
            aria-invalid={!!errors.additionalInfo}
            aria-describedby={
              errors.additionalInfo ? "err-additionalInfo" : undefined
            }
          />{" "}
          {errors.additionalInfo && (
            <p
              id="err-additionalInfo"
              className="text-xs text-destructive mt-1"
            >
              {" "}
              {errors.additionalInfo}{" "}
            </p>
          )}{" "}
        </motion.div>{" "}
      </CardContent>{" "}
    </>
  );
}

export default AdditionalInfo;
