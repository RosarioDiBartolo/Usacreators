import CreatorsAvatars from "./creators-avatars";
import HeroContent from "./hero-content";
import RandomCircles from "./ui/random-circles";

function Hero() {
  return (
    <section
      className="group relative  overflow-hidden   
      bg-gradient-to-b from-orange-700 rounded-b-[100px] md:from-primary  from-60%  to-orange-300 max-w-screen min-h-[90vh]
      text-primary-foreground px-6 md:px-12 lg:px-20 py-20 flex flex-col   items-center justify-center
       
      "
    >
       <RandomCircles count={15} />
      <div className="flex flex-col gap-5 items-center   "> 

      <CreatorsAvatars />

      <HeroContent />
      </div>
    </section>
  );
}

export default Hero;
