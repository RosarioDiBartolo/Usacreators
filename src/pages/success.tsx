import { CreatorRecord } from "@/lib/creators/creators-collection";
import { Button } from "@/components/ui/button";
import { GrFormNextLink } from "react-icons/gr";
import { AnimatedCheckIcon } from "./success-icon";
import { motion } from "motion/react";

export default function SuccessPage({
  creator,
  confirmationError,
}: {
  creator: CreatorRecord;
  confirmationError?: string;
}) {
  const firstName = (creator?.name || "there").trim().split(" ")[0];
  const hasError = Boolean(confirmationError);

  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full text-center"
        >
          <div className="mx-auto mb-6 flex justify-center">
            <AnimatedCheckIcon size={160} strokeWidth={2} />
          </div>

          <p className="text-xl font-medium">
            Welcome{" "}
            <span className="capitalize font-semibold text-foreground">
              {firstName}
            </span>
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            {hasError ? (
              <span className="bg-gradient-to-b from-red-500 to-orange-400 bg-clip-text text-transparent">
                We couldn&apos;t verify your email.
              </span>
            ) : (
              <>
                Your email has been{" "}
                <span className="bg-gradient-to-b from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                  verified.
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {hasError
              ? "We couldn’t complete your confirmation. Please try again later or request a new link."
              : "You’ve successfully joined our platform. Let’s complete your setup."}
          </p>

          {hasError ? (
            <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-semibold">We couldn’t confirm your subscription.</p>
              <p className="mt-1 text-destructive/80">
                {confirmationError || "Please retry in a moment or contact support for help."}
              </p>
            </div>
          ) : (
            <>
              <div className="mt-10 flex justify-center">
                <Button size="2xl" className="gap-2">
                  Next step <GrFormNextLink className="text-2xl" />
                </Button>
              </div>

              {/* Optional: tiny “what happens next” helper */}
              <p className="mt-4 text-xs text-muted-foreground">
                This usually takes less than 2 minutes.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
