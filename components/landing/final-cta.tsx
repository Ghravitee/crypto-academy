"use client";

import { useState } from "react";
import { Eyebrow } from "./eyebrow";

export function FinalCTA() {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      className="
        relative overflow-hidden bg-primary text-center
        px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,10vw,7rem)]
        transition-colors duration-250
      "
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className="
            font-display select-none text-[clamp(8rem,20vw,18rem)] 
            font-black leading-none text-[rgba(246,249,245,0.04)]
          "
        >
          cohort
        </span>
      </div>

      <div className="relative mx-auto max-w-[680px]">
        <Eyebrow onSec>Join the next cohort</Eyebrow>
        <h2
          className="
            m-0 mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] 
            font-bold leading-[1.1] text-[#F6F9F5]
          "
        >
          Ready to understand crypto properly?
        </h2>
        <p className="mt-4 font-body text-[1.0625rem] text-[rgba(246,249,245,0.7)]">
          ₦20,000 for the full one-month course.
        </p>
        <button
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className={`
            mt-8 inline-block border-none px-9 py-3.5 font-body 
            text-[0.9375rem] font-medium tracking-[0.01em] 
            transition-colors duration-150 cursor-pointer
            ${btnHover ? "bg-[#EAF1EC]" : "bg-[#F6F9F5]"} text-primary
          `}
        >
          Enroll now →
        </button>
      </div>
    </section>
  );
}
