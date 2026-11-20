"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import type { AudioAsset } from "@/data/memoir";

interface AudioClipBarProps {
  audio: AudioAsset;
}

export function AudioClipBar({ audio }: AudioClipBarProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (!hasFile) {
      setStatusMessage(
        `Audio placeholder active — drop your recording at public${audio.src} to enable playback.`
      );
      return;
    }

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      try {
        await el.play();
        setIsPlaying(true);
        setStatusMessage(null);
      } catch {
        setStatusMessage(
          `Audio placeholder active — drop your recording at public${audio.src} to enable playback.`
        );
      }
    }
  };

  return (
    <div className="my-8 border-y border-[var(--border-strong)] py-4 px-4 sm:px-6 bg-[var(--bg-secondary)]/60">
      <audio
        ref={audioRef}
        src={audio.src}
        preload="none"
        onCanPlay={() => setHasFile(true)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasFile(false)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${audio.title}` : `Play ${audio.title}`}
            className="mt-0.5 sm:mt-0 flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--fg-primary)] transition-colors hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)]"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" strokeWidth={1.75} />
            ) : (
              <Play className="h-3.5 w-3.5 translate-x-[1px]" strokeWidth={1.75} />
            )}
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Volume2 className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={1.75} />
              <span className="font-serif text-base sm:text-lg text-[var(--fg-primary)]">
                {audio.title}
              </span>
            </div>
            <p className="mt-0.5 text-xs sm:text-sm text-[var(--fg-secondary)]">
              {audio.expectedContent}
            </p>
          </div>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)] tabular-nums sm:text-right shrink-0">
          {audio.durationLabel}
        </div>
      </div>

      {statusMessage && (
        <p
          role="status"
          className="mt-3 border-t border-[var(--border-subtle)] pt-2 font-mono text-xs text-[var(--accent)]"
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}
