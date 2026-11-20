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
      className="w-full px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <motion.article
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {introduction.paragraphs.length > 0 && (
            <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
              {introduction.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]"
                      : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
}
