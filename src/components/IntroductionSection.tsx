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
      <div className="mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8 font-serif text-4xl sm:text-6xl leading-[1.02] tracking-[-0.025em] text-[var(--fg-primary)]">
            Just Like Any Other Week
          </h1>

          {/* Isolated soundtrack component */}
          <SoundtrackBar
            stopTriggerRef={stopTriggerRef}
            repriseZoneRef={repriseZoneRef}
            repriseMountNode={repriseMountNode}
          />
        </div>

        <article>
          {/* SECTION 1: Morning Departure */}
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

          {/* Wide cinematic bleed out into the page margins */}
          {introduction.photo && (
            <div className="mt-12 sm:mt-14 -mx-2 sm:-mx-4 lg:-mx-10">
              <PhotoFrame
                photo={introduction.photo}
                showTitleBelow
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {/* SECTION 2: Romir's Surprise Birthday — Wrapped Editorial Spreads */}
          {introduction.afterPhotoParagraphs &&
            introduction.afterPhotoParagraphs.length > 0 && (
              <>
                <hr className="my-16 sm:my-20 max-w-3xl mx-auto border-0 border-t border-[var(--border-strong)]" />

                <div className="space-y-8 editorial-measure mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                  {introduction.afterPhotoParagraphs[0] && (
                    <p className="first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]">
                      {introduction.afterPhotoParagraphs[0]}
                    </p>
                  )}
                </div>

                {/* Editorial Wrap 1: Kitchen setup & Bear decoy text wrapped around Romir's cake portrait */}
                <div className="mt-10 clearfix max-w-3xl mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                  {introduction.secondPhoto && (
                    <div className="my-6 sm:my-2 sm:float-right sm:w-[46%] lg:w-[50%] sm:ml-8 lg:ml-10 sm:-mr-10 lg:-mr-20">
                      <PhotoFrame
                        photo={introduction.secondPhoto}
                        showTitleBelow
                        onExpand={(photo) => onExpandPhoto?.(photo)}
                      />
                    </div>
                  )}

                  {introduction.afterPhotoParagraphs[1] && (
                    <p className="mb-8">{introduction.afterPhotoParagraphs[1]}</p>
                  )}

                  {introduction.afterSecondPhotoParagraphs?.map(
                    (paragraph, idx) => (
                      <p key={idx} className="mb-8">
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </>
            )}

          {/* Editorial Spread 2: Apple Cider Portrait Video alongside Birthday Reflection & Group Photo */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {introduction.video && (
              <div className="md:col-span-5 max-w-[270px] sm:max-w-[300px] mx-auto w-full">
                <VideoPlayerBlock
                  video={introduction.video}
                  onPlay={pauseForVideo}
                />
              </div>
            )}

            <div className="md:col-span-7 space-y-8">
              {introduction.afterVideoParagraphs &&
                introduction.afterVideoParagraphs.length > 0 && (
                  <div className="space-y-6 text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
                    {introduction.afterVideoParagraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}

              {introduction.thirdPhoto && (
                <PhotoFrame
                  photo={introduction.thirdPhoto}
                  showTitleBelow
                  onExpand={(photo) => onExpandPhoto?.(photo)}
                />
              )}
            </div>
          </div>

          <hr className="my-16 sm:my-20 max-w-3xl mx-auto border-0 border-t border-[var(--border-strong)]" />

          {/* SECTION 3: White Water Rafting — Wrapped Instructor Photo & Split Video Spread */}
          <div className="clearfix max-w-3xl mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
            {introduction.raftingParagraphs?.[0] && (
              <p className="mb-10 first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl sm:first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[var(--accent)]">
                {introduction.raftingParagraphs[0]}
              </p>
            )}

            {/* Float the Instructor Photo to the left of the river commands & approaching rapid paragraphs */}
            {introduction.fourthPhoto && (
              <div className="my-6 sm:my-2 sm:float-left sm:w-[52%] lg:w-[56%] sm:mr-8 lg:mr-10 sm:-ml-10 lg:-ml-20">
                <PhotoFrame
                  photo={introduction.fourthPhoto}
                  showTitleBelow
                  onExpand={(photo) => onExpandPhoto?.(photo)}
                />
              </div>
            )}

            {introduction.afterFourthPhotoParagraphs?.map((paragraph, idx) => (
              <p key={idx} className="mb-8">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Full-bleed 14-frame capsize sequence */}
          {introduction.raftFlipConveyor &&
            introduction.raftFlipConveyor.length > 0 && (
              <PhotoConveyor
                photos={introduction.raftFlipConveyor}
                onExpandPhoto={onExpandPhoto}
              />
            )}

          {/* Side-by-side Spread: Post-capsize reflection next to Jumping Off a Rock portrait video */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-7 space-y-6 text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
              {introduction.afterConveyorParagraphs?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {introduction.secondVideo && (
              <div className="md:col-span-5 max-w-[260px] sm:max-w-[290px] mx-auto w-full">
                <VideoPlayerBlock
                  video={introduction.secondVideo}
                  onPlay={pauseForVideo}
                />
              </div>
            )}
          </div>

          <hr className="my-16 sm:my-20 max-w-3xl mx-auto border-0 border-t border-[var(--border-strong)]" />

          {/* SECTION 4: Yosemite Sentinel Dome Hike */}
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

          {/* Wide Sentinel Dome landscape plate extending into margins */}
          {introduction.fifthPhoto && (
            <div className="mt-10 sm:mt-12 -mx-2 sm:-mx-4 lg:-mx-10">
              <PhotoFrame
                photo={introduction.fifthPhoto}
                showTitleBelow
                onExpand={(photo) => onExpandPhoto?.(photo)}
              />
            </div>
          )}

          {/* Trail & Summit reflection wrapped around the Summit Group Portrait */}
          <div className="mt-12 sm:mt-14 clearfix max-w-3xl mx-auto text-[1.15rem] sm:text-[1.25rem] leading-[1.9] tracking-[-0.005em] text-[var(--fg-primary)]">
            {introduction.afterFifthPhotoParagraphs?.[0] && (
              <p className="mb-8">{introduction.afterFifthPhotoParagraphs[0]}</p>
            )}

            {introduction.sixthPhoto && (
              <div className="my-6 sm:my-2 sm:float-right sm:w-[46%] lg:w-[50%] sm:ml-8 lg:ml-10 sm:-mr-10 lg:-mr-20">
                <PhotoFrame
                  photo={introduction.sixthPhoto}
                  showTitleBelow
                  onExpand={(photo) => onExpandPhoto?.(photo)}
                />
              </div>
            )}

            {introduction.afterFifthPhotoParagraphs
              ?.slice(1)
              .map((paragraph, idx) => (
                <p key={idx} className="mb-8">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Closing Laufey Reprise & Wall Photo Reflection */}
          {introduction.closingParagraphs &&
            introduction.closingParagraphs.length > 0 && (
              <div
                ref={repriseZoneRef}
                className="mt-16 sm:mt-20 max-w-3xl mx-auto clear-both"
              >
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
