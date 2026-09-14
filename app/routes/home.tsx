import { ArticleSlideshow } from "../article/article-slideshow";
import { badminton } from "../article/data/badminton";
import { basketball } from "../article/data/basketball";
import { beachVolleyball } from "../article/data/beach-volleyball";
import { cheerdance } from "../article/data/cheerdance";
import { chess } from "../article/data/chess";
import { football } from "../article/data/football";
import { swimming } from "../article/data/swimming";
import { tableTennis } from "../article/data/table-tennis";
import { trackAndField } from "../article/data/track-and-field";
import type { SportPrimer as SportPrimerData } from "../article/types";

// Order sports appear on the homepage. Reorder freely, each entry is
// self-contained data, nothing else needs to change.
const primers: SportPrimerData[] = [
  basketball,
  football,
  swimming,
  beachVolleyball,
  badminton,
  tableTennis,
  chess,
  trackAndField,
  cheerdance,
];

export function meta() {
  return [
    { title: "UAAP Season 89 — First Semester Primer" },
    { name: "description", content: "UAAP Season 89 sports primer." },
  ];
}

export default function Home() {
  return <ArticleSlideshow primers={primers} />;
}
