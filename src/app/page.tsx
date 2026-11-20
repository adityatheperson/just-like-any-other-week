"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { memoirData, type PhotoAsset } from "@/data/memoir";
import { TopEditorialBar } from "@/components/TopEditorialBar";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { LightboxModal } from "@/components/LightboxModal";

export default function MemoirPage() {
  const [hasBegunReading, setHasBegunReading] = useState(false);
  const [expandedPhoto, setExpandedPhoto] = useState<PhotoAsset | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)]">
      <TopEditorialBar onReturnHome={() => setHasBegunReading(false)} />

      <main>
        <AnimatePresence mode="wait">
          {!hasBegunReading ? (
            <motion.div
              key="landing"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSection
                data={memoirData}
                onBeginReading={() => {
                  setHasBegunReading(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onExpandPhoto={setExpandedPhoto}
              />
            </motion.div>
          ) : (
            <motion.div
              key="reading"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <IntroductionSection introduction={memoirData.introduction} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <LightboxModal
        photo={expandedPhoto}
        onClose={() => setExpandedPhoto(null)}
      />
    </div>
  );
}
