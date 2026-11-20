"use client";

import React from "react";

export function TopEditorialBar({
  onReturnHome,
}: {
  onReturnHome?: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            if (onReturnHome) {
              e.preventDefault();
              onReturnHome();
            }
          }}
          className="font-serif text-2xl sm:text-3xl tracking-tight text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors"
        >
          Just Like Any Other Week
        </a>

        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
          Summer 2026
        </span>
      </div>
    </header>
  );
}
