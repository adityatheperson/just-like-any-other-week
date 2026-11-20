"use client";

import React, { useState, useRef, useEffect } from "react";
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

export function resolveAssetUrl(src: string): string {
  if (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/just-like-any-other-week") &&
    src.startsWith("/") &&
    !src.startsWith("/just-like-any-other-week")
  ) {
    return `/just-like-any-other-week${src}`;
  }
  return src;
}

export function PhotoFrame({
  photo,
  onExpand,
  parallax = false,
  className = "",
}: PhotoFrameProps) {
  const [hasRealImage, setHasRealImage] = useState(false);
  const [imageError, setImageError] = useState(true);
  const [resolvedSrc, setResolvedSrc] = useState(photo.src);
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const url = resolveAssetUrl(photo.src);
    setResolvedSrc(url);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setHasRealImage(true);
      setImageError(false);
    }
  }, [photo.src]);

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={resolvedSrc}
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

        {(!hasRealImage || imageError) && (
          <motion.div
            style={{ y: yOffset }}
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 select-none"
          >
            <div className="flex items-start justify-between gap-4 border-b border-current/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase opacity-75">
                <Camera className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                <span>{photo.label}</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest opacity-60 tabular-nums shrink-0">
                {photo.aspect}
              </span>
            </div>

            <div className="my-auto max-w-lg py-4">
              <p className="font-serif text-xl sm:text-2xl italic leading-snug opacity-90">
                {photo.expectedContent}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-current/10 pt-3 font-mono text-[11px] uppercase tracking-wider opacity-75">
              <span>placeholder test</span>
              <span className="inline-flex items-center gap-1.5 group-hover:opacity-100">
                <span>Inspect</span>
                <Maximize2 className="h-3 w-3" strokeWidth={1.5} />
              </span>
            </div>
          </motion.div>
        )}

        {hasRealImage && !imageError && photo.annotation && (
          <div className="pointer-events-none absolute inset-0 z-10">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <defs>
                <marker
                  id={`arrow-${photo.id}`}
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="4.5"
                  markerHeight="4.5"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0 1.5 L 8 5 L 0 8.5 z"
                    fill="#FAF8F3"
                  />
                </marker>
              </defs>

              {/* Highlight circle around the person */}
              <ellipse
                cx={photo.annotation.circleX}
                cy={photo.annotation.circleY}
                rx={photo.annotation.circleRx}
                ry={photo.annotation.circleRy}
                fill="none"
                stroke="#FAF8F3"
                strokeWidth="0.7"
                strokeDasharray="2.2 1.4"
              />

              {/* Curved pointer arrow from label to circle */}
              <path
                d={`M ${photo.annotation.labelX - 2} ${photo.annotation.labelY + 1} Q ${
                  photo.annotation.labelX - 10
                } ${photo.annotation.labelY + 2} ${
                  photo.annotation.circleX + photo.annotation.circleRx * 0.78
                } ${photo.annotation.circleY - photo.annotation.circleRy * 0.65}`}
                fill="none"
                stroke="#FAF8F3"
                strokeWidth="0.7"
                markerEnd={`url(#arrow-${photo.id})`}
              />
            </svg>

            <span
              style={{
                left: `${photo.annotation.labelX}%`,
                top: `${photo.annotation.labelY}%`,
              }}
              className="absolute -translate-y-1/2 bg-[#141412]/85 text-[#FAF8F3] border border-[#FAF8F3]/40 px-2.5 py-0.5 font-serif italic text-base sm:text-lg tracking-wide shadow-sm"
            >
              {photo.annotation.label}
            </span>
          </div>
        )}

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
