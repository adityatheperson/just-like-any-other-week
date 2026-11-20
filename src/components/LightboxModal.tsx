"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera } from "lucide-react";
import type { PhotoAsset } from "@/data/memoir";

interface LightboxModalProps {
  photo: PhotoAsset | null;
  onClose: () => void;
}

export function LightboxModal({ photo, onClose }: LightboxModalProps) {
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#121110]/95 p-4 sm:p-10 text-[#F5F2EB]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl border border-[#F5F2EB]/20 bg-[#181715] p-6 sm:p-10"
          >
            <div className="flex items-center justify-between border-b border-[#F5F2EB]/15 pb-4">
              <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#B8B2A6]">
                <Camera className="h-4 w-4" strokeWidth={1.5} />
                <span>{photo.label}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close expanded photograph view"
                className="inline-flex items-center gap-1.5 border border-[#F5F2EB]/25 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[#F5F2EB] hover:bg-[#F5F2EB] hover:text-[#141412] transition-colors"
              >
                <span>Close</span>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="my-8 min-h-[260px] sm:min-h-[380px] flex flex-col justify-center border border-[#F5F2EB]/10 bg-[#121110] p-6 sm:p-12">
              <p className="font-mono text-xs uppercase tracking-widest text-[#B8B2A6]">
                Full-Frame Plate Inspection · {photo.aspect}
              </p>
              <p className="mt-4 font-serif text-2xl sm:text-3xl italic leading-snug text-[#F5F2EB]">
                {photo.expectedContent}
              </p>
              <p className="mt-4 font-mono text-xs text-[#B8B2A6]">
                Asset path: <code className="underline underline-offset-4">{photo.src}</code>
              </p>
            </div>

            {photo.caption && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#F5F2EB]/15 pt-4 text-sm text-[#D6D0C4]">
                <span>{photo.caption}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#9E988C]">
                  Press ESC to close
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
