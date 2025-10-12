import { motion } from "framer-motion";
import {  CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { fadeInUp } from "./utils";
import type { FormDataType } from "@/lib/form-schemas";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function Step0PersonalInfo({
  formData,
  errors,
  updateFormData,
  handleProfileFile,
}: {
  formData: FormDataType;
  errors: Record<string, string>;
  updateFormData: <K extends keyof FormDataType>(field: K, value: FormDataType[K]) => void;
  handleProfileFile: (file: File | null) => void;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
        <CardDescription>Let&apos;s start with some basic information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp}>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input type="file" accept="image/*" onChange={(e) => handleProfileFile(e.target.files?.[0] || null)} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Label htmlFor="bio">Short Bio</Label>
          <Textarea id="bio" value={formData.bio} onChange={(e) => updateFormData("bio", e.target.value)} />
          {errors.bio && <p className="text-xs text-destructive">{errors.bio}</p>}
        </motion.div>
      </CardContent>
    </>
  );
}
