import { cheerdance } from "../article/data/cheerdance";
import { SportPrimer } from "../article/sport-primer";

export function meta() {
  return [
    { title: "Cheerdance — UAAP Season 89 Primer" },
    { name: "description", content: "One-team primer layout demo." },
  ];
}

export default function OneTeam() {
  return <SportPrimer primer={cheerdance} />;
}
