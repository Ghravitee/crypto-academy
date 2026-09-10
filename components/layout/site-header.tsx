import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteHeader() {
  return (
    <header
      className="
        relative
        z-50
        border-b
        border-border
        bg-paper/75
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[76px]
          max-w-7xl
          items-center
          justify-between
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Crypto Academy home"
        >
          <span
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-accent/30
              bg-accent/[0.08]
              text-accent
              transition
              duration-300
              group-hover:border-accent/50
              group-hover:bg-accent/[0.12]
            "
          >
            <span
              className="
                absolute
                inset-0
                bg-accent/[0.06]
                transition
                duration-300
                group-hover:bg-accent/[0.12]
              "
            />

            <Sparkles
              size={16}
              strokeWidth={1.7}
              className="
                relative
                transition-transform
                duration-300
                group-hover:rotate-12
              "
            />
          </span>

          <span className="leading-none">
            <span
              className="
                block
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-ink
              "
            >
              Crypto
            </span>

            <span
              className="
                mt-1
                block
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-accent
              "
            >
              Academy
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            href="/login"
            className="
              hidden
              rounded-full
              px-4
              py-2.5
              text-sm
              text-ink-soft
              transition
              hover:bg-accent/[0.05]
              hover:text-ink
              sm:block
            "
          >
            Log in
          </Link>

          <ThemeToggle />

          <Link
            href="/signup"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-accent
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              shadow-[0_10px_35px_color-mix(in_oklab,var(--color-accent)_15%,transparent)]
              transition
              duration-300
              hover:-translate-y-0.5
              hover:bg-accent-bright
              sm:px-5
              sm:text-sm
            "
          >
            Enroll now
            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
