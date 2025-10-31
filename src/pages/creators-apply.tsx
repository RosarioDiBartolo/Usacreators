import SiginForm from "@/components/form/sigin-form";

function SignupPage() {
  return (
    <section className="h-svh section-padding flex flex-col text-center container max-w-2xl mx-auto   ">
      <h1 className="
       bg-text
       bg-gradient
      ">Apply to our Catalog</h1>

      <SiginForm />
    </section>
  );
}

export default SignupPage;
