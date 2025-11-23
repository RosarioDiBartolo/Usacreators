import {InlineWidget} from "react-calendly";

function BookCall() {
  return (
    <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
      <h2 className="bg-text bg-linear-to-b from-secondary via-amber-900 to-amber-950">
        Book a Free Strategy Call
      </h2>

      
      <div
        className="mt-10    rounded-3xl border border-amber-950/40
       bg-muted text-muted-foreground  shadow-[0_22px_80px_rgba(0,0,0,0.12)]  "
      > 
      <InlineWidget className="" url={"https://calendly.com/collabs-miamicreator"} /> 
      </div>
    </section>
  );
}
 

export default BookCall;
