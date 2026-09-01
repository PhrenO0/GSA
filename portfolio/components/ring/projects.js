// The carousel's deal, derived from the content model so the ring, the index
// column and the detail pages cannot disagree about what is where.
//
// WORKS is authored in ring order — entry n sits one slot along the ring from
// entry n-1, which is what lets the column count 01..18 as the carousel turns.
// Reorder rows in content/works.js, not here.
import { WORKS } from "@/content/works";

export const PROJECTS = WORKS.map(({ slug, file, name, type, year }) => ({
  slug,
  file,
  name,
  type,
  year,
}));

export const IMAGE_FILES = PROJECTS.map((p) => p.file);
