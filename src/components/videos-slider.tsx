import InfiniteSlider from "./ui/infinite-slider";
import regina from "../assets/creators/regina_gs.mp4";
import regina2 from "../assets/creators/regina2.mp4";

const videos = Array(3).fill(regina).concat( Array(3).fill(regina2))
function VideosSlider() {
  return (
    <div className="mx-auto max-w-6xl ">
          <h2 className="
          bg-clip-text text-transparent
          bg-gradient-to-b from-secondary via-amber-900 to-amber-950
          text-5xl md:text-6xl font-bold text-center leading-tight tracking-tight mt-32 mb-20">
        Miami's top creators <br/> creators across every niche
      </h2>
      <div className=" relative">
        <div className=" 
        slider   
        inset-0 z-10 absolute" />
        <InfiniteSlider  gap={30} duration={50}  className="w-full py-5   ">
          {videos.map(
            v => <video loop muted autoPlay className="   rounded-xl" src={v} alt="short" />

          )}
        </InfiniteSlider>
      </div>
    </div>
  );
}

export default VideosSlider;
