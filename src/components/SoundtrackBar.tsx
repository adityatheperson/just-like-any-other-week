"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const VOLUME_STORAGE_KEY = "memoir_laufey_volume";
const DEFAULT_VOLUME = 0.18;
const OPENING_FADE_IN_MS = 450;
const OPENING_FADE_OUT_MS = 1400;
const REPRISE_FADE_IN_MS = 1600;
const REPRISE_FADE_OUT_MS = 900;
const OPENING_START_SEC = 0;
const REPRISE_START_SEC = 135; // 2:15 (final chorus & outro of the 2:49 song)

interface SoundtrackManagerProps {
  stopTriggerRef: React.RefObject<HTMLElement | null>;
  repriseZoneRef: React.RefObject<HTMLElement | null>;
}

interface BarUIProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  blockedByBrowser: boolean;
  currentTime: number;
  duration: number;
  onTogglePlayPause: () => void;
  onToggleMute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (sec: number) => string;
}

function BarUI({
  isPlaying,
  isMuted,
  volume,
  blockedByBrowser,
  currentTime,
  duration,
  onTogglePlayPause,
  onToggleMute,
  onVolumeChange,
  onSeekChange,
  formatTime,
}: BarUIProps) {
  return (
    <div className="border-y border-[var(--border-subtle)] py-3.5 px-1 font-mono text-xs text-[var(--fg-muted)] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePlayPause}
            aria-label={
              isPlaying ? "Pause From the Start" : "Play From the Start"
            }
            className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5 translate-x-[0.5px]" />
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
              onClick={onTogglePlayPause}
              className="border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-primary)] px-2 py-0.5 text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Click to play
            </button>
          )}
        </div>

        {/* Volume control slider */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-1 text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={onVolumeChange}
            aria-label="Audio volume"
            className="w-24 sm:w-28 h-1 accent-[var(--accent)] bg-[var(--border-strong)] cursor-pointer"
          />
          <span className="w-8 text-right tabular-nums text-[11px]">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>

      {/* Track position slider */}
      <div className="flex items-center gap-3 tabular-nums text-[11px]">
        <span className="w-9">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 170}
          step={0.1}
          value={currentTime}
          onChange={onSeekChange}
          aria-label="Seek song position"
          className="flex-1 h-1 accent-[var(--accent)] bg-[var(--border-strong)] cursor-pointer"
        />
        <span className="w-9 text-right">
          {duration ? formatTime(duration) : "2:49"}
        </span>
      </div>
    </div>
  );
}

/**
 * Self-contained SoundtrackBar component that portals its second copy into
 * the closing section so audio timer ticks ONLY re-render the small audio bars
 * and never re-render the memoir paragraphs, photos, or videos.
 */
export function SoundtrackBar({
  stopTriggerRef,
  repriseZoneRef,
  repriseMountNode,
}: SoundtrackManagerProps & { repriseMountNode: HTMLElement | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const inViewRef = useRef<boolean>(true);
  const fadeRafRef = useRef<number | null>(null);
  const isFadingOutRef = useRef<boolean>(false);
  const targetVolumeRef = useRef<number>(DEFAULT_VOLUME);
  const activeZoneRef = useRef<"opening" | "reprise" | "none">("none");
  const lastSavedSecRef = useRef<number>(-1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [userPaused, setUserPaused] = useState(false);
  const [blockedByBrowser, setBlockedByBrowser] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioSrc =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/just-like-any-other-week")
      ? "/just-like-any-other-week/audio/from-the-start.mp3"
      : "/audio/from-the-start.mp3";

  const cancelFade = useCallback(() => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  }, []);

  const fadeAudioTo = useCallback(
    (targetVol: number, durationMs: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      const startVol = audio.volume;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / durationMs, 1);
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const nextVol = Math.max(
          0,
          Math.min(1, startVol + (targetVol - startVol) * eased)
        );
        audio.volume = nextVol;

        if (t < 1) {
          fadeRafRef.current = requestAnimationFrame(tick);
        } else {
          fadeRafRef.current = null;
          onComplete?.();
        }
      };

      fadeRafRef.current = requestAnimationFrame(tick);
    },
    [cancelFade]
  );

  const fadeInPlay = useCallback(
    async (customDurationMs?: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      const fadeDuration =
        customDurationMs ??
        (activeZoneRef.current === "reprise"
          ? REPRISE_FADE_IN_MS
          : OPENING_FADE_IN_MS);

      isFadingOutRef.current = false;
      cancelFade();
      audio.muted = isMuted;

      if (audio.paused) {
        audio.volume = 0.01;
        try {
          await audio.play();
          setIsPlaying(true);
          setBlockedByBrowser(false);
          fadeAudioTo(targetVolumeRef.current, fadeDuration);
        } catch {
          setBlockedByBrowser(true);
        }
      } else {
        setIsPlaying(true);
        fadeAudioTo(targetVolumeRef.current, fadeDuration);
      }
    },
    [cancelFade, fadeAudioTo, isMuted]
  );

  const fadeOutPause = useCallback(
    (customDurationMs?: number) => {
      const audio = audioRef.current;
      if (!audio || audio.paused || isFadingOutRef.current) return;

      const fadeDuration =
        customDurationMs ??
        (activeZoneRef.current === "reprise"
          ? REPRISE_FADE_OUT_MS
          : OPENING_FADE_OUT_MS);

      isFadingOutRef.current = true;
      setIsPlaying(false);
      fadeAudioTo(0, fadeDuration, () => {
        isFadingOutRef.current = false;
        audio.pause();
      });
    },
    [fadeAudioTo]
  );

  useEffect(() => {
    try {
      const savedVol = localStorage.getItem(VOLUME_STORAGE_KEY);
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          setVolume(parsed);
          targetVolumeRef.current = parsed;
        }
      }
    } catch {
      // ignore
    }
    return () => cancelFade();
  }, [cancelFade]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
    audio.currentTime = OPENING_START_SEC;
    setCurrentTime(OPENING_START_SEC);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const secFloor = Math.floor(audio.currentTime);
    if (secFloor !== lastSavedSecRef.current) {
      lastSavedSecRef.current = secFloor;
      setCurrentTime(audio.currentTime);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let scrollTicking = false;

    const evaluateZones = () => {
      scrollTicking = false;
      const triggerEl = stopTriggerRef.current;
      if (!triggerEl) return;

      const rect = triggerEl.getBoundingClientRect();
      const inOpeningZone = rect.bottom > window.innerHeight * 0.45;

      const repriseEl = repriseZoneRef.current;
      let inRepriseZone = false;
      if (repriseEl) {
        const repRect = repriseEl.getBoundingClientRect();
        inRepriseZone =
          repRect.top <= window.innerHeight * 0.85 && repRect.bottom >= 80;
      }

      const nextZone: "opening" | "reprise" | "none" = inOpeningZone
        ? "opening"
        : inRepriseZone
        ? "reprise"
        : "none";

      const prevZone = activeZoneRef.current;
      activeZoneRef.current = nextZone;

      const shouldPlay = nextZone !== "none";
      inViewRef.current = shouldPlay;

      if (!shouldPlay) {
        if (!audio.paused) {
          fadeOutPause(
            prevZone === "reprise"
              ? REPRISE_FADE_OUT_MS
              : OPENING_FADE_OUT_MS
          );
        }
      } else {
        if (nextZone !== prevZone) {
          const targetTime =
            nextZone === "opening" ? OPENING_START_SEC : REPRISE_START_SEC;
          audio.currentTime = targetTime;
          setCurrentTime(targetTime);
        }

        if (
          !userPaused &&
          (audio.paused || isFadingOutRef.current) &&
          !document.hidden
        ) {
          fadeInPlay(
            nextZone === "reprise"
              ? REPRISE_FADE_IN_MS
              : OPENING_FADE_IN_MS
          );
        }
      }
    };

    const handleScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(evaluateZones);
      }
    };

    evaluateZones();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleUnlockGesture = () => {
      if (userPaused || !inViewRef.current) return;
      if (audio.paused) {
        fadeInPlay();
      }
    };

    const handleBeginReading = () => {
      setUserPaused(false);
      activeZoneRef.current = "opening";
      audio.currentTime = OPENING_START_SEC;
      setCurrentTime(OPENING_START_SEC);
      fadeInPlay();
    };

    const handleVideoPlay = () => {
      fadeOutPause();
    };

    const pauseOnLeave = () => {
      cancelFade();
      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    const resumeOnReturn = () => {
      if (!document.hidden && inViewRef.current && !userPaused) {
        fadeInPlay();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        pauseOnLeave();
      } else {
        resumeOnReturn();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", pauseOnLeave);
    window.addEventListener("blur", pauseOnLeave);
    window.addEventListener("focus", resumeOnReturn);
    window.addEventListener("memoir:begin-reading", handleBeginReading);
    window.addEventListener("memoir:video-play", handleVideoPlay);
    window.addEventListener("click", handleUnlockGesture, { passive: true });
    window.addEventListener("pointerdown", handleUnlockGesture, {
      passive: true,
    });
    window.addEventListener("touchstart", handleUnlockGesture, {
      passive: true,
    });
    window.addEventListener("keydown", handleUnlockGesture, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", pauseOnLeave);
      window.removeEventListener("blur", pauseOnLeave);
      window.removeEventListener("focus", resumeOnReturn);
      window.removeEventListener("memoir:begin-reading", handleBeginReading);
      window.removeEventListener("memoir:video-play", handleVideoPlay);
      window.removeEventListener("click", handleUnlockGesture);
      window.removeEventListener("pointerdown", handleUnlockGesture);
      window.removeEventListener("touchstart", handleUnlockGesture);
      window.removeEventListener("keydown", handleUnlockGesture);
    };
  }, [
    userPaused,
    fadeInPlay,
    fadeOutPause,
    cancelFade,
    stopTriggerRef,
    repriseZoneRef,
  ]);

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      cancelFade();
      if (audioEl && !audioEl.paused) {
        audioEl.pause();
      }
    };
  }, [cancelFade]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      setUserPaused(true);
      fadeOutPause();
    } else {
      setUserPaused(false);
      fadeInPlay();
    }
  }, [isPlaying, fadeOutPause, fadeInPlay]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isMuted) {
      fadeAudioTo(0, 280, () => {
        audio.muted = true;
        setIsMuted(true);
      });
    } else {
      audio.muted = false;
      setIsMuted(false);
      fadeAudioTo(targetVolumeRef.current, 380);
    }
  }, [isMuted, fadeAudioTo]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextVolume = parseFloat(e.target.value);
      cancelFade();
      setVolume(nextVolume);
      targetVolumeRef.current = nextVolume;

      if (audioRef.current) {
        audioRef.current.volume = nextVolume;
        if (nextVolume > 0 && isMuted) {
          audioRef.current.muted = false;
          setIsMuted(false);
        }
      }
      try {
        localStorage.setItem(VOLUME_STORAGE_KEY, String(nextVolume));
      } catch {
        // ignore
      }
    },
    [cancelFade, isMuted]
  );

  const handleSeekChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextTime = parseFloat(e.target.value);
      setCurrentTime(nextTime);
      if (audioRef.current) {
        audioRef.current.currentTime = nextTime;
      }
    },
    []
  );

  const formatTime = useCallback((sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }, []);

  const barProps: BarUIProps = {
    isPlaying,
    isMuted,
    volume,
    blockedByBrowser,
    currentTime,
    duration,
    onTogglePlayPause: togglePlayPause,
    onToggleMute: toggleMute,
    onVolumeChange: handleVolumeChange,
    onSeekChange: handleSeekChange,
    formatTime,
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="mb-12">
        <BarUI {...barProps} />
      </div>
      {repriseMountNode &&
        ReactDOMPortal(<BarUI {...barProps} />, repriseMountNode)}
    </>
  );
}

import { createPortal as ReactDOMPortal } from "react-dom";
