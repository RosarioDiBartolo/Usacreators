import SiginForm from "@/components/form/sigin-form";
import Squares from "@/components/squares-background";

function SignupPage() {
  return (
    <div className="relative w-screen min-h-screen flex flex-col">
      <Squares
        className="absolute"
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#ff6900"
        hoverFillColor="#d99168"
      />

      <div className="flex-1 flex flex-col justify-center items-center relative z-10">
        <div className="w-full max-w-lg px-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2 text-center">
            Join Our Creator Network
          </h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            Apply to collaborate and grow with our community of talented creators
          </p>
        </div>

        <SiginForm />
      </div>
    </div>
  );
}

export default SignupPage;
