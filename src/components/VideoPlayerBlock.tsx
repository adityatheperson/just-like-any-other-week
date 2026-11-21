"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Film } from "lucide-react";
import type { VideoAsset } from "@/data/memoir";
import { resolveAssetUrl } from "./PhotoFrame";

interface VideoPlayerBlockProps {
  video: VideoAsset;
  onPlay?: () => void;
}

export function VideoPlayerBlock({ video, onPlay }: VideoPlayerBlockProps) {
  const [resolvedSrc, setResolvedSrc] = useState(video.src);
  const [resolvedPoster, setResolvedPoster] = useState(video.poster);
  const [isExpanded, setIsExpanded] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setResolvedSrc(resolveAssetUrl(video.src));
    if (video.poster) {
      setResolvedPoster(resolveAssetUrl(video.poster));
    }
  }, [video.src, video.poster]);

  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const handleOpenExpanded = () => {
    // Pause inline player so two copies don't play simultaneously
    if (inlineVideoRef.current && !inlineVideoRef.current.paused) {
      inlineVideoRef.current.pause();
    }
    onPlay?.();
    setIsExpanded(true);
  };

  const isPortrait = video.aspect === "portrait";

  return (
    <>
      <figure
        className={`group my-10 sm:my-12 ${
          isPortrait ? "max-w-[280px] sm:max-w-[320px] mx-auto" : ""
        }`}
      >
        <div
          className={`relative w-full overflow-hidden border bg-[#141412] border-[var(--border-subtle)] ${
            isPortrait ? "aspect-[9/16]" : "aspect-[16/9]"
          }`}
        >
          <video
            ref={inlineVideoRef}
            src={resolvedSrc}
            poster={resolvedPoster}
            controls
            preload="metadata"
            playsInline
            onPlay={onPlay}
            className="h-full w-full object-contain"
          />

          {/* Expand button matching the photo plates */}
          <button
            type="button"
            onClick={handleOpenExpanded}
            aria-label={`Expand ${video.label}`}
            className="absolute top-3 right-3 z-10 bg-[#141412]/80 text-[#FAF8F3] border border-[#FAF8F3]/25 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#FAF8F3] hover:text-[#141412] transition-all"
          >
            <span>Expand</span>
            <Maximize2 className="h-3 w-3" />
          </button>
        </div>

        {video.caption && (
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs sm:text-sm text-[var(--fg-secondary)]">
            <span>{video.caption}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)]">
              Video
            </span>
          </figcaption>
        )}
      </figure>

      {/* Lightbox modal for expanded video viewing */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label={video.label}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#121110]/95 p-4 sm:p-10 text-[#F5F2EB]"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl border border-[#F5F2EB]/20 bg-[#181715] p-4 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-[#F5F2EB]/15 pb-4">
                <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#B8B2A6]">
                  <Film className="h-4 w-4" strokeWidth={1.5} />
                  <span>{video.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close expanded video view"
                  className="inline-flex items-center gap-1.5 border border-[#F5F2EB]/25 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[#F5F2EB] hover:bg-[#F5F2EB] hover:text-[#141412] transition-colors"
                >
                  <span>Close</span>
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center bg-[#121110]">
                <video
                  src={resolvedSrc}
                  poster={resolvedPoster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
