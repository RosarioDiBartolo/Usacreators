  
import { UserRoundCheck } from "lucide-react"; 
import Carousel from "./carousel"; 

function BrandSection() {
  return (
    <section
      id="brand"
      className=" my-44  relative   font-bold bg-gradient-to-b from-primary/30 via-primary to-primary text-primary-foreground 
      
      mx-auto max-w-[90rem]
      
      rounded-[100px]    text-center  xl:text-start  "
    >
         <div
         className="top-0 bg-secondary text-secondary-foreground border-4  border-background p-6 px-18 rounded-full text-xl font-light -translate-1/2 left-1/2 absolute"
         
      >
        Brand's section
      </div>

      <div className=" py-20 px-10 xl:px-40   overflow-hidden  w-full 
      
      justify-center  items-center  xl:items-start  flex flex-col xl:flex-row flex-wrap gap-28     ">
        <Carousel/>
        <div className=" w-full bg-clip-text text-transparent  bg-primary-foreground/60">
               <h3 className=" text-4xl sm:text-6xl capitalize">
            We alredy acquired the best creators for your brand's porpouses.
          </h3>
        <h2 className="  bg-clip-text text-transparent bg-gradient-to-t from-secondary to-secondary/40   md:text-8xl text-7xl mt-5 ">
            You just have to  <span className=" leading-3 text-8xl md:text-9xl"> choose</span>
          </h2>
        
         </div>
      </div>

      <button  className=" rounded-full flex gap-2 items-center text-2xl font-light bg-gradient-to-t from-secondary to-stone-700 border text-secondary-foreground p-5 px-12 absolute bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2 ">
        Apply now <UserRoundCheck />
      </button>
    
    </section>
  );
}

export default BrandSection;
