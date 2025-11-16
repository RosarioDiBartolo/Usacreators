import { PolicyDoc } from "@/lib/legal/types";
 
import { SectionBlocks } from "./policy";

function LegalPage({
  lastUpdated,
   sections,
  title,
}: PolicyDoc & {
  title: string;
}) {
  return (
    <section className="text-center text-secondary section-padding">
      {/* Trust Badge */}
      <h2
        className=" 
        my-8 max-w-lg mx-auto
        animate-fade-in-down   
        px-6 py-3 
        bg-secondary
       
        rounded-full text-xl"
      >
        <span className="bg-text bg-gradient capitalize"> {title} </span>
      </h2>

      <p>
        <span className=" ">Last updated:</span>
        <span className="bg-text bg-gradient">{lastUpdated}</span>
      </p>
      <div
        className=" 
        container max-w-3xl mx-auto space-y-5   
      "
      >
        <h1
          className=" text-6xl bg-gradient bg-text
 
        "
        >
          {title}
        </h1>
        {/* <p className=" text-ms leading-normal font-extralight ">
          {paragraph}
        </p> */}

     
          {sections.map((s) => (
            <SectionBlocks startLevel={2}   blocks={s.blocks} key={s.title} />
          ))}
       
      </div>
    </section>
  );
}

export default LegalPage;
