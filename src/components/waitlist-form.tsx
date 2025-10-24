import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

const niches = [
  "Food & Dining",
  "Fashion & Style",
  "Events & Entertainment",
  "Fitness & Wellness",
  "Travel & Tourism",
  "Beauty & Cosmetics",
  "Lifestyle",
  "Business & Entrepreneurship",
  "Tech & Innovation",
  "Other",
];

interface WaitlistFormProps {
  onSuccess?: () => void;
}

function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    niche: "",
    instagram: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.niche) {
      toast.error("Please select your primary niche");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual endpoint in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("You've been added to the waitlist! Check your email.");

      setFormData({ email: "", niche: "", instagram: "" });
      onSuccess?.();
    } catch (error) {
      console.error("Waitlist signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto space-y-4 text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-white">
          Email Address *
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="niche" className="text-sm font-semibold text-white">
          Primary Niche *
        </label>
        <Select value={formData.niche} onValueChange={(value) => setFormData({ ...formData, niche: value })}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select your niche" />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-secondary-foreground">
            {niches.map((niche) => (
              <SelectItem key={niche} value={niche}>
                {niche}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="instagram" className="text-sm font-semibold text-white">
          Instagram Handle (Optional)
        </label>
        <Input
          id="instagram"
          type="text"
          placeholder="@yourhandle"
          value={formData.instagram}
          onChange={(e) =>
            setFormData({ ...formData, instagram: e.target.value })
          }
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full rounded-full font-bold text-lg mt-[18px] mb-4"
      >
        {isLoading ? "Securing Your Spot..." : "Secure My Early Access Spot"}
      </Button>

      <p className="text-xs text-white/60 text-center">
        We'll never spam you. Unsubscribe anytime.
      </p>
    </motion.form>
  );
}

export default WaitlistForm;
