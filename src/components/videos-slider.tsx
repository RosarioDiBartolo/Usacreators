 
import InfiniteSlider from "./ui/infinite-slider";
import im from "../assets/nubelson-fernandes-ZdOsQiwp0Ss-unsplash.jpg";

function VideosSlider() {
  return (
    <div>
        <h2 className=" text-5xl my-5 font-black text-center">
            MIAMI's top creators  across every niche including:
        </h2>
        <div className="mx-auto max-w-6xl  relative">

            <div  className=" z-50     bg-gradient-to-r from-background via-transparent to-background inset-0 absolute"/> 
      <InfiniteSlider className="gap-20  ">
        <img className="w-72 rounded-[80px]" src={im} alt="short" />
        <img className="w-72 rounded-[80px]" src={im} alt="short" />
        <img className="w-72 rounded-[80px]" src={im} alt="short" />
        <img className="w-72 rounded-[80px]" src={im} alt="short" />
        <img className="w-72 rounded-[80px]" src={im} alt="short" />
      </InfiniteSlider>
      </div>
    </div>
  );
}

export default VideosSlider;
