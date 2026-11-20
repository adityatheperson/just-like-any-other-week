---
name: Just Like Any Other Week
description: A coming-of-age digital photo memoir from Lake Tahoe exploring the illusion of permanence across three switchable editorial editions.
colors:
  paper-cream: "#FAF8F3"
  paper-secondary: "#F2ECE1"
  paper-plate: "#EFE9DD"
  ink-charcoal: "#1C1A17"
  ink-secondary: "#4F4940"
  ink-muted: "#6E665B"
  sienna-accent: "#7A5438"
  darkroom-black: "#141412"
  darkroom-bone: "#F5F2EB"
  alpine-stone: "#F4F5F0"
  alpine-pine: "#3C5A52"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "5.5rem"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Source Sans 3, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "112px"
components:
  edition-switch-active:
    backgroundColor: "{colors.ink-charcoal}"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  audio-play-button:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.ink-charcoal}"
    rounded: "{rounded.none}"
    size: "36px"
---

# Design System: Just Like Any Other Week

## Overview

**Creative North Star: "The Three-Edition Photo Monograph"**

Just Like Any Other Week is designed as an intimate, long-scroll literary photo essay rather than a conventional web application. It treats personal memory with the quiet authority of a printed monograph, allowing the reader to experience the same narrative across three switchable visual editions: **A · Sun-Bleached Editorial** (warm daylight paper `#FAF8F3`), **B · Cinematic Darkroom** (a `#141412` charcoal film plate opening into warm paper chapters), and **C · Alpine Field Notes** (cool stone `#F4F5F0` and pine slate `#3C5A52` with panoramic horizons).

The interface deliberately refuses SaaS card grids, decorative gradients, rounded floating pills, and dashboard chrome. Structure comes from hairline rules, generous paper margins, contact-sheet figure indices, and tempo-paced scroll transitions that match each chapter's emotional state (warm in Chapter 01, energetic in Chapter 02, spacious and contemplative in Chapter 03).

**Key Characteristics:**
- Three live-switchable CSS custom-property editions (`data-edition="editorial" | "darkroom" | "alpine"`) sharing one centralized narrative schema (`src/data/memoir.ts`).
- Square-cornered (`0px` radius) photographic plates with honest, unfabricated architectural placeholders that automatically swap to live photos/video/audio once dropped into `public/`.
- Tempo-aware Motion reveals (`0.8s` warm, `0.55s` energetic, `1.05s` contemplative) with full `prefers-reduced-motion` compliance.

## Colors

The palette pairs sun-warmed paper neutrals and darkroom charcoal with muted earth and alpine accents.

### Primary
- **Sienna Earth Accent** (`#7A5438`): Used sparingly in Edition A for chapter indices, focus outlines, active audio indicators, and link hover states.
- **Alpine Pine Accent** (`#3C5A52`): Replaces Sienna in Edition C to evoke high-elevation granite and Tahoe pine needles.

### Neutral
- **Sun-Bleached Paper Cream** (`#FAF8F3`): Primary reading surface in Edition A.
- **Warm Sand Secondary** (`#F2ECE1`) & **Contact Plate Ground** (`#EFE9DD`): Tonal containers for placeholder plates and field-recording audio strips.
- **Darkroom Charcoal** (`#141412`) & **Silver-Gelatin Bone** (`#F5F2EB`): Full-bleed hero cinema ground and off-white display ink in Edition B, plus the full-frame inspection lightbox.
- **Alpine Stone** (`#F4F5F0`): Primary airy reading surface in Edition C.
- **Charcoal Ink** (`#1C1A17`), **Walnut Secondary Ink** (`#4F4940`), and **Muted Warm Gray** (`#6E665B`): High-contrast reading hierarchy across all daylight reading passages.

### Named Rules
**The Honest Plate Rule.** Photographic and video containers never display fabricated stock memories; until the author's real files exist in `public/`, plates render as warm tonal contact frames with technical crop lines and explicit file-path captions.

## Typography

**Display Font:** Instrument Serif (with Georgia fallback)
**Body Font:** Source Sans 3 (with system sans fallback)
**Label/Mono Font:** JetBrains Mono (with system monospace fallback)

**Character:** Tall, literary editorial serif headlines paired with an unpretentious humanist reading sans and crisp tabular-numeral monospace catalog labels.

### Hierarchy
- **Display** (400, `5.5rem` on desktop / `3rem` mobile, line-height `0.96`, tracking `-0.025em`): Hero memoir title.
- **Headline** (400, `3.75rem` to `4.5rem`, line-height `1.02`, tracking `-0.025em`): Chapter titles paired with inline tabular chapter numbers (`01`, `02`, `03`).
- **Title** (400 italic, `1.5rem` to `2.25rem`, line-height `1.3`): Epigraphs, theme statements, and Chapter 03 reflective pull-quotes.
- **Body** (400, `1.125rem` / `18px`, line-height `1.8`, max measure `66ch`): Long-form memoir prose paragraphs.
- **Label** (400/500, `0.75rem` / `12px`, letter-spacing `0.08em`, uppercase, `tabular-nums`): Figure numbers, file paths, audio durations, and edition switcher controls.

### Named Rules
**The 66-Character Measure Rule.** Long-form memoir paragraphs are constrained to `.editorial-measure` (`66ch`) inside a centered `max-w-3xl` column so the eye never loses its place across 2,000 words of narrative.

## Layout

The page is a single-column vertical monograph (`max-w-7xl` outer container for plates, `max-w-3xl` inner column for narrative prose) divided into five semantic landmarks: Hero (`#top`), Prologue (`#prologue`), Chapter 01 (`#familiarity`), Chapter 02 (`#the-present`), Chapter 03 (`#perspective`), and Epilogue (`#epilogue`).

Each chapter uses a distinct gallery topology matching its emotional theme:
- **Chapter 01 (Familiarity):** 12-column asymmetrical staggered editorial grid mixing wide (`4:3`), portrait (`4:5`), and square (`1:1`) frames.
- **Chapter 02 (The Present):** Horizontal snap-scrolling filmstrip carousel (`snap-x snap-mandatory`) interleaved with narrative prose.
- **Chapter 03 (Perspective):** Spacious panoramic (`21:9`) and cinematic (`16:9`) full-bleed plates separated by expanded vertical whitespace (`py-24 sm:py-36`) and centered pull-quotes.

## Elevation & Depth

This system is flat by default and uses tonal surface layering and `1px` hairline borders (`rgba(28, 26, 23, 0.14)`) instead of drop shadows.

### Named Rules
**The Hairline-And-Paper Rule.** Depth is communicated through paper tone steps (`--bg-primary` → `--bg-secondary` → `--plate-bg`) and crisp `1px` borders, never soft card drop shadows or blurred glass panels.

## Shapes

All photographic plates, video frames, audio bars, and edition buttons use crisp `0px` right-angle corners, echoing trimmed photographic prints and book layouts.

## Components

### Buttons & Edition Switcher
- **Shape:** Crisp rectangular (`0px` radius) with `1px` structural borders.
- **Primary / Active Edition:** Charcoal fill (`#1C1A17`) with paper cream text (`#FAF8F3`), uppercase monospace `11px` tracking `0.08em`.
- **Hover / Focus:** Inverts foreground and background on hover; `2px solid var(--accent)` focus ring with `3px` offset.

### Photographic Plates (`PhotoFrame`)
- **Corner Style:** `0px` square edges with `1px` border (`var(--border-subtle)`).
- **Aspect Ratios:** `cinematic` (`16:9`), `panoramic` (`21:9`), `wide` (`4:3`), `portrait` (`4:5`), and `square` (`1:1`).
- **Behavior:** Subtle scroll parallax (`-4%` to `4%`) when enabled, automatic swap from editorial placeholder to `<img>` on load, and click/keyboard Enter to open the `LightboxModal`.

### Field-Recording Audio Strip (`AudioClipBar`)
- **Style:** Full-width horizontal strip bounded by top and bottom `1px` strong rules (`var(--border-strong)`) over `var(--bg-secondary)`.
- **Behavior:** Manual play/pause button (`36px × 36px`), title, expected content description, tabular duration badge, and clear status feedback when the placeholder MP3 is not yet present. Never autoplays.

### Navigation (`TopEditorialBar`)
- **Style:** Sticky top bar (`z-40`) with memoir title anchor on the left, chapter anchor links in uppercase monospace in the center (and horizontal scroll row on mobile), and the `A / B / C` edition switcher on the right.

## Do's and Don'ts

### Do:
- **Do** keep all written narrative, captions, and file paths centralized in `src/data/memoir.ts`.
- **Do** preserve `0px` print-plate corners and `1px` hairline dividers across all media frames.
- **Do** respect `prefers-reduced-motion` on all scroll reveals, parallax transforms, and carousel scrolling.

### Don't:
- **Don't** insert fabricated personal photographs, stock people, or invented dialogue into the memoir.
- **Don't** wrap paragraphs or photos in rounded, shadowed SaaS cards.
- **Don't** enable autoplay with sound on any video or audio clip.
