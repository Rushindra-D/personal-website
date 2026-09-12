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
    flipkart?: string;
    isFlipkartPlaceholder?: boolean;
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
      "In a world where routines often obscure the deeper meaning of our days, That Day is Inevitable arrives as an awakening call. This reflective exploration prompts readers to confront the fragile beauty of mortality not with sorrow, but with conscious presence and renewed intentionality.",
      "Through reflective passages, introspective prose, and gentle philosophical inquiries, Rishitha Gorupati examines the moments we take for granted, urging us to recognize that our time is our most sacred gift.",
      "A work that resonates deeply with quiet souls, thoughtful minds, and anyone seeking clarity amidst the noise of modern life."
    ],
    coverFront: "/assets/books/that_day_is_inevitable_front.jpg",
    coverBack: "/assets/books/that_day_is_inevitable_back.jpg",
    mockup: "/assets/books/that_day_is_inevitable_mockup.jpg",
    buyLinks: {
      amazon: "https://amzn.in/d/02x4k9iQ",
      amazonAlt: "https://amzn.in/d/09wonYEq"
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
