export interface MusicTrack {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  audioSrc?: string; // Optional real audio URL when supplied
  status: "coming_soon" | "released";
  coverImage?: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: "track-placeholder-1",
    title: "Original Composition I",
    subtitle: "[Original musical piece coming soon]",
    duration: "--:--",
    description: "An upcoming acoustic and ambient composition currently in creation. Audio track will be available here soon.",
    status: "coming_soon"
  },
  {
    id: "track-placeholder-2",
    title: "Original Composition II",
    subtitle: "[Original musical piece coming soon]",
    duration: "--:--",
    description: "Reflective melodies harmonized with literary themes. Audio track will be available here soon.",
    status: "coming_soon"
  }
];
