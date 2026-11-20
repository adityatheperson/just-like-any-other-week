"use client";

import React, { useState } from "react";
import { memoirData, type PhotoAsset } from "@/data/memoir";
import { TopEditorialBar } from "@/components/TopEditorialBar";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
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

        <IntroductionSection introduction={memoirData.introduction} />
      </main>

      <LightboxModal
        photo={expandedPhoto}
        onClose={() => setExpandedPhoto(null)}
      />
    </div>
  );
}
