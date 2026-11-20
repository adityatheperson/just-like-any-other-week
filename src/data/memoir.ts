export interface PhotoAsset {
  id: string;
  src: string;
  alt: string;
  label: string;
  expectedContent: string;
  caption?: string;
  aspect: "wide" | "portrait" | "square" | "cinematic" | "panoramic";
  size?: "large" | "medium" | "small" | "full";
}

export interface VideoAsset {
  id: string;
  src: string;
  poster: string;
  label: string;
  expectedContent: string;
  caption?: string;
  mutedLoop?: boolean;
}

export interface AudioAsset {
  id: string;
  src: string;
  title: string;
  durationLabel: string;
  expectedContent: string;
}

export interface ChapterData {
  id: string;
  number: string;
  title: string;
  eventSummary: string;
  emotionalFocus: string;
  themeStatement: string;
  tempo: "warm" | "energetic" | "contemplative";
  openingPhoto: PhotoAsset;
  openingParagraphs: string[];
  midParagraphs: string[];
  closingParagraphs: string[];
  pullQuotes?: string[];
  galleryType: "asymmetrical" | "horizontal-carousel" | "spacious-landscape";
  gallery: PhotoAsset[];
  video?: VideoAsset;
  audio?: AudioAsset;
}

export interface MemoirContent {
  meta: {
    title: string;
    subtitle: string;
    locationAndDate: string;
    themeTitle: string;
    wordCountTarget: string;
  };
  hero: {
    photo: PhotoAsset;
    backgroundVideo?: VideoAsset;
    scrollPrompt: string;
  };
  introduction: {
    heading: string;
    epigraph: string;
    paragraphs: string[];
  };
  chapters: [ChapterData, ChapterData, ChapterData];
  conclusion: {
    number: string;
    title: string;
    subtitle: string;
    groupPhoto: PhotoAsset;
    paragraphs: string[];
    finalSignoff: string;
  };
}

/**
 * CENTRALIZED MEMOIR DATA
 * -----------------------
 * Edit your memoir text, captions, and asset paths directly in this file.
 * All paragraphs below are non-fabricated structural placeholders indicating
 * where your ~2,000 words of personal narrative belong.
 */
export const memoirData: MemoirContent = {
  meta: {
    title: "Just Like Any Other Week",
    subtitle: "A Senior Trip Memoir",
    locationAndDate: "Lake Tahoe · Summer 2026",
    themeTitle: "The Illusion of Permanence",
    wordCountTarget: "~2,000 words total across Introduction, 3 Chapters, and Conclusion",
  },

  hero: {
    photo: {
      id: "hero-photo",
      src: "/images/hero-lake-tahoe.jpg",
      alt: "Placeholder for opening full-screen photograph of Lake Tahoe",
      label: "HERO PHOTOGRAPH PLACEHOLDER · public/images/hero-lake-tahoe.jpg",
      expectedContent:
        "Replace with your full-screen opening photograph of Lake Tahoe or an arrival frame from the trip that establishes a nostalgic, personal atmosphere.",
      caption: "Lake Tahoe, Summer 2026 — Replace with your opening caption or leave blank.",
      aspect: "cinematic",
      size: "full",
    },
    backgroundVideo: {
      id: "hero-video",
      src: "/videos/hero-loop.mp4",
      poster: "/images/hero-lake-tahoe.jpg",
      label: "OPTIONAL HERO LOOPING VIDEO · public/videos/hero-loop.mp4",
      expectedContent:
        "Optional muted looping ambient clip (water, trees, or afternoon light at the lake). Set mutedLoop to true when your file is added.",
      mutedLoop: true,
    },
    scrollPrompt: "Begin Reading",
  },

  introduction: {
    heading: "Prologue — Before Everything Changed",
    epigraph:
      "During the summer before college, ten of my closest friends and I spent a week together at Lake Tahoe.",
    paragraphs: [
      "[Introduction — Paragraph 1 (~120–150 words): Introduce the setting and the people. Describe arriving at Lake Tahoe with ten of your closest friends during the summer before college, and establish how long you had known one another.]",
      "[Introduction — Paragraph 2 (~120–150 words): Introduce the central tension of the memoir — 'The Illusion of Permanence.' Explain how, even though everyone knew you were weeks away from leaving for different colleges, the week itself felt completely ordinary, as though your routines, inside jokes, and daily proximity would continue indefinitely.]",
      "[Introduction — Paragraph 3 (~80–120 words): Foreshadow the three moments that anchor this piece — the surprise birthday party, white water rafting, and the hike — and how each reflects a different way you experienced time during that week.]",
    ],
  },

  chapters: [
    {
      id: "familiarity",
      number: "01",
      title: "Familiarity",
      eventSummary: "A surprise birthday party for one of my friends during the trip.",
      emotionalFocus: "Familiarity and comfort",
      themeStatement:
        "When people have been part of our lives for years, we naturally assume they always will be.",
      tempo: "warm",
      openingPhoto: {
        id: "ch1-opening",
        src: "/images/ch1-birthday-opening.jpg",
        alt: "Placeholder for Chapter 1 opening photograph of the surprise birthday party",
        label: "CHAPTER 01 OPENING PHOTOGRAPH · public/images/ch1-birthday-opening.jpg",
        expectedContent:
          "Replace with a large, warm opening photograph from the surprise birthday celebration.",
        caption: "[Optional caption for the opening birthday photograph]",
        aspect: "cinematic",
        size: "full",
      },
      openingParagraphs: [
        "[Chapter 1 — Opening Narrative, Paragraph 1 (~150 words): Set the scene for planning and setting up the surprise birthday party during the trip. Focus on the ease and shorthand between friends who have celebrated years of milestones together.]",
        "[Chapter 1 — Opening Narrative, Paragraph 2 (~150 words): Describe the moment of the surprise and how natural the evening felt. Emphasize the sense of comfort and familiarity in the room rather than any awareness of impending goodbyes.]",
      ],
      midParagraphs: [
        "[Chapter 1 — Mid Narrative, Paragraph 3 (~150 words): Reflect on the small habits, familiar dynamics, and shared history that showed up during the party. Connect those details to the chapter theme: when people have been part of our lives for years, we naturally assume they always will be.]",
      ],
      closingParagraphs: [
        "[Chapter 1 — Closing Narrative, Paragraph 4 (~100–130 words): Close the scene later that night, underscoring how the celebration reinforced the feeling that this group and this rhythm were permanent.]",
      ],
      galleryType: "asymmetrical",
      gallery: [
        {
          id: "ch1-gal-1",
          src: "/images/ch1-gallery-1.jpg",
          alt: "Placeholder for birthday celebration photograph 1",
          label: "PHOTO PLACEHOLDER 01A · public/images/ch1-gallery-1.jpg",
          expectedContent: "Large editorial frame — preparation or candid moment before the surprise.",
          caption: "[Optional caption — e.g., setting up in the kitchen before they walked in]",
          aspect: "wide",
          size: "large",
        },
        {
          id: "ch1-gal-2",
          src: "/images/ch1-gallery-2.jpg",
          alt: "Placeholder for birthday celebration photograph 2",
          label: "PHOTO PLACEHOLDER 01B · public/images/ch1-gallery-2.jpg",
          expectedContent: "Vertical portrait frame — reaction or table detail.",
          caption: "[Optional caption — portrait or detail from the birthday evening]",
          aspect: "portrait",
          size: "medium",
        },
        {
          id: "ch1-gal-3",
          src: "/images/ch1-gallery-3.jpg",
          alt: "Placeholder for birthday celebration photograph 3",
          label: "PHOTO PLACEHOLDER 01C · public/images/ch1-gallery-3.jpg",
          expectedContent: "Square or medium frame — cake, candles, or group laughter.",
          caption: "[Optional caption — candid around the table]",
          aspect: "square",
          size: "small",
        },
        {
          id: "ch1-gal-4",
          src: "/images/ch1-gallery-4.jpg",
          alt: "Placeholder for birthday celebration photograph 4",
          label: "PHOTO PLACEHOLDER 01D · public/images/ch1-gallery-4.jpg",
          expectedContent: "Wide closing frame from later in the evening.",
          caption: "[Optional caption — late evening conversation]",
          aspect: "wide",
          size: "medium",
        },
      ],
      video: {
        id: "ch1-video",
        src: "/videos/ch1-birthday.mp4",
        poster: "/images/ch1-birthday-opening.jpg",
        label: "OPTIONAL EMBEDDED BIRTHDAY VIDEO · public/videos/ch1-birthday.mp4",
        expectedContent:
          "Replace with your short video clip from the surprise birthday party (standard playback controls, no autoplay).",
        caption: "[Optional caption for the birthday video clip]",
      },
    },

    {
      id: "the-present",
      number: "02",
      title: "The Present",
      eventSummary: "White water rafting with my friends.",
      emotionalFocus: "Excitement and being completely absorbed in the moment",
      themeStatement:
        "When we're fully engaged in the present, the future can feel distant.",
      tempo: "energetic",
      openingPhoto: {
        id: "ch2-opening",
        src: "/images/ch2-rafting-opening.jpg",
        alt: "Placeholder for Chapter 2 full-width white water rafting photograph",
        label: "CHAPTER 02 FULL-WIDTH RAFTING PHOTOGRAPH · public/images/ch2-rafting-opening.jpg",
        expectedContent:
          "Replace with a dramatic full-width action photograph or video still from white water rafting.",
        caption: "[Optional caption for the opening white water rafting photograph]",
        aspect: "panoramic",
        size: "full",
      },
      openingParagraphs: [
        "[Chapter 2 — Opening Narrative, Paragraph 1 (~150 words): Shift the pace and energy. Describe arriving at the river, gearing up, and pushing off into the current with your friends.]",
        "[Chapter 2 — Opening Narrative, Paragraph 2 (~150 words): Capture the physical immediacy of the water, the movement of the raft, and the shared adrenaline that pulls everyone completely into the exact second in front of them.]",
      ],
      midParagraphs: [
        "[Chapter 2 — Interleaved Narrative, Paragraph 3 (~150 words): Placed between the visual elements. Contrast this total immersion in the present with the looming transition after the summer — explain how action and excitement make the future feel abstract and far away.]",
      ],
      closingParagraphs: [
        "[Chapter 2 — Closing Narrative, Paragraph 4 (~100–130 words): Describe the calm stretch of river afterward, drying off in the sun, and how being absorbed in the moment suspended any thought of August or college move-in dates.]",
      ],
      galleryType: "horizontal-carousel",
      gallery: [
        {
          id: "ch2-gal-1",
          src: "/images/ch2-carousel-1.jpg",
          alt: "Placeholder for rafting sequence photograph 1",
          label: "RAFTING SEQUENCE 02A · public/images/ch2-carousel-1.jpg",
          expectedContent: "Frame 1 of horizontal sequence — launching or early rapids.",
          caption: "[Optional caption — pushing off from the riverbank]",
          aspect: "wide",
          size: "large",
        },
        {
          id: "ch2-gal-2",
          src: "/images/ch2-carousel-2.jpg",
          alt: "Placeholder for rafting sequence photograph 2",
          label: "RAFTING SEQUENCE 02B · public/images/ch2-carousel-2.jpg",
          expectedContent: "Frame 2 of horizontal sequence — mid-rapid spray and paddling.",
          caption: "[Optional caption — mid-rapid sequence]",
          aspect: "cinematic",
          size: "large",
        },
        {
          id: "ch2-gal-3",
          src: "/images/ch2-carousel-3.jpg",
          alt: "Placeholder for rafting sequence photograph 3",
          label: "RAFTING SEQUENCE 02C · public/images/ch2-carousel-3.jpg",
          expectedContent: "Frame 3 of horizontal sequence — calm water between rapids.",
          caption: "[Optional caption — floating between stretches of white water]",
          aspect: "wide",
          size: "medium",
        },
        {
          id: "ch2-gal-4",
          src: "/images/ch2-carousel-4.jpg",
          alt: "Placeholder for rafting sequence photograph 4",
          label: "RAFTING SEQUENCE 02D · public/images/ch2-carousel-4.jpg",
          expectedContent: "Frame 4 of horizontal sequence — pulling the rafts ashore.",
          caption: "[Optional caption — back on shore at the end of the run]",
          aspect: "portrait",
          size: "medium",
        },
      ],
      video: {
        id: "ch2-video",
        src: "/videos/ch2-rafting.mp4",
        poster: "/images/ch2-rafting-opening.jpg",
        label: "OPTIONAL RAFTING VIDEO · public/videos/ch2-rafting.mp4",
        expectedContent:
          "Optional inline video clip from the river run. Can also be swapped into the chapter opening.",
        caption: "[Optional caption for the rafting footage]",
      },
      audio: {
        id: "ch2-audio",
        src: "/audio/ch2-river-ambient.mp3",
        title: "Field Recording — River Current & Rafting Audio",
        durationLabel: "00:45 · public/audio/ch2-river-ambient.mp3",
        expectedContent:
          "Optional ambient audio clip from the rafting experience (rush of water, paddles, voices on the river). Never auto-plays.",
      },
    },

    {
      id: "perspective",
      number: "03",
      title: "Perspective",
      eventSummary: "A hike during our Tahoe trip.",
      emotionalFocus: "Reflection and perspective",
      themeStatement:
        "Sometimes we only recognize the significance of an experience after it has passed.",
      tempo: "contemplative",
      openingPhoto: {
        id: "ch3-opening",
        src: "/images/ch3-hike-opening.jpg",
        alt: "Placeholder for Chapter 3 full-width Tahoe hike landscape photograph",
        label: "CHAPTER 03 FULL-WIDTH LANDSCAPE · public/images/ch3-hike-opening.jpg",
        expectedContent:
          "Replace with a spacious, wide-horizon landscape photograph from the Tahoe hike.",
        caption: "[Optional caption for the opening hike landscape]",
        aspect: "panoramic",
        size: "full",
      },
      openingParagraphs: [
        "[Chapter 3 — Opening Narrative, Paragraph 1 (~150 words): Slow the rhythm of the prose. Describe the trail, the elevation, and the quieter atmosphere of the hike compared to the rest of the trip.]",
        "[Chapter 3 — Opening Narrative, Paragraph 2 (~150 words): Describe walking in smaller clusters or moments of silence along the ridge, looking out over Lake Tahoe from above.]",
      ],
      midParagraphs: [
        "[Chapter 3 — Reflective Narrative, Paragraph 3 (~150 words): Connect the physical altitude and distance of the overlook to emotional perspective. Explore how, even while standing at the viewpoint, you still treated the afternoon like any ordinary day with your friends.]",
      ],
      closingParagraphs: [
        "[Chapter 3 — Closing Narrative, Paragraph 4 (~130 words): Articulate the chapter's realization — that we rarely feel a chapter of our lives ending while we are still inside it, and often only recognize its weight in retrospect.]",
      ],
      pullQuotes: [
        "[Reflective Quotation 1 — Replace with a short sentence from your essay capturing the stillness of the hike or the view over the lake.]",
        "[Reflective Quotation 2 — Replace with a second reflective line on how significance often arrives only after the moment has passed.]",
      ],
      galleryType: "spacious-landscape",
      gallery: [
        {
          id: "ch3-gal-1",
          src: "/images/ch3-hike-2.jpg",
          alt: "Placeholder for Tahoe trail landscape photograph",
          label: "LANDSCAPE PLATE 03A · public/images/ch3-hike-2.jpg",
          expectedContent: "Spacious full- or wide-bleed photograph along the hiking trail.",
          caption: "[Optional caption — along the ridge above the water]",
          aspect: "panoramic",
          size: "full",
        },
        {
          id: "ch3-gal-2",
          src: "/images/ch3-hike-3.jpg",
          alt: "Placeholder for Tahoe overlook landscape photograph",
          label: "LANDSCAPE PLATE 03B · public/images/ch3-hike-3.jpg",
          expectedContent: "Contemplative frame of friends looking out over the basin or descending at dusk.",
          caption: "[Optional caption — looking back toward the lake before the descent]",
          aspect: "cinematic",
          size: "large",
        },
      ],
      video: {
        id: "ch3-video",
        src: "/videos/ch3-hike.mp4",
        poster: "/images/ch3-hike-opening.jpg",
        label: "OPTIONAL HIKING FOOTAGE · public/videos/ch3-hike.mp4",
        expectedContent:
          "Optional quiet, slow footage from the trail or summit viewpoint.",
        caption: "[Optional caption for the hiking video clip]",
      },
      audio: {
        id: "ch3-audio",
        src: "/audio/ch3-trail-wind.mp3",
        title: "Field Recording — Pine Wind & Trail Footsteps",
        durationLabel: "00:38 · public/audio/ch3-trail-wind.mp3",
        expectedContent:
          "Optional natural audio from the hike (wind through pines, gravel footsteps, quiet ambient air).",
      },
    },
  ],

  conclusion: {
    number: "Epilogue",
    title: "The Illusion of Permanence",
    subtitle: "Looking Back on Lake Tahoe",
    groupPhoto: {
      id: "conclusion-group-photo",
      src: "/images/conclusion-group.jpg",
      alt: "Placeholder for final group photograph of all eleven friends at Lake Tahoe",
      label: "CLOSING GROUP PHOTOGRAPH · public/images/conclusion-group.jpg",
      expectedContent:
        "Replace with a large group photograph of you and your ten friends from the trip.",
      caption: "[Optional caption — e.g., names, location, or date of the group photograph]",
      aspect: "cinematic",
      size: "full",
    },
    paragraphs: [
      "[Conclusion — Paragraph 1 (~130–160 words): Return to the end of the week — packing up the cars, driving out of Tahoe, and how understated the goodbye was because nobody believed anything was truly changing.]",
      "[Conclusion — Paragraph 2 (~130–160 words): Reflect from your current vantage point in college. Avoid overly dramatic sentimentality; instead, let the contrast emerge naturally — how a week sitting right on the edge of a major life transition felt, at the time, just like any other week.]",
    ],
    finalSignoff: "Just Like Any Other Week",
  },
};
