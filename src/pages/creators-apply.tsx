import SiginForm from "@/components/creators-form";
import { Suspense } from "react";

function SignupPage() {
  return (
    <main className="h-svh section-padding py-5 flex flex-col text-center container max-w-2xl mx-auto   ">
      <Suspense fallback={<p>Loading the most recent legal versions...</p>}>
        <SiginForm />
      </Suspense>
    </main>
  );
}

export default SignupPage;
