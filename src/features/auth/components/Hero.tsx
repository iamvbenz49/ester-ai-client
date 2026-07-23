import Image from "next/image";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <section className="hidden w-[45%] bg-[#0A0A14] lg:flex">
      <div className="flex w-full flex-col">

        {/* Image Area */}
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

        {/* Text Area */}
        <div className="flex flex-1 flex-col items-center justify-center pb-12">

          <h1 className={geist.className + " text-[84px] font-extralight tracking-[18px] text-white"}>
            ESTER
          </h1>

          <p className="mt-4 text-2xl text-zinc-400">
            Someone who remembers you.
          </p>

          <div className="mt-12 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_25px_#A855F7]" />

        </div>

      </div>
    </section>
  );
}