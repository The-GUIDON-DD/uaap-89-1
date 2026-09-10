import { Credits } from "../credits/credits";

export function meta() {
  return [
    { title: "UAAP Season 89 — First Semester Primer" },
    { name: "description", content: "UAAP Season 89 primer credits." },
  ];
}

export default function Home() {
  return <Credits />;
}
