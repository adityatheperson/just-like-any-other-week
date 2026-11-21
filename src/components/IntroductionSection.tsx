"use client";

import React, { useRef, useState } from "react";
import type { MemoirContent, PhotoAsset } from "@/data/memoir";
import { PhotoFrame } from "./PhotoFrame";
import { VideoPlayerBlock } from "./VideoPlayerBlock";
import { PhotoConveyor } from "./PhotoConveyor";
import { SoundtrackBar } from "./SoundtrackBar";

interface IntroductionSectionProps {
  introduction: MemoirContent["introduction"];
  onExpandPhoto?: (photo: PhotoAsset) => void;
}

const pauseForVideo = () => {
  window.dispatchEvent(new CustomEvent("memoir:video-play"));
};

export function IntroductionSection({
  introduction,
  onExpandPhoto,
}: IntroductionSectionProps) {
  const stopTriggerRef = useRef<HTMLParagraphElement>(null);
  const repriseZoneRef = useRef<HTMLDivElement>(null);
  const [repriseMountNode, setRepriseMountNode] = useState<HTMLElement | null>(
    null
  );

  return (
    <section id="prologue" className="w-full px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section Title */}
        <h1 className="mb-8 font-serif text-4xl sm:text-6xl leading-[1.02] tracking-[-0.025em] text-[var(--fg-primary)]">
          Just Like Any Other Week
        </h1>

        {/* Isolated soundtrack component: timer ticks only re-render the bars, never the article below */}
        <SoundtrackBar
          stopTriggerRef={stopTriggerRef}
          repriseZoneRef={repriseZoneRef}
          repriseMountNode={repriseMountNode}
        />

        <article>
          {introduction.paragraphs.length > 0 && (
            <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
              {introduction.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  ref={idx === 2 ? stopTriggerRef : undefined}
                  className={
                    idx === 0
                      ? "first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]"
                      : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {introduction.photo && (
            <div className="mt-14 sm:mt-16">
              <PhotoFrame
                photo={introduction.photo}
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {introduction.afterPhotoParagraphs &&
            introduction.afterPhotoParagraphs.length > 0 && (
              <>
                <hr className="my-14 sm:my-16 border-0 border-t border-[var(--border-strong)]" />
                <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                  {introduction.afterPhotoParagraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            )}

          {introduction.secondPhoto && (
            <div className="mt-12 sm:mt-14 max-w-md mx-auto">
              <PhotoFrame
                photo={introduction.secondPhoto}
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {introduction.afterSecondPhotoParagraphs &&
            introduction.afterSecondPhotoParagraphs.length > 0 && (
              <div className="mt-12 sm:mt-14 space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.afterSecondPhotoParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

          {introduction.video && (
            <VideoPlayerBlock
              video={introduction.video}
              onPlay={pauseForVideo}
            />
          )}

          {introduction.afterVideoParagraphs &&
            introduction.afterVideoParagraphs.length > 0 && (
              <div className="mt-12 sm:mt-14 space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.afterVideoParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

          {introduction.thirdPhoto && (
            <div className="mt-12 sm:mt-14">
              <PhotoFrame
                photo={introduction.thirdPhoto}
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          <hr className="my-14 sm:my-16 border-0 border-t border-[var(--border-strong)]" />

          {introduction.raftingParagraphs &&
            introduction.raftingParagraphs.length > 0 && (
              <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.raftingParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]"
                        : ""
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

          {introduction.fourthPhoto && (
            <div className="mt-12 sm:mt-14">
              <PhotoFrame
                photo={introduction.fourthPhoto}
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {introduction.afterFourthPhotoParagraphs &&
            introduction.afterFourthPhotoParagraphs.length > 0 && (
              <div className="mt-12 sm:mt-14 space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.afterFourthPhotoParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

          {introduction.raftFlipConveyor &&
            introduction.raftFlipConveyor.length > 0 && (
              <PhotoConveyor
                photos={introduction.raftFlipConveyor}
                onExpandPhoto={onExpandPhoto}
              />
            )}

          {introduction.afterConveyorParagraphs &&
            introduction.afterConveyorParagraphs.length > 0 && (
              <div className="mt-12 sm:mt-14 space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.afterConveyorParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

          {introduction.secondVideo && (
            <VideoPlayerBlock
              video={introduction.secondVideo}
              onPlay={pauseForVideo}
            />
          )}

          <hr className="my-14 sm:my-16 border-0 border-t border-[var(--border-strong)]" />

          {introduction.hikeParagraphs &&
            introduction.hikeParagraphs.length > 0 && (
              <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.hikeParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]"
                        : ""
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

          {introduction.fifthPhoto && (
            <div className="mt-12 sm:mt-14">
              <PhotoFrame
                photo={introduction.fifthPhoto}
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {introduction.afterFifthPhotoParagraphs &&
            introduction.afterFifthPhotoParagraphs.length > 0 && (
              <div className="mt-12 sm:mt-14 space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                {introduction.afterFifthPhotoParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

          {introduction.sixthPhoto && (
            <div className="mt-12 sm:mt-14 max-w-md mx-auto">
              <PhotoFrame
                photo={introduction.sixthPhoto}
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {introduction.closingParagraphs &&
            introduction.closingParagraphs.length > 0 && (
              <div ref={repriseZoneRef} className="mt-14 sm:mt-16">
                <div ref={setRepriseMountNode} className="mb-10" />

                <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                  {introduction.closingParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
        </article>
      </div>
    </section>
  );
}
