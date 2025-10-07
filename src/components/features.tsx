export default function Example() {
  return (
    <section id="features" className="w-full py-16 bg-background">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="text-center  max-w-2xl mx-auto mb-12">
        <h1 className="  text-3xl italic 
        bg-clip-text text-transparent bg-gradient-to-br 
        from-foreground via-stone-600 to-stone-300  ">Features You’ll Love</h1>
        <p className=" text-xl text-slate-500 mt-2">
          Connect with Miami’s top creators — authentic, local, and ready to bring your brand to life.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap items-start justify-center gap-10">
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png"
            alt="Creator matchmaking"
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Perfect Matches</h3>
          <p className="text-sm text-slate-600 mt-1">
            Our platform seamlessly connects brands with Miami-based creators for authentic partnerships.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png"
            alt="Local creators"
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Miami Locals</h3>
          <p className="text-sm text-slate-600 mt-1">
            Work with creators who know the city, the culture, and the community — true Miami vibes.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png"
            alt="Direct contact"
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Direct Connections</h3>
          <p className="text-sm text-slate-600 mt-1">
            No endless DMs or waiting games. Contact creators instantly and start real conversations.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-4.png"
            alt="Browse categories"
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Browse by Category</h3>
          <p className="text-sm text-slate-600 mt-1">
            Beauty, fitness, lifestyle, or food — easily find the right creator for your brand.
          </p>
        </div>
      </div>
    </section>
  );
}
