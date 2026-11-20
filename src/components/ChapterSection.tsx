"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ChapterData, PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";
import { VideoPlayerBlock } from "./VideoPlayerBlock";
import { AudioClipBar } from "./AudioClipBar";

interface ChapterSectionProps {
  chapter: ChapterData;
  onExpandPhoto: (photo: PhotoAsset) => void;
}

export function ChapterSection({
  chapter,
  onExpandPhoto,
}: ChapterSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  const revealDuration =
    chapter.tempo === "contemplative"
      ? 1.05
      : chapter.tempo === "energetic"
      ? 0.55
      : 0.8;

  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "next" ? width : -width,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const sectionPadding =
    chapter.tempo === "contemplative"
      ? "py-24 sm:py-32"
      : "py-20 sm:py-24";

  const hasGallery = chapter.gallery.length > 0;

  return (
    <section
      id={chapter.id}
      className={`w-full border-b border-[var(--border-subtle)] px-4 sm:px-8 ${sectionPadding}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Chapter Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: revealDuration, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline border-b border-[var(--border-strong)] pb-8"
        >
          <div className="lg:col-span-7">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.025em] text-[var(--fg-primary)]">
              <span className="font-mono text-base sm:text-lg uppercase tracking-widest text-[var(--accent)] mr-4 align-middle tabular-nums">
                {chapter.number}
              </span>
              {chapter.title}
            </h2>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <p className="font-serif text-xl sm:text-2xl italic text-[var(--fg-secondary)]">
              {chapter.themeStatement}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
              Event: {chapter.eventSummary} · Focus: {chapter.emotionalFocus}
            </p>
          </div>
        </motion.div>

        {/* Opening Full-Width Photograph */}
        {chapter.openingPhoto && (
          <div className="mt-10 sm:mt-14">
            <PhotoFrame
              photo={chapter.openingPhoto}
              onExpand={onExpandPhoto}
              parallax
            />
          </div>
        )}

        {/* Optional Audio Bar */}
        {chapter.audio && (
          <div className="mx-auto max-w-4xl mt-10">
            <AudioClipBar audio={chapter.audio} />
          </div>
        )}

        {/* Opening Written Narrative */}
        {chapter.openingParagraphs.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: revealDuration, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl mt-12 sm:mt-16"
          >
            <div className="space-y-6 editorial-measure text-base sm:text-lg leading-[1.8] text-[var(--fg-primary)]">
              {chapter.openingParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reflective Quotation 1 */}
        {chapter.pullQuotes && chapter.pullQuotes[0] && (
          <blockquote className="mx-auto max-w-4xl my-16 sm:my-24 border-y border-[var(--border-subtle)] py-10 sm:py-14 text-center">
            <p className="font-serif text-2xl sm:text-4xl italic leading-snug text-[var(--fg-primary)]">
              &ldquo;{chapter.pullQuotes[0]}&rdquo;
            </p>
          </blockquote>
        )}

        {/* GALLERY TYPE 1: Asymmetrical Mixed-Size Editorial Gallery */}
        {hasGallery && chapter.galleryType === "asymmetrical" && (
          <div className="my-16 sm:my-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            {chapter.gallery[0] && (
              <div className="lg:col-span-7">
                <PhotoFrame
                  photo={chapter.gallery[0]}
                  onExpand={onExpandPhoto}
                />
              </div>
            )}
            {chapter.gallery[1] && (
              <div className="lg:col-span-5 lg:mt-14">
                <PhotoFrame
                  photo={chapter.gallery[1]}
                  onExpand={onExpandPhoto}
                />
              </div>
            )}
            {chapter.gallery[2] && (
              <div className="lg:col-span-5">
                <PhotoFrame
                  photo={chapter.gallery[2]}
                  onExpand={onExpandPhoto}
                />
              </div>
            )}
            {chapter.gallery[3] && (
              <div className="lg:col-span-7 lg:mt-8">
                <PhotoFrame
                  photo={chapter.gallery[3]}
                  onExpand={onExpandPhoto}
                />
              </div>
            )}
          </div>
        )}

        {/* GALLERY TYPE 2: Horizontal Photo Gallery / Carousel */}
        {hasGallery && chapter.galleryType === "horizontal-carousel" && (
          <div className="my-16 sm:my-20">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl text-[var(--fg-primary)]">
                  River Sequence — Horizontal Filmstrip
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                  Scroll horizontally or use controls · Click any frame to expand
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel("prev")}
                  aria-label="Scroll gallery left"
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("next")}
                  aria-label="Scroll gallery right"
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-strong)] text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--bg-primary)] transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 sm:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory"
            >
              {chapter.gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="w-[85vw] sm:w-[540px] lg:w-[620px] shrink-0 snap-start"
                >
                  <PhotoFrame
                    photo={photo}
                    onExpand={onExpandPhoto}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY TYPE 3: Spacious Landscape Plates */}
        {hasGallery && chapter.galleryType === "spacious-landscape" && (
          <div className="my-16 sm:my-24 space-y-16 sm:space-y-24">
            {chapter.gallery[0] && (
              <PhotoFrame
                photo={chapter.gallery[0]}
                onExpand={onExpandPhoto}
                parallax
              />
            )}
          </div>
        )}

        {/* Mid Narrative Section */}
        {chapter.midParagraphs.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: revealDuration, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl my-12 sm:my-16"
          >
            <div className="space-y-6 editorial-measure text-base sm:text-lg leading-[1.8] text-[var(--fg-primary)]">
              {chapter.midParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Second Landscape Plate */}
        {hasGallery && chapter.galleryType === "spacious-landscape" && chapter.gallery[1] && (
          <div className="mx-auto max-w-5xl my-16 sm:my-24">
            <PhotoFrame
              photo={chapter.gallery[1]}
              onExpand={onExpandPhoto}
            />
          </div>
        )}

        {chapter.pullQuotes && chapter.pullQuotes[1] && (
          <blockquote className="mx-auto max-w-4xl my-16 sm:my-20 border-y border-[var(--border-subtle)] py-10 text-center">
            <p className="font-serif text-2xl sm:text-3xl italic leading-snug text-[var(--fg-secondary)]">
              &ldquo;{chapter.pullQuotes[1]}&rdquo;
            </p>
          </blockquote>
        )}

        {/* Optional Embedded Chapter Video */}
        {chapter.video && (
          <div className="mx-auto max-w-5xl">
            <VideoPlayerBlock video={chapter.video} />
          </div>
        )}

        {/* Closing Chapter Narrative */}
        {chapter.closingParagraphs.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: revealDuration, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl mt-12 sm:mt-16"
          >
            <div className="space-y-6 editorial-measure text-base sm:text-lg leading-[1.8] text-[var(--fg-primary)]">
              {chapter.closingParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
