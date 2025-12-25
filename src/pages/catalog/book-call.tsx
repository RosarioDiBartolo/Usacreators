import { InlineWidget } from "react-calendly";

function BookCall() {
  return (
    <section className="   mx-auto">



      <div
        className="
        text-center
        flex flex-col items-center
          lg:rounded-3xl border border-amber-950/40
       bg-muted text-muted-foreground
        shadow-[0_22px_80px_rgba(0,0,0,0.12)]
           "
      >
        <h2 className=" h2 py-4 text-white  text-shadow-2xs ">
          Book a Free Strategy Call
        </h2>

        <InlineWidget className="  w-full  h-[830px] overflow-hidden" url={"https://calendly.com/collabs-miamicreator/30min?embed_type=Inline&embed_domain=1&back=1"} />
      </div>
    </section>
  );
}


export default BookCall;
