"use client";

import React from "react";
import { memoirData } from "@/data/memoir";

export default function MemoirPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] flex items-center justify-center px-6">
      <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.96] tracking-[-0.025em] text-[var(--fg-primary)] text-center">
        {memoirData.meta.title}
      </h1>
    </div>
  );
}
