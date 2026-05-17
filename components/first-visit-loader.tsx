"use client";

import { useEffect, useMemo, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function FirstVisitLoader() {
  const [visible, setVisible] = useState(false);
  const [readyToHide, setReadyToHide] = useState(false);

  const shouldAnimate = useMemo(() => !prefersReducedMotion(), []);

  useEffect(() => {
    // Show on every reload.
    queueMicrotask(() => setVisible(true));

    const minShowMs = shouldAnimate ? 900 : 200;
    const maxShowMs = shouldAnimate ? 1800 : 450;
    const startedAt = Date.now();

    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(minShowMs - elapsed, 0);
      window.setTimeout(() => {
        if (cancelled) return;
        setReadyToHide(true);
        window.setTimeout(() => setVisible(false), 520);
      }, delay);
    };

    // Try to sync with font readiness without blocking forever.
    const fontsReady = (document as unknown as { fonts?: { ready?: Promise<void> } }).fonts?.ready;
    if (fontsReady && typeof fontsReady.then === "function") {
      const timeout = window.setTimeout(finish, maxShowMs);
      fontsReady
        .then(() => {
          window.clearTimeout(timeout);
          finish();
        })
        .catch(() => {
          window.clearTimeout(timeout);
          finish();
        });
    } else {
      window.setTimeout(finish, minShowMs);
    }

    return () => {
      cancelled = true;
    };
  }, [shouldAnimate]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white transition-opacity duration-500 ${
        readyToHide ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Loading"
      role="status"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,35,58,0.06),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f9fbfe_100%)]" />

      <div className="relative flex min-h-full items-center justify-center px-6">
        <div className="flex flex-col items-center">
          <div className="relative h-56 w-56 sm:h-64 sm:w-64">
            <svg
              viewBox="0 0 240 240"
              className={shouldAnimate ? "h-full w-full animate-[mct-ring_1.4s_linear_infinite]" : "h-full w-full"}
              role="presentation"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="mctRingGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#c9a15d" />
                  <stop offset="1" stopColor="#e7cf9f" />
                </linearGradient>
              </defs>
              <circle cx="120" cy="120" r="92" stroke="rgba(15,31,52,0.10)" strokeWidth="10" fill="none" />
              <circle
                cx="120"
                cy="120"
                r="92"
                stroke="url(#mctRingGold)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="145 430"
                fill="none"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white shadow-[0_18px_60px_rgba(8,21,39,0.10)] sm:h-40 sm:w-40">
                <span className="font-serif text-5xl tracking-[-0.04em] text-[#0f1f34] sm:text-6xl">
                  M<span className="text-[#c9a15d]">C</span>T
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.26em] text-[#0f1f34]/70">
            {shouldAnimate ? (
              <span className="animate-[mct-flicker_1.6s_ease-in-out_infinite]">Loading</span>
            ) : (
              <span>Loading</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
