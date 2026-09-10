export function Footer() {
  return (
    <footer
      className="
        flex flex-wrap items-center justify-between gap-4
        border-t border-border bg-paper-dim
        px-[clamp(1.5rem,5vw,3rem)] py-6
        transition-colors duration-250
      "
    >
      <div className="flex items-baseline gap-[0.2em]">
        <span className="font-display text-[0.95rem] font-bold text-ink transition-colors duration-250">
          Crypto
        </span>
        <span className="font-body text-[0.95rem] font-light text-ink-soft transition-colors duration-250">
          Academy
        </span>
      </div>
      <p
        className="
          m-0 font-mono text-[0.65rem] uppercase tracking-[0.08em] 
          text-ink-soft transition-colors duration-250
        "
      >
        Not financial advice. Education only.
      </p>
    </footer>
  );
}
