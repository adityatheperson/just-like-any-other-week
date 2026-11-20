"use client";

import React, { useState } from "react";
import { Film } from "lucide-react";
import type { VideoAsset } from "@/data/memoir";

interface VideoPlayerBlockProps {
  video: VideoAsset;
}

export function VideoPlayerBlock({ video }: VideoPlayerBlockProps) {
  const [videoAvailable, setVideoAvailable] = useState(false);

  return (
    <figure className="my-10 sm:my-14">
      <div className="relative w-full aspect-[16/9] overflow-hidden border bg-[var(--plate-bg)] text-[var(--fg-primary)] border-[var(--border-subtle)]">
        <video
          src={video.src}
          poster={video.poster}
          controls
          preload="metadata"
          playsInline
          onLoadedData={() => setVideoAvailable(true)}
          onError={() => setVideoAvailable(false)}
          className={`h-full w-full object-cover ${
            videoAvailable ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {!videoAvailable && (
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-current/10 pb-3 font-mono text-[11px] uppercase tracking-wider opacity-75">
              <span className="inline-flex items-center gap-2">
                <Film className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>{video.label}</span>
              </span>
              <span>16:9 Inline Video · Lazy Loaded</span>
            </div>

            <div className="my-auto max-w-xl">
              <p className="font-serif text-xl sm:text-2xl italic leading-snug">
                {video.expectedContent}
              </p>
              <p className="mt-2 font-mono text-xs opacity-70">
                Place MP4 at <code className="underline underline-offset-4">{video.src}</code> (standard playback controls activate automatically).
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-current/10 pt-3 font-mono text-[11px] uppercase tracking-wider opacity-65">
              <span>Poster: {video.poster}</span>
              <span>No Autoplay</span>
            </div>
          </div>
        )}
      </div>

      {video.caption && (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs sm:text-sm text-[var(--fg-secondary)]">
          <span>{video.caption}</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)]">
            Motion Clip
          </span>
        </figcaption>
      )}
    </figure>
  );
}
