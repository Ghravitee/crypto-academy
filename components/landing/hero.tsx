"use client";

import { useState } from "react";
import { Eyebrow } from "./eyebrow";
import { SealBadge } from "./seal-badge";
import Link from "next/link";

const stats = [
  { label: "Duration", value: "4 weeks" },
  { label: "Schedule", value: "3× weekly" },
  { label: "Format", value: "2hrs max" },
  { label: "Tuition", value: "₦20,000" },
];

export function Hero() {
  const [cta1Hover, setCta1Hover] = useState(false);
  const [cta2Hover, setCta2Hover] = useState(false);

  return (
    <section
      className="
        bg-paper px-[clamp(1.5rem,5vw,3rem)]
        py-[clamp(3rem,8vw,1rem)] pb-[clamp(2rem,5vw,3.5rem)]
        transition-colors duration-250
      "
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6 flex items-center gap-3">
          <span className="block h-[2px] w-6 shrink-0 bg-primary" />
          <Eyebrow>The Crypto Academy Cohort</Eyebrow>
        </div>

        <div className="flex items-start justify-between gap-8">
          <h1
            className="
              font-display m-0 max-w-[720px] text-[clamp(2.8rem,8vw,5.5rem)] 
              font-bold leading-[1.0] tracking-[-0.02em] text-ink
              transition-colors duration-250
            "
          >
            Learn crypto.
            <br />
            <em className="font-body not-italic font-light text-ink-soft">
              Don&apos;t get rekt.
            </em>
          </h1>
          <div className="hidden shrink-0 mt-1 sm:block">
            <SealBadge />
          </div>
        </div>

        <p
          className="
            mt-8 max-w-[540px] font-body text-[1.0625rem] leading-[1.7] text-ink-soft
            transition-colors duration-250
          "
        >
          A one-month, live-taught course covering everything from crypto basics
          to writing your own trading bot — and, just as importantly, how not to
          get scammed along the way.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/signup"
            onMouseEnter={() => setCta1Hover(true)}
            onMouseLeave={() => setCta1Hover(false)}
            className={`
              px-6 py-3 font-body text-[0.9rem] font-medium
              tracking-[0.01em] transition-colors duration-150 no-underline text-paper
              ${cta1Hover ? "bg-primary-bright" : "bg-primary"}
            `}
          >
            Start learning
          </Link>

          {/* See the curriculum - Anchor to curriculum section */}
          <a
            href="#curriculum"
            onMouseEnter={() => setCta2Hover(true)}
            onMouseLeave={() => setCta2Hover(false)}
            className={`
              border bg-transparent px-6 py-3 font-body text-[0.9rem] font-medium
              transition-colors duration-150 no-underline
              ${cta2Hover ? "border-primary text-primary" : "border-border text-ink"}
            `}
          >
            See the curriculum ↓
          </a>
        </div>

        <div
          className="
            stats-grid mt-12 grid grid-cols-4 border-t border-border
            max-[680px]:grid-cols-2
          "
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`
                px-6 py-5
                ${i > 0 ? "pl-6" : "pl-0"}
                ${i < stats.length - 1 ? "border-r border-border" : ""}
              `}
            >
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-soft">
                {s.label}
              </div>
              <div className="font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.1] text-ink transition-colors duration-250">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
