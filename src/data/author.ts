export interface AuthorProfile {
  name: string;
  titles: string[];
  pronouns: string;
  tagline: string;
  bio: string;
  shortBio: string;
  photos: {
    hero: string;
    portrait: string;
    garden: string;
  };
  social: {
    email: string;
    instagram: string;
    linkedin: string;
  };
}

export const authorData: AuthorProfile = {
  name: "Rishitha Gorupati",
  titles: ["Author", "Poet", "Writer", "Artist"],
  pronouns: "(she/her)",
  tagline: "Where thoughts become words, words become reflections, and words are woven into verses.",
  bio: "I am a writer and the author of That Day is Inevitable, as well as a co-author of several published anthologies featured in different books. Passionate about literature and expression, I enjoy weaving words into verses that reflect thoughts, emotions, and experiences. Along with writing poetry, I love exploring ideas through articles and sharing my perspectives by reviewing books. Through my writing, I hope to connect with readers and celebrate the power of words.",
  shortBio: "Writer, poet, and author of That Day is Inevitable. Weaving words into verses that reflect thoughts, emotions, and experiences.",
  photos: {
    hero: "/assets/author/rishitha_portrait.jpg",
    portrait: "/assets/author/rishitha_portrait.jpg",
    garden: "/assets/author/rishitha_garden.jpg"
  },
  social: {
    email: "rishithagorupati@gmail.com",
    instagram: "https://www.instagram.com/rishitha.gorupati?stkn=MXFybnVybzd2ZzdlNw==",
    linkedin: "https://www.linkedin.com/in/rishitha-gorupati-ab7b96296?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  }
};
