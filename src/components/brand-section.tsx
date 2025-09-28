  
import CardsStack from "./cards-stack";
import { Button } from "./ui/button";

function BrandSection() {
  return (
    <section
      id="brand"
      className=" my-44  relative  font-bold bg-gradient-to-bl from-primary via-primary to-amber-400 text-primary-foreground m-10 rounded-full    text-center  xl:text-start py-40 px-10 xl:px-40 xl:py-10"
    >
      <div className="  w-full   justify-around items-center flex flex-col gap-10  xl:flex-row  ">
        <CardsStack />
        <div className="  w-full">
               <h3 className=" text-primary-foreground/50 text-6xl capitalize">
            We alredy acquired the best creators for your brand's porpouses.
          </h3>
        <h2 className="   text-8xl">
            You just have to choose.
          </h2>
        
         </div>
      </div>

      <Button variant={"secondary"}  className=" rounded-2xl absolute bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2 ">
        Click to discover more.
      </Button>
      <div
         className="top-0 bg-secondary text-secondary-foreground    border outline-2 outline-primary outline-offset-8 border-primary p-4 px-10 rounded-full text-lg -translate-1/2 left-1/2 absolute"
         
      >
        Brand's section
      </div>
    </section>
  );
}

export default BrandSection;
