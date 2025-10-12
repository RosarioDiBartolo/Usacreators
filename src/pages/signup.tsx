import SiginForm from "@/components/sigin-form";
import Squares from "@/components/squares-background";

function SignupPage() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center relative">
      <Squares
        className=" absolute"
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />

      <SiginForm />
    </div>
  );
}

export default SignupPage;
