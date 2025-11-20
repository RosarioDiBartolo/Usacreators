import InfiniteSlider from "./ui/infinite-slider";
import video1 from "@/assets/creators-videos/regina.mp4";
import video2 from "@/assets/creators-videos/regina2.mp4";
import video3 from "@/assets/creators-videos/sabina.mp4";
import video4 from "@/assets/creators-videos/sabina2.mp4";
import video5 from "@/assets/creators-videos/sabina3.mp4";
import video6 from "@/assets/creators-videos/sabina4.mp4";

const videos = [video1, video2, video3, video4, video5, video6];
function VideosSlider() {
  return (
    <section id="videos" className="relative w-full max-w-7xl mx-auto  mx-auto  ">
      <h2
        className="
          text-center
           
          bg-clip-text text-transparent 
          bg-gradient-to-b from-secondary via-amber-900 to-amber-950
          "
      >
        Miami's top creators <br /> across every niche
      </h2>
      <div className=" relative">
        <div
          className=" 
        slider-overlay   
        inset-0 z-10 absolute"
        />
        <InfiniteSlider gap={30} duration={50} className="w-full py-5   ">
          {videos.map((v) => (
            <video
              key={v}
              autoPlay // autoplay video
              muted // must be muted for iOS
              playsInline // allow inline playback (prevents fullscreen)
              preload="auto"
              loop // optional: repeat video
              className="   rounded-xl"
              src={v}
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}

export default VideosSlider;
