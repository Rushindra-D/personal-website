# Rishitha Gorupati — Author, Poet & Writer

Official portfolio and dynamic literary catalog for **Rishitha Gorupati**, author of *That Day Is Inevitable*, poet, and writer.

Designed with a warm, minimalist literary paper aesthetic (`#FDFBF7`), elegant serif typography, and rich interactive features.

---

## 🌟 Key Features

* **Home**: Split-column editorial hero, featured verse spotlight, selected works, and author bio.
* **Poetry (`/poetry`)**: Curated collection of 24 poems with real-time search, tag filtering, and dedicated reading view pages (`/poetry/:slug`).
* **Musings & Zentangles (`/musings`)**: Psychological inquiries and long-form journal essays (*"Fractals of Thought: A Psychological Inquiry into Zentangle Practice"*), accompanied by high-resolution sketchbook plates and an interactive lightbox viewer.
* **Books & Publications (`/books`)**: Featuring *That Day Is Inevitable* with front and back covers, 3D edition mockup, book synopsis, ISBN/publisher details, and direct Amazon purchase links (`/books/:slug`).
* **About Me (`/about`)**: Authentic author biography, garden portraits, philosophical reflections, and literary milestones timeline.
* **Contact (`/contact`)**: Dynamic inquiry form connected to author email (`rishithagorupati@gmail.com`), plus verified LinkedIn and Instagram profiles.
* **Author & Admin Portal (`/admin`)**: Password-protected private dashboard allowing the author to dynamically add, edit, or delete poems, books, musings, author bio details, and update the access passkey without code changes.

---

## 🛠️ Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: Tailwind CSS + Custom Literary Design System tokens
* **Icons**: [Lucide React](https://lucide.dev/)
* **Router**: [React Router v7](https://reactrouter.com/)
* **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* `npm` or `yarn` / `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/Rushindra-D/personal-website.git
cd personal-website

# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

The application will run locally at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build production bundle
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

---

## 🔐 Author Portal Access

* **URL**: `/admin`
* **Default Passkey**: `rishitha` (or customized via Author Profile > Security)
* Full dynamic control over site content with local persistence and backup/restore capabilities.

---

## 📄 License

© 2026 Rishitha Gorupati. All rights reserved.
