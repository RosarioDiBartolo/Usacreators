import { Button } from "@/components/ui/button";
import React from "react";

function DemoVideo() {
  return (
    <section className="  p-5 max-w-7xl    mx-auto">
      <h2 className="
    bg-text
    bg-linear-to-b from-secondary via-amber-900 to-amber-950">Miami Creators Demo</h2>
      <p
      className="text-base leading-relaxed max-w-3xl mx-auto "
      >Check out this demo video showcasing our Miami creators!</p>
      <div className="max-w-xl my-5 mx-auto bg-primary p-5 rounded-4xl  ">
        <div className=" aspect-square  rounded-xl  w-full bg-muted">

        </div>
      </div>
      <Button className=" mx-auto">
        Book a strategy call
      </Button>
    </section>
  );
}

export default DemoVideo;
