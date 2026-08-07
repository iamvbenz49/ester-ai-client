type Props = {
  variant?: "form" | "hero";
};

export default function AuthBrandHeader({ variant = "form" }: Props) {
  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "flex flex-col items-center gap-5 text-center"
          : "mb-4 flex items-center gap-3.5"
      }
    >
      <div className="flex items-center gap-3.5">
        <div
          className={
            isHero
              ? "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-violet-500/60 sm:h-24 sm:w-24"
              : "flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/60"
          }
        >
          <span
            className={
              isHero
                ? "text-4xl font-light text-violet-400 sm:text-5xl"
                : "text-xl font-light text-violet-400"
            }
          >
            E
          </span>
        </div>

        <span
          className={
            isHero
              ? "text-4xl font-light tracking-[14px] text-white sm:text-5xl sm:tracking-[18px] lg:text-6xl lg:tracking-[22px]"
              : "text-lg font-light tracking-[10px] text-white sm:text-xl sm:tracking-[12px]"
          }
        >
          STER
        </span>
      </div>

      {isHero ? (
        <p className="max-w-xs text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Someone who remembers you.
        </p>
      ) : null}
    </div>
  );
}
