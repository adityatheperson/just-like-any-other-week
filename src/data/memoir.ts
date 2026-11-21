export interface PhotoAnnotation {
  label: string;
  /** Center of circle (% of frame width/height) */
  circleX: number;
  circleY: number;
  circleRx: number;
  circleRy: number;
  /** Label position (% of frame width/height) */
  labelX: number;
  labelY: number;
}

export interface PhotoAsset {
  id: string;
  src: string;
  alt: string;
  label: string;
  expectedContent: string;
  caption?: string;
  aspect: "wide" | "portrait" | "square" | "cinematic" | "panoramic";
  size?: "large" | "medium" | "small" | "full";
  annotation?: PhotoAnnotation;
}

export interface VideoAsset {
  id: string;
  src: string;
  poster?: string;
  label: string;
  expectedContent: string;
  caption?: string;
  mutedLoop?: boolean;
  aspect?: "wide" | "portrait";
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
    carousel: PhotoAsset[];
    backgroundVideo?: VideoAsset;
    scrollPrompt: string;
  };
  introduction: {
    heading: string;
    epigraph: string;
    paragraphs: string[];
    photo?: PhotoAsset;
    afterPhotoParagraphs?: string[];
    secondPhoto?: PhotoAsset;
    afterSecondPhotoParagraphs?: string[];
    video?: VideoAsset;
    afterVideoParagraphs?: string[];
    thirdPhoto?: PhotoAsset;
    raftingParagraphs?: string[];
    fourthPhoto?: PhotoAsset;
    afterFourthPhotoParagraphs?: string[];
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
    locationAndDate: "Summer 2026",
    themeTitle: "The Illusion of Permanence",
    wordCountTarget: "~2,000 words total across Introduction, 3 Chapters, and Conclusion",
  },

  hero: {
    scrollPrompt: "Begin Reading",
    carousel: [
      {
        id: "landing-1",
        src: "/images/landing-1.jpg",
        alt: "placeholder test",
        label: "Slide 01 · public/images/landing-1.jpg",
        expectedContent: "placeholder test",
        aspect: "cinematic",
        size: "large",
      },
      {
        id: "landing-2",
        src: "/images/landing-2.jpg",
        alt: "placeholder test",
        label: "Slide 02 · public/images/landing-2.jpg",
        expectedContent: "placeholder test",
        aspect: "cinematic",
        size: "large",
      },
      {
        id: "landing-3",
        src: "/images/landing-3.jpg",
        alt: "placeholder test",
        label: "Slide 03 · public/images/landing-3.jpg",
        expectedContent: "placeholder test",
        aspect: "cinematic",
        size: "large",
      },
      {
        id: "landing-4",
        src: "/images/landing-4.jpg",
        alt: "placeholder test",
        label: "Slide 04 · public/images/landing-4.jpg",
        expectedContent: "placeholder test",
        aspect: "cinematic",
        size: "large",
      },
    ],
  },

  introduction: {
    heading: "Prologue — Before Everything Changed",
    epigraph:
      "During the summer before college, ten of my closest friends and I spent a week together.",
    paragraphs: [
      "I woke up to “From the Start” by Laufey at 7 a.m. on June 13th. The day had finally come, it was the day that I had been waiting for but also had been dreading. It was the start of our senior trip, a trip where we hoped to make memories that would last a lifetime. The night before, I couldn’t sleep, I couldn’t stop thinking that after this trip, we would all go our separate ways.",
      "However, as my friends started to reach my house, that feeling went away. We had planned on meeting at 9:30 a.m., but as usual, some people were late. Our parents met each other and discussed a few things while we all loaded the cars. Eleven people were going on this trip, in two separate cars, for a week, on a road trip down to Lake Tahoe and then Yosemite.",
      "Even though we knew this might be our last adventure together, that feeling was not something looming over our heads. We were rather occupied with how to arrange all the bags so that they fit in the cars. And at 10:30 a.m., we began driving!",
    ],
    photo: {
      id: "intro-departure",
      src: "/images/intro-departure.jpg",
      alt: "Friends gathered by the car before departing on the senior trip",
      label: "June 13 · Morning Departure",
      expectedContent: "Friends gathered by the car before departing on the senior trip",
      aspect: "wide",
      size: "full",
    },
    afterPhotoParagraphs: [
      "The drive was not that difficult. It was a 6-hour drive with a stop for lunch. I was one of the drivers, and since my car could only comfortably fit four people, it was the quieter car. So it was really easy to fall asleep, but we also had a lot of great discussions on that drive. One of them was about what we should do for Romir’s birthday. Romir was one of my friends on the trip, and it happened to be his birthday that day. To give you some context, Romir is the type of person who tries to make everyone laugh, so we only saw it fitting to make him smile. So we started planning the surprise.",
      "We arrived at Lake Tahoe around 5 p.m. While some people went to freshen up, others went to buy groceries. We planned it so that Romir would be one of the people who stayed at the Airbnb. We bought a cake, candles, drinks, and decorations, trying to make sure that we did not forget any of the actual groceries at the same time. We headed back home and then successfully made Romir stay downstairs while we set up the kitchen for the surprise. We set out a table cover, opened the cake, brought the balloons out, poured the drinks, turned off the lights, and finally lit the candles.",
    ],
    secondPhoto: {
      id: "romir-birthday",
      src: "/images/romir-birthday.jpg",
      alt: "Romir cutting his birthday cake at the dining table with balloons and sparkling cider",
      label: "Romir's Surprise Birthday",
      expectedContent: "Romir cutting his birthday cake at the dining table",
      aspect: "portrait",
      size: "medium",
      annotation: {
        label: "Romir",
        circleX: 33,
        circleY: 46,
        circleRx: 14,
        circleRy: 11,
        labelX: 54,
        labelY: 31,
      },
    },
    afterSecondPhotoParagraphs: [
      "The way we called him upstairs was by telling him that there was a huge bear outside the house. He bolted up the stairs, expecting to see a massive animal, but instead, he just saw a cake with ten people around it. I could see his expression change in real time. It went from an excited one to one of shock, then he smiled.",
    ],
    video: {
      id: "romir-surprise-video",
      src: "/videos/romir-surprise.mp4",
      poster: "/images/romir-surprise-thumb.jpg",
      label: "Romir popping a bottle of champaigne",
      expectedContent: "Romir popping a bottle of champaigne",
      aspect: "portrait",
    },
    afterVideoParagraphs: [
      "Looking back, it was really easy to convince everyone to commit to the surprise. Everything was really smooth and fell into place. We had spent years celebrating, making memories, and strengthening bonds. This specific event was not any different. It felt like one of those 100 events that we did in the past. We weren’t concerned about college, about future careers, or about anything but planning the surprise. We were there, celebrating another birthday, just like we always had.",
    ],
    thirdPhoto: {
      id: "birthday-celebration",
      src: "/images/birthday-celebration.jpg",
      alt: "Friends celebrating Romir's surprise birthday together",
      label: "Birthday Celebration",
      expectedContent: "Friends celebrating Romir's surprise birthday together",
      aspect: "wide",
      size: "full",
    },
    raftingParagraphs: [
      "One of the activities that we had planned was white water rafting, and it was something that we were really anticipating. We split up into two groups, where those who could swim went to the Class 4 river, while the rest of the group went on a Class 3 journey. I had decided to go with the higher-class experience, along with 5 other friends. We all had to wake up early, as we had about 7 hours on the river ahead of us. We drove over to the site, and the thing that I remember the most was the instructor telling us about the various different safety precautions and the dangers we might face. To be honest, hearing about all the potential dangers made me nervous, but I couldn't back out now.",
    ],
    fourthPhoto: {
      id: "rafting-instructor",
      src: "/images/rafting-instructor.jpg",
      alt: "Picture with Instructor",
      label: "Picture with Instructor",
      expectedContent: "Picture with Instructor",
      aspect: "wide",
      size: "full",
    },
    afterFourthPhotoParagraphs: [
      "We started going down the river, slowly gaining speed. The instructor was yelling commands that he had taught us just a few minutes earlier. We were constantly being reminded to keep in sync, “Right 3,” “Left 1,” “Reverse 3.” Then a sudden jolt. Our raft had hit a rock, and we flipped. The boat was on top of our heads, and we rose to the top thanks to the life jackets.",
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
    subtitle: "Looking Back",
    paragraphs: [],
    finalSignoff: "Just Like Any Other Week",
  },
};
