"use client";

import { ArrowRight, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function LoginCard() {
  return (
    <section className="flex h-full w-full items-center justify-center bg-[#09090F] px-16">
      <div className="w-full max-w-[480px]">

        {/* Logo */}
        <div className="mb-16 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/60">
            <span className="text-xl font-light text-violet-400">E</span>
          </div>

          <span className="text-lg font-light tracking-[10px] text-white">
            ESTER
          </span>
        </div>

        {/* Heading */}

        <h1 className="text-[68px] font-semibold leading-none tracking-[-3px] text-white">
          Welcome
        </h1>

        <p className="mt-6 text-[22px] leading-9 text-zinc-400">
          Continue with your account
          <br />
          to meet your companion.
        </p>

        {/* Social Buttons */}

        <div className="mt-14 space-y-5">

          <button
            className="
            group
            flex
            h-16
            w-full
            items-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            px-6
            transition-all
            duration-300
            hover:border-violet-500/40
            hover:bg-white/[0.04]
            "
          >
            <FcGoogle size={30} />

            <span className="ml-6 flex-1 text-left text-xl font-medium text-white">
              Continue with Google
            </span>

            <ArrowRight
              size={22}
              className="text-zinc-500 transition group-hover:translate-x-1"
            />
          </button>

          <button
            className="
            group
            flex
            h-16
            w-full
            items-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            px-6
            transition-all
            duration-300
            hover:border-violet-500/40
            hover:bg-white/[0.04]
            "
          >
            <FaApple
              size={28}
              className="text-white"
            />

            <span className="ml-6 flex-1 text-left text-xl font-medium text-white">
              Continue with Apple
            </span>

            <ArrowRight
              size={22}
              className="text-zinc-500 transition group-hover:translate-x-1"
            />
          </button>

        </div>

        {/* Divider */}

        <div className="my-12 flex items-center">

          <div className="h-px flex-1 bg-white/10" />

          <span className="mx-6 text-lg text-zinc-500">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        {/* Email */}

        <div
          className="
          flex
          h-16
          items-center
          rounded-2xl
          border
          border-violet-500/50
          bg-transparent
          px-5
          transition
          focus-within:border-violet-400
          "
        >
          <Mail
            size={22}
            className="text-zinc-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="
            ml-4
            flex-1
            bg-transparent
            text-lg
            text-white
            placeholder:text-zinc-500
            outline-none
            "
          />
        </div>

        {/* Continue */}

        <button
          className="
          group
          mt-6
          flex
          h-16
          w-full
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-[#8B5CF6]
          via-[#7C3AED]
          to-[#9333EA]
          text-xl
          font-semibold
          text-white
          shadow-[0_15px_40px_rgba(124,58,237,0.35)]
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-[0_20px_50px_rgba(124,58,237,0.45)]
          "
        >
          Continue

          <ArrowRight
            size={22}
            className="ml-3 transition group-hover:translate-x-1"
          />
        </button>

        {/* Footer */}

        <p className="mt-12 text-center text-[16px] leading-7 text-zinc-500">
          By continuing you agree to our
          <br />

          <button className="text-violet-400 hover:text-violet-300">
            Terms
          </button>

          {" & "}

          <button className="text-violet-400 hover:text-violet-300">
            Privacy Policy
          </button>

          .
        </p>

      </div>
    </section>
  );
}