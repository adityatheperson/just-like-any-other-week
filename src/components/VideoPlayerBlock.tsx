"use client";

import React, { useEffect, useState } from "react";
import type { VideoAsset } from "@/data/memoir";
import { resolveAssetUrl } from "./PhotoFrame";

interface VideoPlayerBlockProps {
  video: VideoAsset;
  onPlay?: () => void;
}

export function VideoPlayerBlock({ video, onPlay }: VideoPlayerBlockProps) {
  const [resolvedSrc, setResolvedSrc] = useState(video.src);
  const [resolvedPoster, setResolvedPoster] = useState(video.poster);

  useEffect(() => {
    setResolvedSrc(resolveAssetUrl(video.src));
    if (video.poster) {
      setResolvedPoster(resolveAssetUrl(video.poster));
    }
  }, [video.src, video.poster]);

  const isPortrait = video.aspect === "portrait";

  return (
    <figure className={`my-12 sm:my-14 ${isPortrait ? "max-w-md mx-auto" : ""}`}>
      <div
        className={`relative w-full overflow-hidden border bg-[#141412] border-[var(--border-subtle)] ${
          isPortrait ? "aspect-[9/16]" : "aspect-[16/9]"
        }`}
      >
        <video
          src={resolvedSrc}
          poster={resolvedPoster}
          controls
          preload="metadata"
          playsInline
          onPlay={onPlay}
          className="h-full w-full object-contain"
        />
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
  );
}
