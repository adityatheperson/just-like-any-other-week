"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
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
      className="relative w-full border-b border-[var(--border-subtle)] px-4 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          {...fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
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
      </div>
    </section>
  );
}
