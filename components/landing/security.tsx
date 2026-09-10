import { Eyebrow } from "./eyebrow";

const threats = [
  {
    label: "Rug pulls",
    desc: "Identify projects with centralized liquidity and exit traps before you invest.",
  },
  {
    label: "Phishing attacks",
    desc: "Spot fake links, wallet drainers, and spoofed sites that steal your keys.",
  },
  {
    label: "Fake support DMs",
    desc: "Understand the social engineering playbook — so you never hand over a seed phrase.",
  },
  {
    label: "Bubble map reading",
    desc: "Follow wallet relationships to see who actually controls a token's supply.",
  },
];

export function Security() {
  return (
    <section className="bg-[var(--theme-sec-bg)] px-[clamp(1.5rem,5vw,3rem)] py-[clamp(3rem,8vw,5.5rem)] transition-colors duration-250">
      <div className="mx-auto max-w-[1100px]">
        <div className="security-grid grid grid-cols-1 gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2">
          <div>
            <Eyebrow onSec>Security before speculation</Eyebrow>
            <h2
              className="
                m-0 mt-3 mb-5 font-display text-[clamp(1.9rem,4vw,3rem)] 
                font-bold leading-[1.15] text-[var(--theme-ink)] transition-colors duration-250
              "
            >
              Half this course is about not getting rekt.
            </h2>
            <p
              className="
                m-0 font-body text-[0.9375rem] leading-[1.7] 
                text-[var(--theme-sec-text)] transition-colors duration-250
              "
            >
              Rug pulls, phishing links, and fake support DMs cost new traders
              more than bad trades do. We teach the defensive side first —
              recognising scams, reading bubble maps, and building habits that
              keep your funds yours.
            </p>
            <div
              className="
                mt-8 inline-flex items-center gap-3 border border-(--theme-sec-border) 
                px-5 py-4
              "
            >
              <span className="font-display text-[1.75rem] font-bold leading-none text-primary">
                02
              </span>
              <span className="font-body text-[0.8125rem] leading-[1.4] text-(--theme-sec-subtle)">
                Security &amp; Threat Literacy
                <br />
                <strong className="font-medium text-(--theme-sec-text)">
                  Dedicated full week
                </strong>
              </span>
            </div>
          </div>

          <div>
            {threats.map((threat, i) => (
              <div
                key={i}
                className={`
                  flex gap-4 items-start py-5
                  ${i < threats.length - 1 ? "border-b border-[var(--theme-sec-border)]" : ""}
                `}
              >
                <span className="font-mono text-[0.7rem] text-signal mt-[0.15rem] shrink-0">
                  ⚑
                </span>
                <div>
                  <div className="font-body text-[0.9375rem] font-medium text-[var(--theme-ink)] transition-colors duration-250">
                    {threat.label}
                  </div>
                  <div className="font-body text-[0.8125rem] leading-[1.55] text-[var(--theme-sec-subtle)]">
                    {threat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
