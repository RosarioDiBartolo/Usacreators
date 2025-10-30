import SiginForm from "@/components/form/sigin-form";
import Squares from "@/components/squares-background";

function SignupPage() {
  return (
    <div className="relative flex items-center w-screen min-h-screen bg-secondary py-30  ">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#ff6900"
      ></Squares>
      <div className="w-full max-w-2xl    px-4     mx-auto relative">
        <div className=" py-6">

          <h1 className="text-4xl md:text-6xl bg-clip-text text-transparent  bg-gradient-to-t from-primary to-tertiary mb-2 text-center">
            Join Our Creator Network
          </h1>
        </div>

        <SiginForm />
      </div>
    </div>
  );
}

export default SignupPage;
