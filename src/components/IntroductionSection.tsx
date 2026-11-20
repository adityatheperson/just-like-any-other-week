"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import type { MemoirContent } from "@/data/memoir";

interface IntroductionSectionProps {
  introduction: MemoirContent["introduction"];
}

export function IntroductionSection({ introduction }: IntroductionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="prologue"
      className="w-full border-b border-[var(--border-subtle)] px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {introduction.paragraphs.length > 0 && (
            <div className="space-y-6 editorial-measure text-base sm:text-lg leading-[1.82] text-[var(--fg-primary)]">
              {introduction.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
