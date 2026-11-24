"use client";

import React, { useState, useRef, useEffect } from "react";
import { Maximize2, Camera } from "lucide-react";
import type { PhotoAsset } from "@/data/memoir";

interface PhotoFrameProps {
  photo: PhotoAsset;
  onExpand: (photo: PhotoAsset) => void;
  priority?: boolean;
  parallax?: boolean;
  showTitleBelow?: boolean;
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

export const PhotoFrame = React.memo(function PhotoFrame({
  photo,
  onExpand,
  showTitleBelow = false,
  className = "",
}: PhotoFrameProps) {
  const [hasRealImage, setHasRealImage] = useState(false);
  const [imageError, setImageError] = useState(true);
  const [resolvedSrc, setResolvedSrc] = useState(photo.src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const url = resolveAssetUrl(photo.src);
    setResolvedSrc(url);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setHasRealImage(true);
      setImageError(false);
    }
  }, [photo.src]);

  return (
    <figure className={`group relative ${className}`}>
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
        className={`relative w-full overflow-hidden cursor-pointer bg-[var(--plate-bg)] text-[var(--fg-primary)] ${
          aspectClasses[photo.aspect]
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={resolvedSrc}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => {
            setHasRealImage(true);
            setImageError(false);
          }}
          onError={() => {
            setHasRealImage(false);
            setImageError(true);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.012] ${
            hasRealImage && !imageError ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {(!hasRealImage || imageError) && (
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 select-none">
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
          </div>
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
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FAF8F3" />
                </marker>
              </defs>

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
              className="absolute -translate-y-1/2 bg-[#141412]/80 text-[#FAF8F3] px-2.5 py-0.5 font-serif italic text-base sm:text-lg tracking-wide"
            >
              {photo.annotation.label}
            </span>
          </div>
        )}

        {/* Minimal expand icon only on hover */}
        {hasRealImage && !imageError && (
          <div className="absolute bottom-2.5 right-2.5 bg-[#141412]/55 text-[#FAF8F3] p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {(showTitleBelow || photo.caption) && (
        <figcaption className="mt-2.5 font-serif italic text-base sm:text-[1.05rem] leading-snug text-[var(--fg-secondary)]">
          <span>{photo.caption || photo.label}</span>
        </figcaption>
      )}
    </figure>
  );
});
