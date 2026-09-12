export interface Artwork {
  id: string;
  title: string;
  medium: string;
  image: string;
  editorialCaption: string; // Neutral website caption in quotation marks
  visualDescription: string;
  featured?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: "pattern-grid",
    title: "Twenty Patterns & Textural Studies",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_pattern_grid.jpg",
    editorialCaption: "\u201CWhere imagination takes shape.\u201D",
    visualDescription: "A multi-panel grid of distinct organic and geometric pencil patterns including woodgrain ripples, nested squares, concentric circles, and woven textures.",
    featured: true
  },
  {
    id: "quadrant-geometry",
    title: "Symmetry & Diamond Quadrants",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_quadrant_geometry.jpg",
    editorialCaption: "\u201CLines that speak without words.\u201D",
    visualDescription: "A balanced four-quadrant composition combining central diamond geometries with directional pencil hatching.",
    featured: true
  },
  {
    id: "wavy-cityscape",
    title: "Urban Rhythms & Flowing Facades",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_wavy_cityscape.jpg",
    editorialCaption: "\u201CA quiet conversation between form and emotion.\u201D",
    visualDescription: "A whimsical architectural study with undulating vertical streams composed of cozy buildings, windows, and textured walls.",
    featured: true
  },
  {
    id: "pinwheel-facets",
    title: "Angular Facets & Prismatic Forms",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_pinwheel_facets.jpg",
    editorialCaption: "\u201CA moment translated into lines.\u201D",
    visualDescription: "A dynamic angular tessellation composed of intersecting triangular facets with delicate directional graphite shading.",
    featured: false
  },
  {
    id: "nested-vortex",
    title: "Nested Vortex & Infinite Perspective",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_nested_vortex.jpg",
    editorialCaption: "\u201CPatterns that echo the labyrinth of thought.\u201D",
    visualDescription: "An intricate geometric paradox pattern of rotating concentric polygons descending into an infinite central spiral vortex.",
    featured: true
  }
];
