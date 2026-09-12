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
    id: "geometric-spiral",
    title: "Study in Spiral Geometry",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_geometric_spiral.jpg",
    editorialCaption: "“Where imagination takes shape.”",
    visualDescription: "An intricate concentric square spiral drawing exploring depth, rotation, and fine linear pencil shading.",
    featured: true
  },
  {
    id: "wavy-cityscape",
    title: "Urban Rhythms & Flowing Facades",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_wavy_cityscape.jpg",
    editorialCaption: "“A quiet conversation between form and emotion.”",
    visualDescription: "A whimsical architectural study with undulating vertical streams composed of cozy buildings, windows, and textured walls.",
    featured: true
  },
  {
    id: "quadrant-geometry",
    title: "Symmetry & Diamond Quadrants",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_quadrant_geometry.jpg",
    editorialCaption: "“Lines that speak without words.”",
    visualDescription: "A balanced four-quadrant composition combining central diamond geometries with directional pencil hatching.",
    featured: true
  },
  {
    id: "pattern-grid",
    title: "Twenty Patterns & Textural Studies",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_pattern_grid.jpg",
    editorialCaption: "“An unfinished thought captured on paper.”",
    visualDescription: "A 4×5 grid of twenty distinct organic and geometric pencil patterns including woodgrain ripples, nested squares, and woven textures.",
    featured: false
  },
  {
    id: "pinwheel-facets",
    title: "Angular Facets & Prismatic Forms",
    medium: "Pencil on Paper",
    image: "/assets/sketches/sketch_pinwheel_facets.jpg",
    editorialCaption: "“A moment translated into lines.”",
    visualDescription: "A dynamic angular tessellation composed of intersecting triangular facets with delicate directional graphite shading.",
    featured: false
  }
];
