"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import type { MemoirContent } from "@/data/memoir";

interface IntroductionSectionProps {
  introduction: MemoirContent["introduction"];
}

const STORAGE_KEY = "memoir_laufey_progress_sec";
const TARGET_VOLUME = 0.18;

export function IntroductionSection({ introduction }: IntroductionSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const inViewRef = useRef<boolean>(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [blockedByBrowser, setBlockedByBrowser] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Resolve correct asset path for both localhost and GitHub Pages basePath
  const audioSrc =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/just-like-any-other-week")
      ? "/just-like-any-other-week/audio/from-the-start.m4a"
      : "/audio/from-the-start.m4a";

  // Restore saved progress on metadata load
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
    audio.volume = TARGET_VOLUME;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!Number.isNaN(parsed) && parsed > 0 && parsed < (audio.duration || 30)) {
          audio.currentTime = parsed;
          setCurrentTime(parsed);
        }
      }
    } catch {
      // ignore localStorage restrictions
    }
  };

  // Persist playback progress continuously
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    try {
      localStorage.setItem(STORAGE_KEY, String(audio.currentTime));
    } catch {
      // ignore localStorage restrictions
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const audio = audioRef.current;
    if (!section || !audio) return;

    audio.volume = TARGET_VOLUME;

    const tryPlayWithSound = async () => {
      if (userPaused) return;
      try {
        audio.muted = isMuted;
        audio.volume = TARGET_VOLUME;
        await audio.play();
        setIsPlaying(true);
        setBlockedByBrowser(false);
      } catch {
        // Chrome/Safari block unmuted autoplay on fresh reload until 1 click/key/tap occurs
        setBlockedByBrowser(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        inViewRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          tryPlayWithSound();
        } else {
          if (!audio.paused) {
            try {
              localStorage.setItem(STORAGE_KEY, String(audio.currentTime));
            } catch {
              // ignore
            }
            audio.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    // Unlock audio immediately on "Begin Reading" click or any click/tap/keypress anywhere on the page
    const handleUnlockGesture = () => {
      if (userPaused) return;
      audio.muted = isMuted;
      audio.volume = TARGET_VOLUME;
      audio
        .play()
        .then(() => {
          setBlockedByBrowser(false);
          if (!inViewRef.current) {
            // If they clicked in the hero before scrolling down, prime the audio element so it can play freely once they scroll into the section
            audio.pause();
            setIsPlaying(false);
          } else {
            setIsPlaying(true);
          }
        })
        .catch(() => {
          // ignore
        });
    };

    const handleBeginReading = () => {
      setUserPaused(false);
      audio.muted = isMuted;
      audio.volume = TARGET_VOLUME;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setBlockedByBrowser(false);
        })
        .catch(() => {
          // ignore
        });
    };

    window.addEventListener("memoir:begin-reading", handleBeginReading);
    window.addEventListener("click", handleUnlockGesture, { passive: true });
    window.addEventListener("pointerdown", handleUnlockGesture, { passive: true });
    window.addEventListener("touchstart", handleUnlockGesture, { passive: true });
    window.addEventListener("keydown", handleUnlockGesture, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("memoir:begin-reading", handleBeginReading);
      window.removeEventListener("click", handleUnlockGesture);
      window.removeEventListener("pointerdown", handleUnlockGesture);
      window.removeEventListener("touchstart", handleUnlockGesture);
      window.removeEventListener("keydown", handleUnlockGesture);
    };
  }, [userPaused, isMuted]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setUserPaused(true);
      try {
        localStorage.setItem(STORAGE_KEY, String(audio.currentTime));
      } catch {
        // ignore
      }
    } else {
      setUserPaused(false);
      audio.muted = isMuted;
      audio.volume = TARGET_VOLUME;
      try {
        await audio.play();
        setIsPlaying(true);
        setBlockedByBrowser(false);
      } catch {
        // ignore
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section
      id="prologue"
      ref={sectionRef}
      className="w-full px-4 py-16 sm:px-8 sm:py-24"
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        loop
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {
          setIsPlaying(true);
          setBlockedByBrowser(false);
        }}
        onPause={() => setIsPlaying(false)}
      />

      <div className="mx-auto max-w-3xl">
        {/* Subtle editorial soundtrack pill */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-y border-[var(--border-subtle)] py-2.5 px-1 font-mono text-xs text-[var(--fg-muted)]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause From the Start" : "Play From the Start"}
              className="inline-flex h-7 w-7 items-center justify-center border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3 translate-x-[0.5px]" />
              )}
            </button>
            <span className="tracking-wider uppercase text-[11px] text-[var(--fg-secondary)]">
              {isPlaying ? "Now Playing:" : "Soundtrack:"}{" "}
              <strong className="font-medium text-[var(--fg-primary)]">
                “From the Start” — Laufey
              </strong>
            </span>
            {blockedByBrowser && !isPlaying && (
              <button
                type="button"
                onClick={togglePlayPause}
                className="border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-primary)] px-2 py-0.5 text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Click anywhere to enable audio
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 tabular-nums text-[11px]">
            <span>
              {formatTime(currentTime)}
              {duration ? ` / ${formatTime(duration)}` : ""}
            </span>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-1 text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <motion.article
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {introduction.paragraphs.length > 0 && (
            <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
              {introduction.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]"
                      : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
}
