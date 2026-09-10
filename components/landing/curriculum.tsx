"use client";

import { useState } from "react";
import { Eyebrow } from "./eyebrow";

const curriculum = [
  {
    week: "01",
    title: "Crypto Foundations",
    summary: "From zero to genuinely understanding how the technology works.",
    topics: [
      "How blockchains work",
      "Bitcoin & Ethereum fundamentals",
      "Wallets, keys & seed phrases",
      "CEX vs. DEX",
    ],
  },
  {
    week: "02",
    title: "Security & Threat Literacy",
    summary: "Recognise and avoid the attacks that drain new traders.",
    topics: [
      "Rug pull anatomy & red flags",
      "Phishing & social engineering",
      "Reading bubble maps",
      "Safe custody habits",
    ],
  },
  {
    week: "03",
    title: "Trading & Markets",
    summary: "Read charts, understand market structure, manage risk.",
    topics: [
      "Chart reading & technical analysis",
      "DeFi, liquidity & DEX mechanics",
      "On-chain analysis tools",
      "Risk management basics",
    ],
  },
  {
    week: "04",
    title: "Building in Web3",
    summary: "Write your first smart contract and automate your first trade.",
    topics: [
      "Solidity fundamentals",
      "Smart contract interaction",
      "Writing a trading bot",
      "Putting it all together",
    ],
  },
];

function CurriculumCard({
  w,
  last,
}: {
  w: (typeof curriculum)[number];
  last: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        px-7 py-8 transition-colors duration-200
        ${!last ? "border-r border-border" : ""}
        ${hover ? "bg-[var(--theme-paper-dim-hover)]" : "bg-paper-dim"}
      `}
    >
      <div className="mb-5 font-display text-[2.5rem] font-bold leading-none text-ink opacity-12">
        {w.week}
      </div>
      <h3 className="m-0 mb-1.5 font-display text-[1.1rem] font-semibold leading-[1.25] text-ink transition-colors duration-250">
        {w.title}
      </h3>
      <p className="m-0 mb-[1.1rem] font-body text-[0.8125rem] leading-[1.55] text-ink-soft transition-colors duration-250">
        {w.summary}
      </p>
      <ul className="m-0 list-none p-0">
        {w.topics.map((topic, j) => (
          <li
            key={j}
            className="mb-[0.45rem] flex items-start gap-2 font-body text-[0.8125rem] leading-[1.4] text-ink-soft"
          >
            <span className="mt-[0.35rem] block h-1 w-1 shrink-0 rounded-full bg-primary" />
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Curriculum() {
  return (
    <section
      id="curriculum"
      className="
        border-t border-border bg-paper-dim
        px-[clamp(1.5rem,5vw,3rem)] py-[clamp(3rem,8vw,5.5rem)]
        transition-colors duration-250
      "
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>The curriculum</Eyebrow>
            <h2
              className="
                m-0 max-w-[500px] font-display text-[clamp(1.9rem,4vw,3rem)] 
                font-bold leading-[1.15] text-ink transition-colors duration-250
              "
            >
              Go from crypto curious to crypto capable.
            </h2>
          </div>
          <p
            className="
              m-0 max-w-[320px] font-body text-[0.9375rem] leading-[1.65] 
              text-ink-soft transition-colors duration-250
            "
          >
            A structured path from the fundamentals to practical Web3 skills —
            without assuming you already know everything.
          </p>
        </div>

        <div
          className="
            curriculum-grid grid grid-cols-4 border border-border
            max-[900px]:grid-cols-2 max-[520px]:grid-cols-1
          "
        >
          {curriculum.map((w, i) => (
            <CurriculumCard
              key={w.week}
              w={w}
              last={i === curriculum.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
