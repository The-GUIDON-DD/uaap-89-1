import { basketball } from "../article/data/basketball";
import { cheerdance } from "../article/data/cheerdance";
import { SportPrimer } from "../article/sport-primer";

export function meta() {
  return [
    { title: "UAAP Season 89 — First Semester Primer" },
    { name: "description", content: "UAAP Season 89 sports primer." },
  ];
}

export default function Home() {
  return (
    <>
      {/* TEMP: blank spacer so the primer starts below the fold. */}
      <section aria-hidden="true" className="h-screen bg-white" />
      <SportPrimer primer={basketball} />
      <SportPrimer primer={cheerdance} />
    </>
  );
}
