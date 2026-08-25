import { Sidebar } from "../sidebar/sidebar";

export function meta() {
  return [
    { title: "UAAP Season 89 — First Semester Primer" },
    { name: "description", content: "UAAP Season 89 sports primer." },
  ];
}

export default function Home() {
  return <Sidebar />;
}
