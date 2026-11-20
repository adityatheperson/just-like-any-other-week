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
  openingPhoto?: PhotoAsset;
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
    photo?: PhotoAsset;
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
    groupPhoto?: PhotoAsset;
    paragraphs: string[];
    finalSignoff: string;
  };
}

/**
 * CENTRALIZED MEMOIR DATA
 * -----------------------
 * Edit your memoir text, captions, and asset paths directly in this file.
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
      alt: "placeholder test",
      label: "placeholder test",
      expectedContent: "placeholder test",
      aspect: "cinematic",
      size: "full",
    },
    scrollPrompt: "Begin Reading",
  },

  introduction: {
    heading: "Prologue — Before Everything Changed",
    epigraph:
      "During the summer before college, ten of my closest friends and I spent a week together at Lake Tahoe.",
    paragraphs: [],
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
      openingParagraphs: [],
      midParagraphs: [],
      closingParagraphs: [],
      galleryType: "asymmetrical",
      gallery: [],
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
      openingParagraphs: [],
      midParagraphs: [],
      closingParagraphs: [],
      galleryType: "horizontal-carousel",
      gallery: [],
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
      openingParagraphs: [],
      midParagraphs: [],
      closingParagraphs: [],
      pullQuotes: [],
      galleryType: "spacious-landscape",
      gallery: [],
    },
  ],

  conclusion: {
    number: "Epilogue",
    title: "The Illusion of Permanence",
    subtitle: "Looking Back on Lake Tahoe",
    paragraphs: [],
    finalSignoff: "Just Like Any Other Week",
  },
};
