"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import type { MemoirContent } from "@/data/memoir";

interface IntroductionSectionProps {
  introduction: MemoirContent["introduction"];
  chapters: MemoirContent["chapters"];
}

export function IntroductionSection({ introduction, chapters }: IntroductionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="prologue"
      className="w-full border-b border-[var(--border-subtle)] px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight tracking-[-0.02em] text-[var(--fg-primary)]">
            {introduction.heading}
          </h2>

          <p className="mt-6 font-serif text-2xl sm:text-3xl italic leading-relaxed text-[var(--fg-secondary)] max-w-3xl">
            &ldquo;{introduction.epigraph}&rdquo;
          </p>

          <div className="mt-10 space-y-6 editorial-measure text-base sm:text-lg leading-[1.78] text-[var(--fg-primary)]">
            {introduction.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Chapter index preview */}
          <div className="mt-16 border-t border-[var(--border-subtle)] pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className="group block border-t border-[var(--border-strong)] pt-4 transition-colors"
                >
                  <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)] tabular-nums">
                    <span>Chapter {chapter.number}</span>
                    <span>{chapter.emotionalFocus}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-secondary)]">
                    {chapter.eventSummary}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
