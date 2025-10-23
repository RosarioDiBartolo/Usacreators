import SiginForm from "@/components/form/sigin-form";
import Squares from "@/components/squares-background";

function SignupPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <Squares
        className="absolute"
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#ff6900"
        hoverFillColor="#d99168"
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-4">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2 text-center">
          Join Our Creator Network
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-sm md:text-base">
          Apply to collaborate and grow with our community of talented creators
        </p>
      </div>

      <SiginForm />
    </div>
  );
}

export default SignupPage;
