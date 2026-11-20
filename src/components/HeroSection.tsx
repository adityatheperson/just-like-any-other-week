"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import type { MemoirContent } from "@/data/memoir";

interface HeroSectionProps {
  data: MemoirContent;
}

export function HeroSection({ data }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="top"
      className="relative min-h-[85vh] w-full border-b border-[var(--border-subtle)] px-4 py-16 sm:px-8 sm:py-24 flex flex-col justify-between"
    >
      <div className="mx-auto w-full max-w-5xl my-auto">
        <motion.div
          {...fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-[var(--border-subtle)]"
        >
          <div>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.96] tracking-[-0.025em] text-[var(--fg-primary)]">
              {data.meta.title}
            </h1>
          </div>
          <div className="sm:text-right flex flex-col sm:items-end justify-end shrink-0">
            <p className="font-serif text-2xl sm:text-3xl italic text-[var(--fg-secondary)]">
              {data.meta.subtitle}
            </p>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
              {data.meta.locationAndDate}
            </p>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--fg-secondary)]">
          <span>{data.meta.themeTitle}</span>
          <a
            href="#prologue"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("memoir:begin-reading"));
            }}
            className="inline-flex items-center gap-2 border-b border-[var(--fg-primary)] pb-0.5 text-[var(--fg-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <span>{data.hero.scrollPrompt}</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
