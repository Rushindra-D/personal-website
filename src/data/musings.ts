import { artworks, type Artwork } from "./artworks";

export interface MusingSection {
  heading?: string;
  paragraphs: string[];
  featuredQuote?: string;
  associatedArtworkId?: string;
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  sections: MusingSection[];
  sketches: Artwork[];
  concludingReflection: string;
}

export const musings: JournalEntry[] = [
  {
    id: "fractals-of-thought",
    slug: "fractals-of-thought",
    title: "Fractals of Thought: A Psychological Inquiry into Zentangle Practice",
    subtitle: "Do your thoughts feel scattered, or do they move in straight lines? On looping minds, repeating patterns, and the therapy of structured art.",
    category: "Psychological Inquiry & Art Therapy",
    date: "September 2026",
    readTime: "4 min read",
    author: "Rishitha Gorupati",
    coverImage: "/assets/sketches/sketch_geometric_spiral.jpg",
    excerpt:
      "In a way, it feels like thoughts are fractal; repeating, similar, and sometimes unpredictable, but rarely simple or linear. And that’s when it struck me — maybe these patterns don’t just exist on paper; maybe they reflect the patterns within the mind itself.",
    tags: ["Zentangle Art", "Mindfulness", "Psychology", "Reflective Journal", "Art Therapy"],
    sections: [
      {
        heading: "The Non-Linear Mind & Fractal Loops",
        paragraphs: [
          "Do your thoughts feel scattered, or do they move in straight lines?",
          "I’ve often felt that mine don’t move in straight lines; they loop, they repeat, they shift without any prior notice.",
          "Strange, right? That we can’t always control our own thoughts.",
          "In a way, it feels like thoughts are fractal; repeating, similar, and sometimes unpredictable, but rarely simple or linear. More precisely, when we think about something, it connects to past memories and future worries, but only occasionally lingers in the present."
        ],
        featuredQuote: "“In a way, it feels like thoughts are fractal; repeating, similar, and sometimes unpredictable, but rarely simple or linear.”",
        associatedArtworkId: "geometric-spiral"
      },
      {
        heading: "An Unexpected Awakening in the Sketchbook",
        paragraphs: [
          "Alright, let’s pause and come to what truly matters…",
          "Have you ever heard of Zentangle art? Or have you ever felt that even the simplest patterns can hold meaning?",
          "Recently, while I was drawing random patterns in my sketchbook, I began to notice something unexpected… I came across an art form I hadn’t even realized would mean this much to me.",
          "At first, it felt like nothing more than simple lines and shapes. But as I continued, those patterns started to feel different, almost as if they carried something deeper within them. It no longer felt like I was just drawing; it felt like I was expressing something I couldn’t put into words."
        ],
        associatedArtworkId: "pattern-grid"
      },
      {
        heading: "Mirrors of the Inner Landscape",
        paragraphs: [
          "These patterns were not random. They held emotions, reflections, and a quiet sense of presence. The more I observed them, the more I realized that they resembled the way my thoughts move, repetitive, layered, sometimes calm, sometimes chaotic, sometimes complex, yet somehow connected.",
          "And that’s when it struck me — maybe these patterns don’t just exist on paper; maybe they reflect the patterns within the mind itself.",
          "This realization slowly led me into a deeper exploration of how the mind works, shaping what I now understand as a psychological inquiry."
        ],
        associatedArtworkId: "wavy-cityscape"
      },
      {
        heading: "Zentangle as Grounding & Therapy",
        paragraphs: [
          "This form of expression is known as Zentangle art — a meaningful drawing technique that creates structured patterns to promote reflection and focus.",
          "As I continued, I realized that it slowly improved my patience and guided me to stay present in the moment. It helped me focus on what is in front of me, allowing the rest to wait.",
          "It has a calming effect on the mind, gently organizing thoughts and bringing a sense of psychological relief once the work is complete.",
          "More than anything, it strengthens the ability to remain in the present, reducing distractions and unnecessary diversions.",
          "I can say that it’s not just an art that we do, but it is a therapy that we need."
        ],
        featuredQuote: "“I can say that it’s not just an art that we do, but it is a therapy that we need.”",
        associatedArtworkId: "quadrant-geometry"
      },
      {
        heading: "Connecting Lines to Understanding",
        paragraphs: [
          "As I spent more time with it, I realized that these lines resemble the way our mind functions, how our thoughts progress. They may appear as different patterns, yet somehow they remain connected and come together to form a clear meaning in the end.",
          "In the same way, our thoughts are multiple and varied, yet they eventually connect, leading us to understanding. This made me realize that there is something deeper and more reflective within these patterns.",
          "Each pattern we draw feels like a thought being revealed. Zentangle art is a way of understanding the mind, guiding our thoughts and gradually improving our patience.",
          "It allows us to observe how our thoughts run, repeat, and reflect over time."
        ],
        associatedArtworkId: "pinwheel-facets"
      }
    ],
    concludingReflection:
      "Perhaps, we are not merely drawing patterns on paper, but revealing the thoughts within us, and in doing so, we find clarity after finishing the art in the same way we find a solution after thinking. And maybe, in understanding these patterns, we begin to understand ourselves.",
    sketches: artworks
  }
];
