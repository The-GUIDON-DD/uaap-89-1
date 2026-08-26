import { EditorsMessage } from "../editors-message/editors-message";
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
  return (
    <main className="h-dvh w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
      <div className="h-dvh w-full snap-start">
        <FrontPage />
      </div>
      <div className="h-dvh w-full snap-start">
        <EditorsMessage />
      </div>
    </main>
  );
}
