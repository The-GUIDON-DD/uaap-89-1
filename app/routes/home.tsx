import { FrontPage } from "../front-page/front-page";

export function meta() {
  return [
    { title: "UAAP Season 89 First Semester Primer | The GUIDON" },
    {
      name: "description",
      content: "The GUIDON's UAAP Season 89 First Semester Primer.",
    },
  ];
}

export default function Home() {
  return <FrontPage />;
}
