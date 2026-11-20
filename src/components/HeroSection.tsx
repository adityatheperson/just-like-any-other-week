"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import type { MemoirContent, PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";

interface HeroSectionProps {
  data: MemoirContent;
  onExpandPhoto: (photo: PhotoAsset) => void;
}

export function HeroSection({ data, onExpandPhoto }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="top"
      className="relative w-full border-b border-[var(--border-subtle)] px-4 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[var(--border-subtle)]"
        >
          <div className="lg:col-span-8">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.96] tracking-[-0.025em] text-[var(--fg-primary)]">
              {data.meta.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:text-right flex flex-col lg:items-end justify-end">
            <p className="font-serif text-2xl sm:text-3xl italic text-[var(--fg-secondary)]">
              {data.meta.subtitle}
            </p>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
              {data.meta.locationAndDate}
            </p>
          </div>
        </motion.div>

        {data.hero.photo && (
          <div className="mt-8 sm:mt-12">
            <PhotoFrame
              photo={data.hero.photo}
              onExpand={onExpandPhoto}
              parallax
            />
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[var(--fg-secondary)]">
          <span>{data.meta.themeTitle} · Eleven Friends</span>
          <a
            href="#prologue"
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
