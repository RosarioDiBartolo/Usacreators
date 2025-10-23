import SiginForm from "@/components/form/sigin-form";
import Squares from "@/components/squares-background";

function SignupPage() {
  return (
    <div className="relative w-screen min-h-screen bg-secondary  ">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#ff6900"
       ></Squares>
      <div className="w-full max-w-2xl   px-4     mx-auto relative">
        <div className=" py-6"> 
        <h3 className=" text-transparent bg-clip-text bg-gradient-to-t italic from-amber-400 to-primary font-semibold text-3xl text-center ">
          Miami Creators
        </h3>
        <h1 className="text-4xl md:text-6xl  text-background mb-2 text-center">
          Join Our Creator Network
        </h1>
         </div>

        <SiginForm />
      </div>
    </div>
  );
}

export default SignupPage;
