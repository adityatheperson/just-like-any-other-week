"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { resolveAssetUrl } from "./PhotoFrame";

interface HoverPhotoWordProps {
  word: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
}

export function HoverPhotoWord({
  word,
  imageSrc,
  imageAlt,
  caption,
}: HoverPhotoWordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState(imageSrc);

  useEffect(() => {
    setResolvedSrc(resolveAssetUrl(imageSrc));
  }, [imageSrc]);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="inline cursor-pointer underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)] transition-colors"
      >
        {word}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 w-64 sm:w-72 -translate-x-1/2 border border-[var(--border-strong)] bg-[var(--bg-primary)] p-2 shadow-[0_12px_32px_rgba(28,26,23,0.18)] block"
          >
            <span className="relative block w-full aspect-[4/3] overflow-hidden bg-[var(--plate-bg)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolvedSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </span>
            {caption && (
              <span className="mt-1.5 block text-center font-serif italic text-sm leading-snug text-[var(--fg-secondary)]">
                {caption}
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
