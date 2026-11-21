"use client";

import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";

interface PhotoConveyorProps {
  photos: PhotoAsset[];
  onExpandPhoto?: (photo: PhotoAsset) => void;
}

export const PhotoConveyor = React.memo(function PhotoConveyor({
  photos,
  onExpandPhoto,
}: PhotoConveyorProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (photos.length === 0) return null;

  const scrollByStep = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <div className="my-12 sm:my-16 -mx-4 sm:-mx-8 lg:-mx-24">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-4 sm:px-8 pb-3 snap-x snap-mandatory select-none"
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="w-[78vw] sm:w-[420px] lg:w-[480px] shrink-0 snap-start"
          >
            <PhotoFrame
              photo={photo}
              onExpand={(p) => onExpandPhoto?.(p)}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 px-4 sm:px-8 flex items-center justify-between max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
          Scroll right to see us capsize →
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByStep("prev")}
            aria-label="Scroll sequence left"
            className="flex h-8 w-8 items-center justify-center border border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep("next")}
            aria-label="Scroll sequence right"
            className="flex h-8 w-8 items-center justify-center border border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
});
