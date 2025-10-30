import { Button } from "@/components/ui/button";
import { policies } from "@/lib/privacy-policies";

function PrivacPolicy() {
  return (
    <section className="text-center text-secondary mt-32">
      {/* Trust Badge */}
      <h2
        className=" 
        my-8 max-w-lg mx-auto
        animate-fade-in-down   
        px-6 py-3 
        bg-secondary
       
        rounded-full text-xl"
      >
        <span className="bg-text bg-gradient"> Privacy policy </span>
      </h2>

      <p>
        <span className=" ">Last updated:</span>
        <span className="bg-text bg-gradient"> 1 Jan 2025</span>
      </p>
      <div
        className=" 
        container max-w-2xl mx-auto space-y-5   
      "
      >
        <h1
          className=" text-6xl bg-gradient bg-text
 
        "
        >
          Our privacy policy
        </h1>
        <p className=" text-ms leading-normal font-extralight ">
          We values your privacy and is committed to protecting your personal
          information. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website
           <a  href="/"><Button variant={"link"}>miamicreator.co</Button></a> and when you use any of our related services
          (collectively, the “Platform”). By using our Platform, you consent to
          this Privacy Policy. If you do not agree, please do not access or use
          the Platform.
        </p>

        <div className=" space-y-7 ">
          {policies.map((section) => (
            <div key={section.title} className="  space-y-2">
              <h3 className=" text-3xl font-bold">{section.title}</h3>
              <p className=" text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrivacPolicy;
