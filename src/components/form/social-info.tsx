import { motion } from "framer-motion";
import {
 
   CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { fadeInUp } from "./utils";
import type { FormDataType, YesNo } from "@/lib/form-schemas";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Step0PersonalInfo({
  formData,
  errors,
  updateFormData,
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
     
        <CardHeader>
          {" "}
          <CardTitle>Location & Socials</CardTitle>{" "}
          <CardDescription>
            {" "}
            Tell us where you are and your profiles{" "}
          </CardDescription>{" "}
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          {" "}
          <motion.div variants={fadeInUp} className="space-y-2">
            {" "}
            <Label>Do you live in Miami?</Label>{" "}
            <RadioGroup
              name="locationYesNo"
              value={formData.locationYesNo}
              onValueChange={(v) => updateFormData("locationYesNo", v as YesNo)}
              className="flex items-center gap-6"
            >
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <RadioGroupItem value="yes" id="miami-yes" />{" "}
                <Label htmlFor="miami-yes">Yes</Label>{" "}
              </div>{" "}
              <div className="flex items-center gap-2">
                {" "}
                <RadioGroupItem value="no" id="miami-no" />{" "}
                <Label htmlFor="miami-no">No</Label>{" "}
              </div>{" "}
            </RadioGroup>{" "}
            {errors.locationYesNo && (
              <p className="text-xs text-destructive mt-1">
                {" "}
                {errors.locationYesNo}{" "}
              </p>
            )}{" "}
          </motion.div>{" "}
          <motion.div variants={fadeInUp} className="space-y-2">
            {" "}
            <Label htmlFor="instagram">Instagram Profile</Label>{" "}
            <Input
              id="instagram"
              name="instagram"
              placeholder="@yourhandle or URL"
              value={formData.instagram}
              onChange={(e) => updateFormData("instagram", e.target.value)}
              aria-invalid={!!errors.instagram}
              aria-describedby={errors.instagram ? "err-instagram" : undefined}
            />{" "}
            {errors.instagram && (
              <p id="err-instagram" className="text-xs text-destructive mt-1">
                {" "}
                {errors.instagram}{" "}
              </p>
            )}{" "}
          </motion.div>{" "}
          <motion.div variants={fadeInUp} className="space-y-2">
            {" "}
            <Label htmlFor="tiktok">TikTok Profile</Label>{" "}
            <Input
              id="tiktok"
              name="tiktok"
              placeholder="@yourhandle or URL"
              value={formData.tiktok}
              onChange={(e) => updateFormData("tiktok", e.target.value)}
              aria-invalid={!!errors.tiktok}
              aria-describedby={errors.tiktok ? "err-tiktok" : undefined}
            />{" "}
            {errors.tiktok && (
              <p id="err-tiktok" className="text-xs text-destructive mt-1">
                {" "}
                {errors.tiktok}{" "}
              </p>
            )}{" "}
          </motion.div>{" "}
          <motion.div variants={fadeInUp} className="space-y-2">
            {" "}
            <Label htmlFor="instagramPost"> Instagram Post Link </Label>{" "}
            <Input
              id="instagramPost"
              name="instagramPost"
              placeholder="https://instagram.com/..."
              value={formData.instagramPost}
              onChange={(e) => updateFormData("instagramPost", e.target.value)}
              aria-invalid={!!errors.instagramPost}
              aria-describedby={
                errors.instagramPost ? "err-instagramPost" : undefined
              }
            />{" "}
            {errors.instagramPost && (
              <p
                id="err-instagramPost"
                className="text-xs text-destructive mt-1"
              >
                {" "}
                {errors.instagramPost}{" "}
              </p>
            )}{" "}
          </motion.div>{" "}
        </CardContent>{" "}
     
    </>
  );
}
