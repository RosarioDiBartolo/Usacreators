import InfiniteSlider from "./ui/infinite-slider";
import video1 from "../assets/creators/regina.mp4";
import video2 from "../assets/creators/regina2.mp4";
import video3 from "../assets/creators/sabina.mp4";
import video4 from "../assets/creators/sabina2.mp4";
import video5 from "../assets/creators/sabina3.mp4";
import video6 from "../assets/creators/sabina4.mp4";

const videos = [ video1, video2,video3, video4, video5, video6]
function VideosSlider() {
  return (
    <section id = "videos" className="mx-auto max-w-6xl ">
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
            v => <video loop muted autoPlay className="   rounded-xl" src={v}  />

          )}
        </InfiniteSlider>
      </div>
    </section>
  );
}

export default VideosSlider;
