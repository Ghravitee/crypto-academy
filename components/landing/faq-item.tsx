"use client";

import { useState } from "react";

interface FAQItemProps {
  q: string;
  a: string;
}

export function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="cursor-pointer border-t border-border"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between gap-4 py-5">
        <span className="font-body text-base font-medium leading-[1.4] text-ink">
          {q}
        </span>
        <span
          className={`
            shrink-0 text-[1.5rem] leading-none text-primary transition-transform duration-[0.22s] ease-[ease]
            ${open ? "rotate-45" : "rotate-0"}
          `}
        >
          +
        </span>
      </div>
      {open && (
        <div className="animate-[fadeSlideUp_0.18s_ease_both] pb-5 font-body text-[0.9375rem] leading-[1.65] text-ink-soft">
          {a}
        </div>
      )}
    </div>
  );
}
