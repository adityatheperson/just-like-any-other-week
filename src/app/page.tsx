"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { memoirData, type PhotoAsset } from "@/data/memoir";
import { TopEditorialBar } from "@/components/TopEditorialBar";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { QuestionsSection } from "@/components/QuestionsSection";
import { LightboxModal } from "@/components/LightboxModal";

type PageView = "landing" | "reading" | "questions";

export default function MemoirPage() {
  const [view, setView] = useState<PageView>("landing");
  const [expandedPhoto, setExpandedPhoto] = useState<PhotoAsset | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)]">
      <TopEditorialBar
        showBackButton={view !== "landing"}
        isQuestionsView={view === "questions"}
        onReturnHome={() => {
          setView("landing");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenQuestions={() => {
          setView("questions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <main>
        <AnimatePresence mode="wait">
          {view === "landing" && (
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
                  setView("reading");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onExpandPhoto={setExpandedPhoto}
              />
            </motion.div>
          )}

          {view === "reading" && (
            <motion.div
              key="reading"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <IntroductionSection
                introduction={memoirData.introduction}
                onExpandPhoto={setExpandedPhoto}
              />
            </motion.div>
          )}

          {view === "questions" && (
            <motion.div
              key="questions"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <QuestionsSection />
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
