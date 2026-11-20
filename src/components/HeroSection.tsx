"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = data.hero.carousel;

  const fadeUp = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  };

  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.firstElementChild?.clientWidth ?? container.clientWidth * 0.8;
    const nextIdx =
      direction === "next"
        ? Math.min(activeIndex + 1, slides.length - 1)
        : Math.max(activeIndex - 1, 0);

    setActiveIndex(nextIdx);
    container.scrollTo({
      left: nextIdx * (cardWidth + 24),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = (container.firstElementChild?.clientWidth ?? 500) + 24;
    const idx = Math.round(container.scrollLeft / cardWidth);
    if (idx !== activeIndex && idx >= 0 && idx < slides.length) {
      setActiveIndex(idx);
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-69px)] w-full border-b border-[var(--border-subtle)] px-4 py-12 sm:px-8 sm:py-16 flex flex-col justify-between"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header & Begin Reading CTA */}
        <motion.div
          {...fadeUp}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[var(--border-subtle)]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
              {data.meta.subtitle} · {data.meta.locationAndDate}
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
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)] tabular-nums">
              <span>
                0{activeIndex + 1} / 0{slides.length}
              </span>
              <span>·</span>
              <span>Trip Filmstrip</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel("prev")}
                disabled={activeIndex === 0}
                aria-label="Previous image"
                className="flex h-9 w-9 items-center justify-center border border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] disabled:opacity-35 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("next")}
                disabled={activeIndex === slides.length - 1}
                aria-label="Next image"
                className="flex h-9 w-9 items-center justify-center border border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] disabled:opacity-35 disabled:pointer-events-none transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          >
            {slides.map((photo) => (
              <div
                key={photo.id}
                className="w-[85vw] sm:w-[580px] lg:w-[760px] shrink-0 snap-start"
              >
                <PhotoFrame photo={photo} onExpand={onExpandPhoto} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
