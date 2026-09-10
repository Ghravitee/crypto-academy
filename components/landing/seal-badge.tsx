export function SealBadge() {
  return (
    <div className="relative flex h-[180px] w-[180px] shrink-0 items-center justify-center">
      {/* Outer glow effect */}
      <div className="absolute inset-[-20px] rounded-full bg-primary/5 blur-3xl animate-pulse" />

      {/* Secondary glow */}
      <div className="absolute inset-[-10px] rounded-full bg-primary/10 blur-2xl animate-pulse" />

      {/* Spinning ring 1 - outer */}
      <div className="absolute inset-0 rounded-full border-[3px] border-primary/20 animate-[spin_10s_linear_infinite]" />

      {/* Spinning ring 2 - middle */}
      <div className="absolute inset-[8px] rounded-full border-2 border-primary/15 animate-[spin_15s_linear_infinite_reverse]" />

      {/* Spinning ring 3 - inner */}
      <div className="absolute inset-[16px] rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />

      {/* Main SVG seal */}
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-[rotateSlow_25s_linear_infinite] drop-shadow-xl"
      >
        <defs>
          <path
            id="sealPath"
            d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
          />
          {/* Gradient for the text */}
          <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-primary)" />
            <stop offset="100%" stopColor="var(--theme-primary-bright)" />
          </linearGradient>
        </defs>
        <text
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="3"
          fill="url(#sealGradient)"
          fontWeight="600"
        >
          <textPath href="#sealPath">
            ✦ VERIFIED COHORT • LIVE ON ZOOM • ✦
          </textPath>
        </text>
      </svg>

      {/* Center icon with pulse and glow */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-[-10px] rounded-full bg-primary/20 blur-xl animate-pulse" />
        <span className="relative text-[2.4rem] leading-none text-primary animate-pulse">
          ✦
        </span>
      </div>
    </div>
  );
}
