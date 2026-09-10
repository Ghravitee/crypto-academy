import { Eyebrow } from "./eyebrow";
import { FAQItem } from "./faq-item";

const faqs = [
  {
    q: "Do I need any prior experience?",
    a: "No. The course starts from crypto basics and builds up to Solidity and trading bots, so beginners and people with some experience both have a clear path forward.",
  },
  {
    q: "How do the live classes work?",
    a: "Classes run on Zoom, 2–3 times a week for up to 2 hours. Once you've paid, you'll get your own personal class link for every session — it's tied to you and isn't shared publicly.",
  },
  {
    q: "What if I miss a class?",
    a: "Reach out and we'll help you catch up before the next session — the course moves fast since it only runs one month, so staying close to the schedule matters.",
  },
  {
    q: "Is this financial advice?",
    a: "No. This is education on how crypto and trading work, and how to protect yourself — not a signal service or investment advice.",
  },
];

export function FAQ() {
  return (
    <section
      className="
        border-t border-border bg-paper
        px-[clamp(1.5rem,5vw,3rem)] py-[clamp(3rem,8vw,5.5rem)]
        transition-colors duration-250
      "
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="faq-grid grid grid-cols-1 gap-[clamp(2rem,5vw,5rem)] md:grid-cols-[280px_1fr]">
          <div className="sticky top-20">
            <Eyebrow>FAQ</Eyebrow>
            <h2
              className="
                m-0 mt-2.5 font-display text-[clamp(1.8rem,3vw,2.5rem)] 
                font-bold leading-[1.15] text-ink transition-colors duration-250
              "
            >
              Questions,{" "}
              <em className="font-body not-italic font-light">answered.</em>
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
            <div className="border-b border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
