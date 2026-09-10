interface EyebrowProps {
  children: React.ReactNode;
  onSec?: boolean;
}

export function Eyebrow({ children, onSec = false }: EyebrowProps) {
  return (
    <span
      className={`
        block font-mono text-[0.7rem] uppercase tracking-[0.12em]
        ${onSec ? "text-[var(--theme-ink-soft)]" : "text-primary"}
      `}
    >
      {children}
    </span>
  );
}
