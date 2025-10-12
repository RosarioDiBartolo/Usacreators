import { motion } from "motion/react";

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
  updateFormData,
  setErrors
}: {
  formData: FormDataType;
  errors: Record<string, string>;
  updateFormData: <K extends keyof FormDataType>(
    field: K,
    value: FormDataType[K]
  ) => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
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
            onChange={(e) => {
              updateFormData("additionalInfo", e.target.value);
              // Optional: clear error on change
              if (errors.additionalInfo)
                setErrors(errors=> ({ ...errors, additionalInfo: "" }));
            }}
            aria-invalid={!!errors.additionalInfo}
            aria-describedby={
              errors.additionalInfo ? "err-additionalInfo" : undefined
            }
          />
          {errors.additionalInfo && (
            <motion.p
              id="err-additionalInfo"
              className="text-xs text-destructive mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.additionalInfo}
            </motion.p>
          )}{" "}
        </motion.div>{" "}
      </CardContent>{" "}
    </>
  );
}

export default AdditionalInfo;
