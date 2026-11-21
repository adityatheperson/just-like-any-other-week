"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { MemoirContent, PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";

interface HeroSectionProps {
  data: MemoirContent;
  onBeginReading: () => void;
  onExpandPhoto: (photo: PhotoAsset) => void;
}

export function HeroSection({
  data,
  onBeginReading,
  onExpandPhoto,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const slides = data.hero.carousel;
  const loopingSlides = [...slides, ...slides];

  useEffect(() => {
    if (prefersReducedMotion) return;
    let animationFrameId: number;
    let xPos = 0;

    const step = () => {
      const el = trackRef.current;
      if (el && !isHovered) {
        xPos += 0.65;
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && xPos >= halfWidth) {
          xPos -= halfWidth;
        }
        el.style.transform = `translate3d(${-xPos}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, prefersReducedMotion]);

  const fadeUp = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-69px)] w-full px-4 py-10 sm:px-8 sm:py-14 flex flex-col justify-between overflow-hidden"
    >
      {/* Header & Begin Reading Button */}
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          {...fadeUp}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
              {data.meta.subtitle}
            </p>
            <h1 className="mt-3 font-serif text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.96] tracking-[-0.025em] text-[var(--fg-primary)]">
              {data.meta.title}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
            <p className="font-serif text-xl sm:text-2xl italic text-[var(--fg-secondary)]">
              {data.meta.themeTitle}
            </p>
            <button
              type="button"
              onClick={onBeginReading}
              className="inline-flex items-center gap-3 border border-[var(--fg-primary)] bg-[var(--fg-primary)] text-[var(--bg-primary)] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <span>{data.hero.scrollPrompt}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* GPU-Accelerated Self-Moving Image Carousel */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="my-auto pt-8 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-6 select-none will-change-transform"
        >
          {loopingSlides.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="w-[82vw] sm:w-[520px] lg:w-[640px] shrink-0"
            >
              <PhotoFrame photo={photo} onExpand={onExpandPhoto} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
