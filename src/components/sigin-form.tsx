import { useState } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; 
import { step0Schema, step1Schema, fullSchema, stepKeysMap, steps, type YesNo, type FormDataType } from "@/lib/form-schemas";
 
/* ── Helpers (moved above schemas so we can use them in transforms) ── */
async function uploadProfileImage(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.url)
    throw new Error(data?.error || "Image upload failed.");
  return data.url;
}
 

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};
 

const opt = (s?: string) => (s && s.trim() ? s.trim() : undefined);

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    profilePictureFile: null,
    bio: "",
    locationYesNo: "yes",
    instagram: "",
    tiktok: "",
    instagramPost: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateFormData<K extends keyof FormDataType>(
    field: K,
    value: FormDataType[K]
  ) {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field as string])
      setErrors(({ [field as string]: _, ...rest }) => rest);
  }

  async function handleProfileFile(file: File | null) {
    if (!file) return updateFormData("profilePictureFile", null);
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image.");
    if (file.size > 3 * 1024 * 1024) return toast.error("Max size 3MB.");
    updateFormData("profilePictureFile", file);
  }

  // const isStepValid = useMemo(() => {
  //   if (currentStep === 0) return step0Schema.safeParse(formData).success;
  //   if (currentStep === 1) return step1Schema.safeParse(formData).success;
  //   return true;
  // }, [currentStep, formData]);

  const validateAndSetErrorsForStep = () => {
    const schema =
      currentStep === 0
        ? step0Schema
        : currentStep === 1
        ? step1Schema
        : fullSchema;
    const parsed = schema.safeParse(formData);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const { fieldErrors } = parsed.error.flatten();
    const stepKeys = new Set(stepKeysMap[currentStep]);
    const next: Record<string, string> = {};
    for (const [k, msgs] of Object.entries(fieldErrors))
      if (
        stepKeys.has(k as (typeof stepKeysMap)[number][number]) &&
        msgs?.length
      )
        next[k] = msgs[0];
    setErrors(next);
    return false;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (!validateAndSetErrorsForStep()) return;
      setCurrentStep((s) => s + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  async function handleSubmit() {
    const parsed = fullSchema.safeParse(formData);
    if (!parsed.success) {
      const { fieldErrors, formErrors } = parsed.error.flatten();
      const map: Record<string, string> = {};
      for (const [k, msgs] of Object.entries(fieldErrors))
        if (msgs?.length) map[k] = msgs[0];
      setErrors(map);
      const n = Object.keys(map).length;
      toast.error(
        formErrors?.[0] ?? `Please fix ${n} field${n > 1 ? "s" : ""}.`
      );
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document
          .getElementById(firstErrorField)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    try {
      setIsSubmitting(true);
      const payload = {
        name: parsed.data.name, // already trimmed by schema
        email: parsed.data.email,
        profilePictureUrl: formData.profilePictureFile
          ? await uploadProfileImage(formData.profilePictureFile)
          : undefined,
        bio: opt(parsed.data.bio),
        locationYesNo: (parsed.data.locationYesNo || "no") as YesNo,
        instagram: opt(parsed.data.instagram as string | undefined),
        tiktok: opt(parsed.data.tiktok as string | undefined),
        instagramPost: opt(parsed.data.instagramPost as string | undefined),
        additionalInfo: opt(parsed.data.additionalInfo),
      };
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let errText = "Submission failed.";
        try {
          const { error } = await res.json();
          if (error) errText = error;
        } catch {
          /* empty */
        }
        throw new Error(errText);
      }
      toast.success("Application submitted successfully!");
    } catch (e: unknown) {
      let message = "Submission failed.";
      if (e instanceof Error) message = e.message;
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const pct = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      {/* Progress */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="flex justify-between mb-2"
          aria-valuetext={`Step ${currentStep + 1} of ${steps.length}`}
          aria-label="Steps"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.button
                type="button"
                className={cn(
                  // bigger target for a11y
                  "w-6 h-6 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted"
                )}
                aria-current={index === currentStep ? "step" : undefined}
                aria-label={step.title}
                onClick={() => {
                  if (index <= currentStep) setCurrentStep(index);
                }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.span
                className={cn(
                  "text-xs mt-1.5 hidden sm:block",
                  index === currentStep
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <div
          className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep < steps.length - 1) nextStep();
              else handleSubmit();
            }}
            noValidate
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {currentStep === 0 && (
                  <>
                    <CardHeader>
                      <CardTitle>Tell us about yourself</CardTitle>
                      <CardDescription>
                        Let&apos;s start with some basic information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) =>
                            updateFormData("name", e.target.value)
                          }
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "err-name" : undefined
                          }
                        />
                        {errors.name && (
                          <p
                            id="err-name"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.name}
                          </p>
                        )}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "err-email" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id="err-email"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.email}
                          </p>
                        )}
                      </motion.div>
                      {/* <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateFormData("phone", e.target.value)
                          }
                          aria-invalid={!!errors.phone}
                          aria-describedby={
                            errors.phone ? "err-phone" : undefined
                          }
                        />
                        {errors.phone && (
                          <p
                            id="err-phone"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </motion.div> */}
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="profilePicture">Profile Picture</Label>
                        <Input
                          id="profilePicture"
                          name="profilePicture"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleProfileFile(e.target.files?.[0] || null)
                          }
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="bio">Short Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          maxLength={1000}
                          value={formData.bio}
                          onChange={(e) =>
                            updateFormData("bio", e.target.value)
                          }
                          aria-invalid={!!errors.bio}
                          aria-describedby={errors.bio ? "err-bio" : undefined}
                        />
                        {errors.bio && (
                          <p
                            id="err-bio"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.bio}
                          </p>
                        )}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle>Location & Socials</CardTitle>
                      <CardDescription>
                        Tell us where you are and your profiles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Do you live in Miami?</Label>
                        <RadioGroup
                          name="locationYesNo"
                          value={formData.locationYesNo}
                          onValueChange={(v) =>
                            updateFormData("locationYesNo", v as YesNo)
                          }
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
                        {errors.locationYesNo && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.locationYesNo}
                          </p>
                        )}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="instagram">Instagram Profile</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="@yourhandle or URL"
                          value={formData.instagram}
                          onChange={(e) =>
                            updateFormData("instagram", e.target.value)
                          }
                          aria-invalid={!!errors.instagram}
                          aria-describedby={
                            errors.instagram ? "err-instagram" : undefined
                          }
                        />
                        {errors.instagram && (
                          <p
                            id="err-instagram"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.instagram}
                          </p>
                        )}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="tiktok">TikTok Profile</Label>
                        <Input
                          id="tiktok"
                          name="tiktok"
                          placeholder="@yourhandle or URL"
                          value={formData.tiktok}
                          onChange={(e) =>
                            updateFormData("tiktok", e.target.value)
                          }
                          aria-invalid={!!errors.tiktok}
                          aria-describedby={
                            errors.tiktok ? "err-tiktok" : undefined
                          }
                        />
                        {errors.tiktok && (
                          <p
                            id="err-tiktok"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.tiktok}
                          </p>
                        )}
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="instagramPost">
                          Instagram Post Link
                        </Label>
                        <Input
                          id="instagramPost"
                          name="instagramPost"
                          placeholder="https://instagram.com/..."
                          value={formData.instagramPost}
                          onChange={(e) =>
                            updateFormData("instagramPost", e.target.value)
                          }
                          aria-invalid={!!errors.instagramPost}
                          aria-describedby={
                            errors.instagramPost
                              ? "err-instagramPost"
                              : undefined
                          }
                        />
                        {errors.instagramPost && (
                          <p
                            id="err-instagramPost"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.instagramPost}
                          </p>
                        )}
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle>Anything Else?</CardTitle>
                      <CardDescription>Add any extra details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="additionalInfo">
                          Anything else we should know?
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          maxLength={2000}
                          value={formData.additionalInfo}
                          onChange={(e) =>
                            updateFormData("additionalInfo", e.target.value)
                          }
                          aria-invalid={!!errors.additionalInfo}
                          aria-describedby={
                            errors.additionalInfo
                              ? "err-additionalInfo"
                              : undefined
                          }
                        />
                        {errors.additionalInfo && (
                          <p
                            id="err-additionalInfo"
                            className="text-xs text-destructive mt-1"
                          >
                            {errors.additionalInfo}
                          </p>
                        )}
                      </motion.div>
                    </CardContent>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0 || isSubmitting}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={() => {
                    if (currentStep === steps.length - 1) handleSubmit();
                    else nextStep();
                  }}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : currentStep === steps.length - 1 ? (
                    <>
                      Submit <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      <motion.div
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        aria-live="polite"
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
