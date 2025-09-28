import React from "react";
import BrandThumbnail from "@/assets/brand-section-thumbnail.jpg";
import { Button } from "./ui/button";
function BrandSection() {
  return (
    <section
      id="brand"
      className="  relative  font-bold bg-primary text-primary-foreground m-10 rounded-full px-40 p-20"
    >
      <div className=" flex justify-around items-center">
        <img className=" w-xs   rounded-3xl" src={BrandThumbnail} />

        <div className="  max-w-3xl">
               <h3 className=" text-primary-foreground/50 text-6xl capitalize">
            We alredy acquired the best creators for your brand's porpouses.
          </h3>
        <h2 className="   text-8xl">
            You just have to chose.
          </h2>
        
           
        </div>
      </div>
      <Button
        size={"lg"}
        className="top-0 border p-7 rounded-full text-lg -translate-1/2 left-1/2 absolute"
        variant={"secondary"}
      >
        Check Our Creators
      </Button>
    </section>
  );
}

export default BrandSection;
