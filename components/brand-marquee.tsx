import type { LocalizedContent } from "@/lib/content";

type BrandMarqueeProps = Pick<LocalizedContent, "brands">;

export function BrandMarquee({ brands }: BrandMarqueeProps) {
  const renderSequence = (prefix: string) => (
    <>
      <div className="hero-flag-pair flex shrink-0 items-center gap-4 pr-2">
        <FlagChip flag="mr" />
        <FlagChip flag="sn" />
      </div>
      {brands.map((brand) => (
        <span
          key={`${prefix}-${brand.slug}`}
          className="shrink-0 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300/90"
        >
          {brand.name}
        </span>
      ))}
    </>
  );

  return (
    <div className="hero-marquee-border relative z-[60] border-b border-white/10 bg-zinc-950/88 backdrop-blur-md">
      <div className="hero-marquee-viewport" aria-hidden>
        <div className="hero-marquee-track flex items-center py-3">
          <div className="hero-marquee-sequence flex shrink-0 items-center gap-10 pr-10">
            {renderSequence("a")}
          </div>
          <div className="hero-marquee-sequence flex shrink-0 items-center gap-10 pr-10">
            {renderSequence("b")}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlagChip({ flag }: { flag: "mr" | "sn" }) {
  const isMauritania = flag === "mr";

  return (
    <svg
      className={`hero-flag-svg ${isMauritania ? "hero-flag-a" : "hero-flag-b"}`}
      width="58"
      height="30"
      viewBox="0 0 58 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
    >
      <g className="hero-flag-body" transform="translate(10 6)">
        {isMauritania ? (
          <g className="hero-flag-cloth">
            <rect width="28" height="17" rx="2.4" fill="#0F9D58" />
            <rect y="0.35" width="28" height="2.1" fill="#D92D20" />
            <rect y="14.55" width="28" height="2.1" fill="#D92D20" />
            <path
              d="M14 5.1C11.8 5.8 10.1 7.7 10.1 10.1C10.1 11.7 10.9 13.2 12 14.2C10.5 13.7 9.2 12.2 9.2 10.4C9.2 8 11.2 5.9 14 5.1Z"
              fill="#FACC15"
            />
            <path d="M14 6.5L14.9 8.3L16.8 8.6L15.4 9.9L15.8 11.9L14 11L12.2 11.9L12.6 9.9L11.2 8.6L13.1 8.3L14 6.5Z" fill="#FACC15" />
          </g>
        ) : (
          <g className="hero-flag-cloth">
            <rect width="28" height="17" rx="2.4" fill="#15803D" />
            <rect x="9.35" width="9.3" height="17" fill="#FDE047" />
            <rect x="18.7" width="9.3" height="17" fill="#DC2626" />
            <path d="M14 4.3L15.1 7H17.9L15.6 8.7L16.4 11.5L14 9.8L11.6 11.5L12.4 8.7L10.1 7H12.9L14 4.3Z" fill="#15803D" />
          </g>
        )}
      </g>
    </svg>
  );
}
