"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Maximize2, Camera } from "lucide-react";
import type { PhotoAsset } from "@/data/memoir";

interface PhotoFrameProps {
  photo: PhotoAsset;
  onExpand: (photo: PhotoAsset) => void;
  priority?: boolean;
  parallax?: boolean;
  className?: string;
}

const aspectClasses: Record<PhotoAsset["aspect"], string> = {
  cinematic: "aspect-[16/9]",
  panoramic: "aspect-[21/9]",
  wide: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export function PhotoFrame({
  photo,
  onExpand,
  parallax = false,
  className = "",
}: PhotoFrameProps) {
  const [hasRealImage, setHasRealImage] = useState(false);
  const [imageError, setImageError] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || !parallax ? ["0%", "0%"] : ["-4%", "4%"]
  );

  return (
    <figure ref={containerRef} className={`group relative ${className}`}>
      <div
        onClick={() => onExpand(photo)}
        role="button"
        tabIndex={0}
        aria-label={`Expand ${photo.alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onExpand(photo);
          }
        }}
        className={`relative w-full overflow-hidden cursor-pointer transition-colors duration-300 bg-[var(--plate-bg)] text-[var(--fg-primary)] border border-[var(--border-subtle)] ${
          aspectClasses[photo.aspect]
        }`}
      >
        {/* Attempt to load actual image from public/images/ when user adds it */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          onLoad={() => {
            setHasRealImage(true);
            setImageError(false);
          }}
          onError={() => {
            setHasRealImage(false);
            setImageError(true);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] ${
            hasRealImage && !imageError ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Editorial Architecture Placeholder (shown until real image is placed in public/images/) */}
        {(!hasRealImage || imageError) && (
          <motion.div
            style={{ y: yOffset }}
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 select-none"
          >
            {/* Subtle crop marks & technical frame */}
            <div className="flex items-start justify-between gap-4 border-b border-current/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase opacity-75">
                <Camera className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                <span>{photo.label}</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest opacity-60 tabular-nums shrink-0">
                {photo.aspect}
              </span>
            </div>

            {/* Center editorial note */}
            <div className="my-auto max-w-lg py-4">
              <p className="font-serif text-xl sm:text-2xl italic leading-snug opacity-90">
                {photo.expectedContent}
              </p>
            </div>

            {/* Bottom bar with expand prompt */}
            <div className="flex items-center justify-between border-t border-current/10 pt-3 font-mono text-[11px] uppercase tracking-wider opacity-75">
              <span>placeholder test</span>
              <span className="inline-flex items-center gap-1.5 group-hover:opacity-100">
                <span>Inspect</span>
                <Maximize2 className="h-3 w-3" strokeWidth={1.5} />
              </span>
            </div>
          </motion.div>
        )}

        {/* Expand badge when real image is loaded */}
        {hasRealImage && !imageError && (
          <div className="absolute bottom-3 right-3 bg-[#141412]/75 text-[#FAF8F3] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Expand</span>
            <Maximize2 className="h-3 w-3" />
          </div>
        )}
      </div>

      {photo.caption && (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs sm:text-sm text-[var(--fg-secondary)]">
          <span className="font-sans leading-relaxed">{photo.caption}</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)] shrink-0 tabular-nums">
            Fig. {photo.id}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
