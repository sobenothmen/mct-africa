export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden border border-[var(--border-subtle)] bg-white p-6 shadow-[0_20px_80px_rgba(16,35,58,0.08)]">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b68d49]">MCT</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-[#10233a]">Loading</p>
            </div>
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-[#0f1f34]/12" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c9a15d] animate-spin" />
            </div>
          </div>
          <div className="mt-6 h-1 w-full overflow-hidden bg-[#0f1f34]/10">
            <div className="h-full w-1/3 bg-[#c9a15d] animate-[mct-loader_1.2s_ease-in-out_infinite]" />
          </div>
          <div className="mt-6 grid grid-cols-12 gap-2 opacity-60" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-full bg-[#0f1f34]/10 animate-[mct-pulse_1.6s_ease-in-out_infinite]"
                style={{ animationDelay: `${(i % 12) * 80}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
