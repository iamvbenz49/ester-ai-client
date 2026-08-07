import AuthBrandHeader from "./AuthBrandHeader";

export default function Hero() {
  return (
    <section className="hidden h-full min-h-0 w-[45%] shrink-0 bg-[#0A0A14] lg:flex lg:flex-col">
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <div className="relative flex h-[68%] items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-[85%] w-full object-contain"
          >
            <source src="/images/ester.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center pb-12">
          <AuthBrandHeader variant="hero" />

          <div className="mt-10 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_25px_#A855F7] sm:mt-12" />
        </div>
      </div>
    </section>
  );
}
