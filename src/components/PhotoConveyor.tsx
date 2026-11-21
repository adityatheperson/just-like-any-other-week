"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";

interface PhotoConveyorProps {
  photos: PhotoAsset[];
  onExpandPhoto?: (photo: PhotoAsset) => void;
  /** Pixels per animation frame (~60fps). Default 0.55 for a slow, steady conveyor */
  speed?: number;
}

export const PhotoConveyor = React.memo(function PhotoConveyor({
  photos,
  onExpandPhoto,
  speed = 0.55,
}: PhotoConveyorProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const loopingPhotos = [...photos, ...photos];

  // Only run the conveyor animation when the conveyor is actually visible in the viewport
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || photos.length === 0 || !isVisible) return;

    let rafId: number;
    let scrollPos = trackRef.current?.scrollLeft ?? 0;

    const step = () => {
      const el = trackRef.current;
      if (el) {
        if (!isHovered) {
          scrollPos += speed;
          const halfWidth = el.scrollWidth / 2;
          if (halfWidth > 0 && scrollPos >= halfWidth) {
            scrollPos -= halfWidth;
          }
          el.scrollLeft = scrollPos;
        } else {
          scrollPos = el.scrollLeft;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isHovered, isVisible, prefersReducedMotion, photos.length, speed]);

  if (photos.length === 0) return null;

  return (
    <div ref={wrapperRef} className="my-12 sm:my-16 -mx-4 sm:-mx-8 lg:-mx-24">
      <div
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-5 overflow-x-auto no-scrollbar px-4 sm:px-8 select-none"
        style={{ scrollbarWidth: "none" }}
      >
        {loopingPhotos.map((photo, idx) => (
          <div
            key={`${photo.id}-${idx}`}
            className="w-[78vw] sm:w-[420px] lg:w-[480px] shrink-0"
          >
            <PhotoFrame
              photo={photo}
              onExpand={(p) => onExpandPhoto?.(p)}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
        Scroll right to see us capsize →
      </p>
    </div>
  );
});
