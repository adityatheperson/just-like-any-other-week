"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import type { MemoirContent, PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";

interface ConclusionSectionProps {
  conclusion: MemoirContent["conclusion"];
  meta: MemoirContent["meta"];
  onExpandPhoto: (photo: PhotoAsset) => void;
}

export function ConclusionSection({
  conclusion,
  meta,
  onExpandPhoto,
}: ConclusionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="epilogue"
      className="w-full px-4 pt-24 pb-32 sm:px-8 sm:pt-36 sm:pb-44"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-4xl sm:text-6xl leading-tight tracking-[-0.02em] text-[var(--fg-primary)]">
            {conclusion.title}
          </h2>
          <p className="mt-3 font-serif text-xl sm:text-2xl italic text-[var(--fg-secondary)]">
            {conclusion.subtitle}
          </p>
        </motion.div>

        {/* Large Group Photograph */}
        <div className="my-14 sm:my-20">
          <PhotoFrame
            photo={conclusion.groupPhoto}
            onExpand={onExpandPhoto}
            parallax
          />
        </div>

        {/* Short Closing Reflection */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="space-y-6 editorial-measure text-base sm:text-lg leading-[1.82] text-[var(--fg-primary)]">
            {conclusion.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </motion.div>

        {/* Subtle Ending Sign-Off */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.3, delay: 0.15 }}
          className="mt-24 sm:mt-32 border-t border-[var(--border-subtle)] pt-14 text-center"
        >
          <p className="font-serif text-3xl sm:text-5xl italic tracking-[-0.02em] text-[var(--fg-primary)]">
            {conclusion.finalSignoff}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
            {meta.locationAndDate} · {meta.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
