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
    raftFlipConveyor?: PhotoAsset[];
    afterConveyorParagraphs?: string[];
    secondVideo?: VideoAsset;
    hikeParagraphs?: string[];
    fifthPhoto?: PhotoAsset;
    afterFifthPhotoParagraphs?: string[];
    sixthPhoto?: PhotoAsset;
    closingParagraphs?: string[];
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
        alt: "Four friends standing on a fallen log in the Yosemite forest",
        label: "Senior Trip · 01 / 07",
        expectedContent: "Four friends standing on a fallen log in the Yosemite forest",
        aspect: "portrait",
        size: "medium",
      },
      {
        id: "landing-2",
        src: "/images/landing-2.jpg",
        alt: "Two friends on the trail overlooking the Yosemite forest",
        label: "Senior Trip · 02 / 07",
        expectedContent: "Two friends on the trail overlooking the Yosemite forest",
        aspect: "portrait",
        size: "medium",
      },
      {
        id: "landing-3",
        src: "/images/landing-3.jpg",
        alt: "Ten friends sitting together along a fallen tree trunk in the forest",
        label: "Senior Trip · 03 / 07",
        expectedContent: "Ten friends sitting together along a fallen tree trunk in the forest",
        aspect: "wide",
        size: "large",
      },
      {
        id: "landing-4",
        src: "/images/landing-4.jpg",
        alt: "Friends walking up the shaded forest trail toward Sentinel Dome",
        label: "Senior Trip · 04 / 07",
        expectedContent: "Friends walking up the shaded forest trail toward Sentinel Dome",
        aspect: "portrait",
        size: "medium",
      },
      {
        id: "landing-5",
        src: "/images/landing-5.jpg",
        alt: "Five friends sitting on the granite slope of Sentinel Dome",
        label: "Senior Trip · 05 / 07",
        expectedContent: "Five friends sitting on the granite slope of Sentinel Dome",
        aspect: "portrait",
        size: "medium",
      },
      {
        id: "landing-6",
        src: "/images/landing-6.jpg",
        alt: "Two friends looking out over Yosemite Valley framed by tall pine trees",
        label: "Senior Trip · 06 / 07",
        expectedContent: "Two friends looking out over Yosemite Valley framed by tall pine trees",
        aspect: "portrait",
        size: "medium",
      },
      {
        id: "landing-7",
        src: "/images/landing-7.jpg",
        alt: "Two friends hiking up the granite trail toward Sentinel Dome summit",
        label: "Senior Trip · 07 / 07",
        expectedContent: "Two friends hiking up the granite trail toward Sentinel Dome summit",
        aspect: "portrait",
        size: "medium",
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
      "We arrived at Lake Tahoe around 5 p.m. While some people went to freshen up, others went to buy groceries. We planned it so that Romir would be one of the people who stayed at the Airbnb. We bought a cake, candles, drinks, and decorations, trying to make sure that we did not forget any of the actual groceries at the same time. When we headed back home, we convinced Romir and a few others that they were not allowed upstairs because they would be more of a liability than a help while we were cooking dinner. Everyone upstairs was rushing to set up the kitchen. Some of us were setting out the table cover and opening the cake, while others were bringing out the balloons and pouring the drinks. We were all trying to be as quiet as possible, but with everyone rushing around the kitchen, we weren’t very successful. We finally turned off the lights and lit the candles. The only thing lighting up the kitchen was the candles on the cake.",
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
      "The way we called him upstairs was by convincing him that there was a huge bear outside the house. I first said, in a moderately loud voice, “Is that a bear?” We then had someone else scream, “OH MY GOD, THERE’S A BEAR OUTSIDE!” Romir bolted up the stairs, expecting to see a bear outside, only to find ten of his friends standing around a candlelit cake. None of us said anything at first. We all just stood there, waiting to see his reaction. I could see his expression change in real time, from a look of confusion to a big smile. As soon as he smiled, we all yelled, “Happy birthday!” Everyone was laughing, and we were all waiting to get a piece of cake.",
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
      "Looking back, it was really easy to convince everyone to commit to the surprise. Everything fell into place without much discussion. We had spent years celebrating birthdays together, and this one felt no different. Just a few hours earlier, I had been thinking about how we would all be going our separate ways, but at that moment, the only thing we were concerned about was getting a piece of cake. We were there, celebrating another birthday, just like we always had.",
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
      "One of the activities that we had planned was white water rafting, and it was something that we were really anticipating. We split up into two groups, where those who could swim went to the Class 4 river, while the rest of the group went on a Class 3 journey. I had decided to go with the higher-class experience, along with 5 other friends. We all had to wake up early, as we had about 7 hours on the river ahead of us. We drove over to the site, and the thing that I remember the most was the instructor telling us about the various safety precautions and the dangers we might face. He told us that if we ever got stuck, we needed to protect our heads at all costs. As soon as he said that, we all looked at each other tensely. To be honest, hearing about all the potential dangers made me nervous, but I couldn't back out now.",
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
      "We started going down the river, slowly gaining speed. The instructor was yelling commands that he had taught us just a few minutes earlier. We were constantly being reminded to keep in sync, “Right 3,” “Left 1,” “Reverse 3.” Initially, we struggled to paddle in sync, even as we went through the smaller rapids. As we approached our first major rapid, all we could see ahead of us was white water.",
    ],
    raftFlipConveyor: [
      {
        id: "raft-flip-01",
        src: "/images/raft-flip-01.jpg",
        alt: "White water rafting flip sequence — Frame 1 of 14",
        label: "Raft Flip Sequence · 01 / 14",
        expectedContent: "White water rafting flip sequence — Frame 1",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-02",
        src: "/images/raft-flip-02.jpg",
        alt: "White water rafting flip sequence — Frame 2 of 14",
        label: "Raft Flip Sequence · 02 / 14",
        expectedContent: "White water rafting flip sequence — Frame 2",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-03",
        src: "/images/raft-flip-03.jpg",
        alt: "White water rafting flip sequence — Frame 3 of 14",
        label: "Raft Flip Sequence · 03 / 14",
        expectedContent: "White water rafting flip sequence — Frame 3",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-04",
        src: "/images/raft-flip-04.jpg",
        alt: "White water rafting flip sequence — Frame 4 of 14",
        label: "Raft Flip Sequence · 04 / 14",
        expectedContent: "White water rafting flip sequence — Frame 4",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-05",
        src: "/images/raft-flip-05.jpg",
        alt: "White water rafting flip sequence — Frame 5 of 14",
        label: "Raft Flip Sequence · 05 / 14",
        expectedContent: "White water rafting flip sequence — Frame 5",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-06",
        src: "/images/raft-flip-06.jpg",
        alt: "White water rafting flip sequence — Frame 6 of 14",
        label: "Raft Flip Sequence · 06 / 14",
        expectedContent: "White water rafting flip sequence — Frame 6",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-07",
        src: "/images/raft-flip-07.jpg",
        alt: "White water rafting flip sequence — Frame 7 of 14",
        label: "Raft Flip Sequence · 07 / 14",
        expectedContent: "White water rafting flip sequence — Frame 7",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-08",
        src: "/images/raft-flip-08.jpg",
        alt: "White water rafting flip sequence — Frame 8 of 14",
        label: "Raft Flip Sequence · 08 / 14",
        expectedContent: "White water rafting flip sequence — Frame 8",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-09",
        src: "/images/raft-flip-09.jpg",
        alt: "White water rafting flip sequence — Frame 9 of 14",
        label: "Raft Flip Sequence · 09 / 14",
        expectedContent: "White water rafting flip sequence — Frame 9",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-10",
        src: "/images/raft-flip-10.jpg",
        alt: "White water rafting flip sequence — Frame 10 of 14",
        label: "Raft Flip Sequence · 10 / 14",
        expectedContent: "White water rafting flip sequence — Frame 10",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-11",
        src: "/images/raft-flip-11.jpg",
        alt: "White water rafting flip sequence — Frame 11 of 14",
        label: "Raft Flip Sequence · 11 / 14",
        expectedContent: "White water rafting flip sequence — Frame 11",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-12",
        src: "/images/raft-flip-12.jpg",
        alt: "White water rafting flip sequence — Frame 12 of 14",
        label: "Raft Flip Sequence · 12 / 14",
        expectedContent: "White water rafting flip sequence — Frame 12",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-13",
        src: "/images/raft-flip-13.jpg",
        alt: "White water rafting flip sequence — Frame 13 of 14",
        label: "Raft Flip Sequence · 13 / 14",
        expectedContent: "White water rafting flip sequence — Frame 13",
        aspect: "wide",
        size: "medium",
      },
      {
        id: "raft-flip-14",
        src: "/images/raft-flip-14.jpg",
        alt: "White water rafting flip sequence — Frame 14 of 14",
        label: "Raft Flip Sequence · 14 / 14",
        expectedContent: "White water rafting flip sequence — Frame 14",
        aspect: "wide",
        size: "medium",
      },
    ],
    afterConveyorParagraphs: [
      "During this experience, there was nothing in my head other than trying to follow my instructor’s commands. That feeling of nervousness that I had felt at the start of the trip was gone. I couldn’t really think of anything else. The instructor flipped the boat over, and we all slowly climbed back in, and everything we were focused on at the time was finding our missing shoes.",
    ],
    secondVideo: {
      id: "jumping-off-rock-video",
      src: "/videos/jumping-off-rock.mp4",
      poster: "/images/jumping-off-rock-thumb.jpg",
      label: "Jumping of a rock",
      expectedContent: "Jumping of a rock",
      aspect: "portrait",
    },
    hikeParagraphs: [
      "The last day of the trip before the drive home, we decided to go on a hike in Yosemite. The name of the hike was Sentinel Dome, and it was around a 3 mile round trip. We decided on this hike because we had heard that it was not the most physically challenging, but the view was unmatched.",
    ],
    fifthPhoto: {
      id: "sentinel-dome",
      src: "/images/sentinel-dome.jpg",
      alt: "View from the Sentinel Dome trail in Yosemite",
      label: "Sentinel Dome · Yosemite",
      expectedContent: "View from the Sentinel Dome trail in Yosemite",
      aspect: "wide",
      size: "full",
    },
    afterFifthPhotoParagraphs: [
      "We had slept late the previous day, so everyone took a while to get ready. We had a late breakfast of cereal and eggs then we took off. It was a long and windy drive, we talked the whole way. We reached the starting point around 2 pm, and we set off.",
      "We got to the summit, and I started thinking. We weren’t acting like this was our last day together on the trip. We were acting the same way we did on the first day and the same way we had for the past four years. Even though we knew that we would all be going our separate ways, it was difficult to imagine a life where we didn’t see each other almost every day.",
    ],
    sixthPhoto: {
      id: "sentinel-dome-group",
      src: "/images/sentinel-dome-group.jpg",
      alt: "Friends together at the summit of Sentinel Dome in Yosemite",
      label: "Sentinel Dome Summit · Group Photo",
      expectedContent: "Friends together at the summit of Sentinel Dome in Yosemite",
      aspect: "portrait",
      size: "medium",
    },
    closingParagraphs: [
      "We asked someone to take a picture up on top of the mountain, and everyday I wake up to “From the Start” by Laufey and look at the picture we took on my wall.",
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
