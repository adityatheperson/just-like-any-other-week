"use client";

import React from "react";

const questions = [
  "Do the birthday and rafting scenes effectively immerse you in the story? Where could I add more detail?",
  "How do the photos, videos, and interactive elements enhance or distract from the memoir?",
  "Is there a good balance between storytelling and personal reflection?",
  "How relatable is the memoir to young adults experiencing similar life transitions?",
  "Is my intended message clear? How could I make it more impactful?",
];

export function QuestionsSection() {
  return (
    <section className="w-full px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-10 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
          {questions.map((question, idx) => (
            <p key={idx}>{question}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
