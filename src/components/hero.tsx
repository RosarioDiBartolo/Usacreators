import CreatorsAvatars from "./creators-avatars";
import HeroContent from "./hero-content";
import RandomCircles from "./ui/random-circles";

function Hero() {
  return (
    <section
 
      className="group relative  overflow-hidden  
      bg-gradient-to-b to-primary from-amber-100 rounded-b-[100px]  max-w-screen min-h-[90vh]
      text-primary-foreground px-6 md:px-12 lg:px-20 py-20 flex flex-col justify-center   items-center 
       "
    >
       <RandomCircles count={15} />
      <div className="flex flex-col gap-10 py-10  items-center container mx-auto max-w-5xl  "> 
  
      <HeroContent />
      </div>
    </section>
  );
}

export default Hero;
