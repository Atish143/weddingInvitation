/** Central personalization — swap placeholders here without touching scenes. */

export const COUPLE = {
  partner1: "Pravalika",
  partner2: "Kunal",
  monogram: "K ❤ P",
  signOff: "With Love, Kunal ❤ Pravalika",
  tagline: "Two hearts, one beautiful journey.",
  forever: "And so our forever begins...",
  invite:
    "Together with our families, we invite you to celebrate our special day.",
  closing: "We can't wait to celebrate with you!",
} as const;

/** Easy photo swap — replace files in /public/couple/ */
export const COUPLE_IMAGES = {
  groom: "/couple/groom.svg",
  bride: "/couple/bride.svg",
  together: "/couple/together.svg",
} as const;

export const WEDDING = {
  dateRangeLabel: "21–23 August 2026",
  targetDateIso: "2026-08-23T11:00:00+05:30",
  ceremonyDayLabel: "Sunday, 23 August 2026",
} as const;

export type WeddingEventTheme =
  | "green"
  | "haldi"
  | "engagement"
  | "sangeet"
  | "wedding";

export type WeddingEvent = {
  id: string;
  order: number;
  date: string;
  dateIso: string;
  day: "Friday" | "Saturday" | "Sunday";
  dayKey: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  dressCodeKey: string;
  badgeKey: string;
  image: string;
  imagePosition: string;
  theme: WeddingEventTheme;
  decor: "jasmine" | "marigold" | "gold-floral" | "musical" | "temple";
  time: string;
  timeEnd: string;
  calendarStart: string;
  calendarEnd: string;
  venue: string;
  address: string;
  mapsUrl: string;
  dressIcon: string;
};

/** Data-driven wedding events — edit here to update cards site-wide */
export const WEDDING_EVENTS: WeddingEvent[] = [
  // {
  //   id: "green-morning",
  //   order: 1,
  //   date: "21 August 2026",
  //   dateIso: "2026-08-21",
  //   day: "Friday",
  //   dayKey: "events.friday",
  //   titleKey: "events.greenMorning.title",
  //   subtitleKey: "events.greenMorning.subtitle",
  //   descriptionKey: "events.greenMorning.description",
  //   dressCodeKey: "events.greenMorning.dressCode",
  //   badgeKey: "events.greenMorning.badge",
  //   image: "/images/events/greenmoring.png",
  //   imagePosition: "center top",
  //   theme: "green",
  //   decor: "jasmine",
  //   time: "10:00 AM",
  //   timeEnd: "12:30 PM",
  //   calendarStart: "20260821T100000",
  //   calendarEnd: "20260821T123000",
  //   venue: "NV Convention Hall",
  //   address: "Hanamkonda, Telangana",
  //   mapsUrl:
  //     "https://www.google.com/maps/dir/?api=1&destination=NV+Convention+Hall+Hanamkonda",
  //   dressIcon: "🌿",
  // },
  {
    id: "haldi",
    order: 1,
    date: "21 August 2026",
    dateIso: "2026-08-21",
    day: "Friday",
    dayKey: "events.friday",
    titleKey: "events.haldi.title",
    subtitleKey: "events.haldi.subtitle",
    descriptionKey: "events.haldi.description",
    dressCodeKey: "events.haldi.dressCode",
    badgeKey: "events.haldi.badge",
    image: "/images/events/haldi.png",
    imagePosition: "center",
    theme: "haldi",
    decor: "marigold",
    time: "4:00 PM",
    timeEnd: "7:00 PM",
    calendarStart: "20260821T160000",
    calendarEnd: "20260821T190000",
    venue: "Hotel Vaarahi Warangal",
    address: "Hanamkonda, Telangana",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Hotel+Vaarahi+Warangal",
    dressIcon: "💛",
  },

  {
    id: "engagement",
    order: 2,
    date: "22 August 2026",
    dateIso: "2026-08-22",
    day: "Saturday",
    dayKey: "events.saturday",
    titleKey: "events.engagement.title",
    subtitleKey: "events.engagement.subtitle",
    descriptionKey: "events.engagement.description",
    dressCodeKey: "events.engagement.dressCode",
    badgeKey: "events.engagement.badge",
    image: "/images/events/engagement.png",
    imagePosition: "center",
    theme: "engagement",
    decor: "gold-floral",
    time: "4:00 PM",
    timeEnd: "7:00 PM",
    calendarStart: "20260822T160000",
    calendarEnd: "20260822T190000",
    venue: "Hotel Vaarahi Warangal",
    address: "Hanamkonda, Telangana",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Hotel+Vaarahi+Warangal",
    dressIcon: "💍",
  },

  {
    id: "sangeet",
    order: 3,
    date: "22 August 2026",
    dateIso: "2026-08-22",
    day: "Saturday",
    dayKey: "events.saturday",
    titleKey: "events.sangeet.title",
    subtitleKey: "events.sangeet.subtitle",
    descriptionKey: "events.sangeet.description",
    dressCodeKey: "events.sangeet.dressCode",
    badgeKey: "events.sangeet.badge",
    image: "/images/events/sangeet.png",
    imagePosition: "center",
    theme: "sangeet",
    decor: "musical",
    time: "8:00 PM",
    timeEnd: "12:00 AM",
    calendarStart: "20260822T200000",
    calendarEnd: "20260823T000000",
    venue: "Hotel Vaarahi Warangal",
    address: "Hanamkonda, Telangana",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Hotel+Vaarahi+Warangal",
    dressIcon: "✨",
  },

  {
    id: "wedding",
    order: 4,
    date: "23 August 2026",
    dateIso: "2026-08-23",
    day: "Sunday",
    dayKey: "events.sunday",
    titleKey: "events.wedding.title",
    subtitleKey: "events.wedding.subtitle",
    descriptionKey: "events.wedding.description",
    dressCodeKey: "events.wedding.dressCode",
    badgeKey: "events.wedding.badge",
    image: "/images/events/wedding.png",
    imagePosition: "center top",
    theme: "wedding",
    decor: "temple",
    time: "11:20 AM",
    timeEnd: "2:00 PM",
    calendarStart: "20260823T110000",
    calendarEnd: "20260823T140000",
    venue: "NV Convention Hall",
    address: "Hanamkonda, Telangana",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=NV+Convention+Hall+Hanamkonda",
    dressIcon: "👑",
  },
];

/** @deprecated Use WEDDING_EVENTS — kept for any legacy imports */
export const EVENTS = WEDDING_EVENTS;

export const VENUE = {
  id: "venue",
  title: "Wedding Venue",
  name: "NV Convention Hall",
  city: "Hanamkonda",
  address: "NV Convention Hall, Hanamkonda, Telangana",
  query: "NV Convention Hall Hanamkonda",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=NV+Convention+Hall+Hanamkonda",
} as const;

export const STAY = {
  id: "stay",
  title: "Where to Stay",
  name: "Hotel Vaarahi",
  city: "Warangal",
  address: "Hotel Vaarahi, Warangal, Telangana",
  query: "Hotel Vaarahi Warangal",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Hotel+Vaarahi+Warangal",
} as const;

export const WEATHER = {
  latitude: 17.9689,
  longitude: 79.5941,
  timezone: "Asia/Kolkata",
  locationLabel: "Hanamkonda",
  regionLabel: "Warangal, Telangana",
  dates: ["2026-08-21", "2026-08-22", "2026-08-23"] as const,
  dayLabels: [
    "weather.day21",
    "weather.day22",
    "weather.day23",
  ] as const,
} as const;

export const SCENES = [
  { id: "welcome", label: "Welcome" },
  { id: "couple", label: "Couple" },
  { id: "story", label: "Our Story" },
  { id: "countdown", label: "Countdown" },
  { id: "events", label: "Events" },
  { id: "dresscode", label: "Dress Code" },
  { id: "venue", label: "Venue" },
  { id: "stay", label: "Events" },
  { id: "weather", label: "Weather" },
  { id: "finale", label: "Celebrate" },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export function getNextScene(currentId: SceneId) {
  const idx = SCENES.findIndex((s) => s.id === currentId);
  if (idx < 0 || idx >= SCENES.length - 1) return null;
  return SCENES[idx + 1];
}

export function getPrevScene(currentId: SceneId) {
  const idx = SCENES.findIndex((s) => s.id === currentId);
  if (idx <= 0) return null;
  return SCENES[idx - 1];
}
