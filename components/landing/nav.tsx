"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Nav() {
  const [loginHover, setLoginHover] = useState(false);
  const [enrollHover, setEnrollHover] = useState(false);

  return (
    <nav
      className="
        sticky top-0 z-50 flex h-[60px] items-center justify-between
        border-b border-border bg-[var(--theme-paper)]
        px-[clamp(1.5rem,5vw,3rem)] transition-colors duration-250
      "
    >
      <Link href="#" className="flex items-baseline gap-[0.2em] no-underline">
        <span className="font-display text-[1.15rem] font-bold text-ink transition-colors duration-250">
          Crypto
        </span>
        <span className="font-body text-[1.15rem] font-light text-ink-soft transition-colors duration-250">
          Academy
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Log in - Now a Link */}
        <Link
          href="/login"
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
          className={`
            px-[0.9rem] py-[0.4rem] font-body text-[0.875rem] font-medium
            transition-colors duration-150 no-underline
            ${loginHover ? "text-ink" : "text-ink-soft"}
          `}
        >
          Log in
        </Link>

        {/* Enroll now - Now a Link */}
        <Link
          href="/signup"
          onMouseEnter={() => setEnrollHover(true)}
          onMouseLeave={() => setEnrollHover(false)}
          className={`
            px-[1.1rem] py-[0.45rem] font-body text-[0.875rem] font-medium
            transition-colors duration-150 no-underline text-paper
            ${enrollHover ? "bg-primary-bright" : "bg-primary"}
          `}
        >
          Enroll now
        </Link>
      </div>
    </nav>
  );
}
