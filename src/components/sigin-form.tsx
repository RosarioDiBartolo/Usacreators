"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "social", title: "Social Profiles" },
  { id: "additional", title: "Additional Info" },
];
interface FormData {
  name: string;
  email: string;
  phone: string;
  profilePicture: File | null;
  bio: string;
  locationYesNo: string;
  instagram: string;
  tiktok: string;
  instagramPost: string;
  additionalInfo: string;
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

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  phone: "",
  profilePicture: null,
  bio: "",
  locationYesNo: "",
  instagram: "",
  tiktok: "",
  instagramPost: "",
  additionalInfo: "",
});

  function updateFormData<K extends keyof FormData>(field: K, value: FormData[K])  {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
 
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Form submitted successfully!");
      setIsSubmitting(false);
    }, 1500);
  };

  // Check if step is valid for next button
  const isStepValid = () => {
  switch (currentStep) {
    case 0:
      return formData.name.trim() && formData.email.trim() && formData.phone.trim();
    case 1:
      return formData.locationYesNo !== ""  
    default:
      return true;
  }
};
 

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className={cn(
                  "w-4 h-4 rounded-full cursor-pointer transition-colors duration-300",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted"
                )}
                onClick={() => {
                  // Only allow going back or to completed steps
                  if (index <= currentStep) {
                    setCurrentStep(index);
                  }
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
        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Info */}
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
                          value={formData.name}
                          onChange={(e) =>
                            updateFormData("name", e.target.value)
                          }
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateFormData("phone", e.target.value)
                          }
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="profilePicture">Profile Picture</Label>
                        <Input
                          id="profilePicture"
                          type="file"
                          onChange={(e) =>
                            updateFormData(
                              "profilePicture",
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="bio">Short Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) =>
                            updateFormData("bio", e.target.value)
                          }
                        />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Professional Background */}
                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle>Professional Background</CardTitle>
                      <CardDescription>
                        Tell us about your professional experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Do you live in Miami?</Label>
<RadioGroup value={formData.locationYesNo} onValueChange={(value) => updateFormData("locationYesNo", value)}>
  <RadioGroupItem value="yes" id="miami-yes" /><Label htmlFor="miami-yes">Yes</Label>
  <RadioGroupItem value="no" id="miami-no" /><Label htmlFor="miami-no">No</Label>
</RadioGroup>
                      </motion.div>

                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="instagram">Instagram Profile</Label>
<Input id="instagram" placeholder="@yourhandle" value={formData.instagram} onChange={(e) => updateFormData("instagram", e.target.value)} />

                      </motion.div>
                       <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="tiktok">TikTok Profile</Label>
<Input id="tiktok" placeholder="@yourhandle" value={formData.tiktok} onChange={(e) => updateFormData("tiktok", e.target.value)} />

                      </motion.div>
                       <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="instagramPost">Instagram Post Link</Label>
<Input id="instagramPost" placeholder="https://instagram.com/..." value={formData.instagramPost} onChange={(e) => updateFormData("instagramPost", e.target.value)} />
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 3: Website Goals */}
                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle>Website Goals</CardTitle>
                      <CardDescription>
                        What are you trying to achieve with your website?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                     
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="additionalInfo">Anything else we should know?</Label>
<Textarea id="additionalInfo" value={formData.additionalInfo} onChange={(e) => updateFormData("additionalInfo", e.target.value)} />
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
                  disabled={currentStep === 0}
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
                  onClick={
                    currentStep === steps.length - 1 ? handleSubmit : nextStep
                  }
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1 transition-all duration-300 rounded-2xl",
                    currentStep === steps.length - 1 ? "" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
