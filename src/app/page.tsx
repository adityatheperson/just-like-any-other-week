"use client";

import React from "react";
import { memoirData } from "@/data/memoir";
import { TopEditorialBar } from "@/components/TopEditorialBar";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";

export default function MemoirPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)]">
      <TopEditorialBar />

      <main>
        <HeroSection data={memoirData} />
        <IntroductionSection introduction={memoirData.introduction} />
      </main>
    </div>
  );
}
