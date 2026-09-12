export interface Achievement {
  id: string;
  title: string;
  type: "publication" | "appreciation";
  description: string;
  publisher: string;
  year: string;
  isbn?: string;
  certificateImage: string;
}

export const achievements: Achievement[] = [
  {
    id: "that-day-is-inevitable-cert",
    title: "That Day is Inevitable",
    type: "appreciation",
    description: "Certificate of Appreciation for publishing the book \"That Day is Inevitable\"",
    publisher: "String Production India",
    year: "2024",
    isbn: "978-93-58136-03-6",
    certificateImage: "/assets/certificates/cert_that_day_is_inevitable.png"
  },
  {
    id: "blooming-orchids",
    title: "Blooming Orchids",
    type: "publication",
    description: "Certificate of Publication for co-authoring the anthology \"Blooming Orchids\"",
    publisher: "The Wordings",
    year: "2023",
    isbn: "978-93-93377-48-7",
    certificateImage: "/assets/certificates/cert_blooming_orchids.png"
  },
  {
    id: "sophrosyne-vol1",
    title: "Sophrosyne Vol - 1",
    type: "appreciation",
    description: "Certificate of Appreciation for being a co-author in the anthology \"Sophrosyne Vol - 1\"",
    publisher: "The Quill House Publication",
    year: "2023",
    certificateImage: "/assets/certificates/cert_sophrosyne.png"
  },
  {
    id: "dusky-moon-vol3",
    title: "The Dusky Moon Vol-3",
    type: "publication",
    description: "Certificate of Publication for co-authoring the anthology \"The Dusky Moon Vol-3\"",
    publisher: "Thoughts Hymn Publishers",
    year: "2023",
    isbn: "978-81-964498-1-0",
    certificateImage: "/assets/certificates/cert_dusky_moon_vol3.png"
  },
  {
    id: "whispers-of-silence",
    title: "Whispers of Silence",
    type: "publication",
    description: "Certificate of Publishing for co-authoring the book \"Whispers of Silence\"",
    publisher: "Natals Publication",
    year: "2023",
    isbn: "978-81-96358-26-6",
    certificateImage: "/assets/certificates/cert_whispers_of_silence.png"
  },
  {
    id: "under-my-umbrella-vol2",
    title: "Under My Umbrella Volume-2",
    type: "publication",
    description: "Certificate of Publication for co-authoring the anthology \"Under my Umbrella Volume-2\"",
    publisher: "The Wordings",
    year: "2023",
    isbn: "978-93-93377-37-1",
    certificateImage: "/assets/certificates/cert_under_my_umbrella.png"
  },
  {
    id: "nobody-knows-but-you",
    title: "Nobody Knows But You",
    type: "appreciation",
    description: "Certificate of Appreciation for contributing work in the anthology \"Nobody Knows But You\"",
    publisher: "Hatchegg Publication",
    year: "2023",
    isbn: "978-93-95174-35-0",
    certificateImage: "/assets/certificates/cert_nobody_knows_but_you.png"
  }
];
