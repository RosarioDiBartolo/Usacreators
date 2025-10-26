import InfiniteSlider from "./ui/infinite-slider";
import im from "../assets/nubelson-fernandes-ZdOsQiwp0Ss-unsplash.jpg";
const videos = Array(6).fill(im) 
function VideosSlider() {
  return (
    <div className="mx-auto max-w-6xl ">
          <h2 className="text-3xl md:text-6xl font-bold text-center leading-tight tracking-tight mt-32 mb-20">
        Toronto's top creators <br/> creators across every niche
      </h2>
      <div className=" relative">
        <div className=" 
        slider   
        inset-0 z-50 absolute" />
        <InfiniteSlider  gap={30} duration={50}  className="w-full py-5   ">
          {videos.map(
            v => <img className="   rounded-xl" src={im} alt="short" />

          )}
        </InfiniteSlider>
      </div>
    </div>
  );
}

export default VideosSlider;
