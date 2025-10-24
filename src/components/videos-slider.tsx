import InfiniteSlider from "./ui/infinite-slider";
import im from "../assets/nubelson-fernandes-ZdOsQiwp0Ss-unsplash.jpg";

function VideosSlider() {
  return (
    <div>
      <h2 className=" text-5xl my-15 font-black text-center">
        MIAMI's top creators across every niche including:
      </h2>
      <div className="mx-auto max-w-6xl  relative">
        <div className=" 
        slider   
        inset-0 z-50 absolute" />
        <InfiniteSlider gap={50} reverse className="w-full   ">
          <img className="  rounded-[80px]" src={im} alt="short" />
          <img className="  rounded-[80px]" src={im} alt="short" />
          <img className="  rounded-[80px]" src={im} alt="short" />
          <img className=" rounded-[80px]" src={im} alt="short" />
          <img className="  rounded-[80px]" src={im} alt="short" />
          <img className="  rounded-[80px]" src={im} alt="short" />
        </InfiniteSlider>
      </div>
    </div>
  );
}

export default VideosSlider;
