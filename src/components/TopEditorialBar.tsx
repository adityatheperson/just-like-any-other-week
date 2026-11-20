"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface TopEditorialBarProps {
  showBackButton?: boolean;
  onReturnHome?: () => void;
}

export function TopEditorialBar({
  showBackButton = false,
  onReturnHome,
}: TopEditorialBarProps) {
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

        <div className="flex items-center gap-4">
          {showBackButton && onReturnHome && (
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-secondary)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Landing Page</span>
            </button>
          )}

          <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
            Summer 2026
          </span>
        </div>
      </div>
    </header>
  );
}
