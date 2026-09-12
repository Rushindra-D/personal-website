export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  synopsis: string[];
  coverFront: string;
  coverBack?: string;
  mockup?: string;
  buyLinks: {
    amazon: string;
    amazonAlt?: string;
    flipkart: string;
    isFlipkartPlaceholder: boolean;
  };
  details: {
    format?: string;
    language?: string;
    isbn?: string;
    publisher?: string;
    price?: string;
    genre?: string;
  };
}

export const books: Book[] = [
  {
    id: "that-day-is-inevitable",
    slug: "that-day-is-inevitable",
    title: "That Day is Inevitable",
    subtitle: "A reflection on mortality, awareness, and living with purpose",
    author: "Rishitha Gorupati",
    synopsis: [
      "Even if we consider it inauspicious to talk about death at home, our inner mind knows that one day death has to come. And the whole life of most of the people is governed by the fear of death. From their goal to religion, everything is determined by the fear of death.",
      "But have we ever thought why this death bothers us so much? This fear of death reflects our ignorance about death. In this book, the author has tried to bring death closer to us so that we can get rid of the fear of death in our life and live our life with love.",
      "When we truly accept that life is temporary, we begin to value each moment more deeply and learn to live with greater love, meaning, and clarity."
    ],
    coverFront: "/assets/books/that_day_is_inevitable_front.jpg",
    coverBack: "/assets/books/that_day_is_inevitable_back.jpg",
    mockup: "/assets/books/that_day_is_inevitable_mockup.jpg",
    buyLinks: {
      amazon: "https://amzn.in/d/02x4k9iQ",
      amazonAlt: "https://amzn.in/d/09wonYEq",
      flipkart: "https://www.flipkart.com/PLACEHOLDER",
      isFlipkartPlaceholder: true
    },
    details: {
      format: "Paperback",
      language: "English",
      publisher: "String Production India",
      isbn: "978-93-58136-03-6",
      price: "₹99",
      genre: "Life / Philosophy"
    }
  }
];
