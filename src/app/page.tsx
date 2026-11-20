"use client";

import React, { useState } from "react";
import { memoirData, type PhotoAsset } from "@/data/memoir";
import { TopEditorialBar } from "@/components/TopEditorialBar";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { ChapterSection } from "@/components/ChapterSection";
import { ConclusionSection } from "@/components/ConclusionSection";
import { LightboxModal } from "@/components/LightboxModal";

export default function MemoirPage() {
  const [expandedPhoto, setExpandedPhoto] = useState<PhotoAsset | null>(null);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)]">
      <TopEditorialBar />

      <main>
        <HeroSection
          data={memoirData}
          onExpandPhoto={setExpandedPhoto}
        />

        <IntroductionSection
          introduction={memoirData.introduction}
          chapters={memoirData.chapters}
        />

        {memoirData.chapters.map((chapter) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            onExpandPhoto={setExpandedPhoto}
          />
        ))}

        <ConclusionSection
          conclusion={memoirData.conclusion}
          meta={memoirData.meta}
          onExpandPhoto={setExpandedPhoto}
        />
      </main>

      <footer className="border-t border-[var(--border-subtle)] px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--fg-muted)]">
          <span>
            Edit all text &amp; media paths in{" "}
            <code className="text-[var(--fg-primary)]">src/data/memoir.ts</code>
          </span>
          <span>
            Assets: <code className="text-[var(--fg-primary)]">public/images/</code> ·{" "}
            <code className="text-[var(--fg-primary)]">public/videos/</code> ·{" "}
            <code className="text-[var(--fg-primary)]">public/audio/</code>
          </span>
        </div>
      </footer>

      <LightboxModal
        photo={expandedPhoto}
        onClose={() => setExpandedPhoto(null)}
      />
    </div>
  );
}
