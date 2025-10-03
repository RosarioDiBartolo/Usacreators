import Carousel from "./carousel";

function BrandSection() {
  return (
    <section
      id="brand"
      className=" mt-44  relative   font-bold bg-gradient-to-b from-primary/30 via-primary to-primary/70 text-primary-foreground 
      
      mx-auto max-w-[90rem]
      
      rounded-t-[100px] text-center     "
    >
      <div className="top-0 bg-secondary text-secondary-foreground border-4  border-background p-6 px-18 rounded-full text-xl font-light -translate-1/2 left-1/2 absolute">
        Brand's section
      </div>

      <div
        className=" py-20 px-10 xl:px-40      w-full 
      
      justify-center overflow-hidden  items-center  xl:items-start  flex flex-col xl:flex-row flex-wrap gap-28     "
      >
        <Carousel />
        <div className=" mx-auto max-w-3xl w-full tracking-wider   bg-clip-text text-transparent  bg-primary-foreground/60">
          <h3 className=" md:leading-12 text-2xl font-extralight md:text-4xl  ">
            We alredy acquired the best creators for your brand's porpouses.
          </h3>
          <h2 className="  bg-clip-text text-transparent bg-gradient-to-t from-secondary to-secondary/30 pb-2     md:text-6xl text-7xl mt-5 ">
            You just have to
          </h2>
            <button
        className="
        my-3
      rounded-full mx-auto flex gap-4 items-center  font-bold bg-gradient-to-b from-stone-500 to-stone-900   border   p-5 px-12 
     bottom-0  "
      >
        <span className="whitespace-nowrap z-50 capitalize bg-clip-text text-transparent bg-gradient-to-b from-secondary-foreground to-amber-500 text-5xl">
          choose us
        </span>
      </button>
        </div>
        
      </div>

    
    </section>
  );
}

export default BrandSection;
