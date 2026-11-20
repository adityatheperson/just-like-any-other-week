# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js (App Router, TypeScript, static export for GitHub Pages), Tailwind CSS, Motion for React, Lucide React

## Users
College writing professor / classmates grading a digital photo memoir, and the author's friends revisiting a senior trip before leaving for college.

## Product Purpose
A long-scrolling, cinematic interactive memoir titled "Just Like Any Other Week" exploring the theme "The Illusion of Permanence" through three memories from a senior trip to Lake Tahoe with ten friends.

## Positioning
Contrasts the ordinary comfort of a week with longtime friends against the unstated reality that everyone is about to leave for different colleges, told across three emotional beats: Familiarity (birthday), The Present (rafting), and Perspective (hike).

## Operating Context
Read and experienced on desktop or mobile as a digital magazine / personal documentary, hosted statically on GitHub Pages.

## Capabilities and Constraints
- Single-page narrative with 5 sections: Hero + Intro, Chapter 1 (Familiarity), Chapter 2 (The Present), Chapter 3 (Perspective), Conclusion
- Centralized content in `src/data/memoir.ts` for ~2,000 words to be added later
- Placeholders only for photos, videos, and audio in `public/images/`, `public/videos/`, `public/audio/`
- No invented dialogue, fabricated personal photos, or unprovided events
- Three switchable visual themes (A: Sun-Bleached Editorial, B: Cinematic Darkroom, C: Alpine Field Notes)
- Click-to-expand image lightbox, inline video placeholders, unobtrusive audio player placeholders (no autoplay), reduced-motion support

## Brand Commitments
- Title: "Just Like Any Other Week"
- Subtitle: "A Senior Trip Memoir"
- Meta: "Lake Tahoe · Summer 2026"
- Palette: warm neutrals (off-white, cream, charcoal, muted earth tones)
- Typography: editorial serif headings, clean sans-serif body

## Evidence on Hand
No real photos, videos, audio, or final essay text provided yet; all media and paragraphs must be clearly labeled placeholders explaining what goes where.

## Product Principles
- Visual storytelling and reading comfort outrank UI chrome
- Restraint in motion: transitions serve the emotional pace of each chapter
- Zero friction for the author to swap placeholder text and media later
- Honest placeholders with no fabricated memories

## Accessibility & Inclusion
Respect `prefers-reduced-motion`, semantic landmarks, keyboard-closable lightbox, high contrast reading text.
