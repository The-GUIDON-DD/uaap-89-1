import { Credits } from "~/credits/credits";
import { EditorsMessage } from "~/editors-message/editors-message";
import { FrontPage } from "~/front-page/front-page";
import { Sidebar } from "~/sidebar/sidebar";
import { badminton } from "../article/data/badminton";
import { basketball } from "../article/data/basketball";
import { BeachVolleyball } from "../article/data/beach-volleyball";
import { cheerdance } from "../article/data/cheerdance";
import { chess } from "../article/data/chess";
import { football } from "../article/data/football";
import { Swimming } from "../article/data/swimming";
import { TableTennis } from "../article/data/table-tennis";
import { TrackAndField } from "../article/data/track-and-field";
import { SportPrimer } from "../article/sport-primer";

export function meta() {
  return [
    { title: "UAAP Season 89 — First Semester Primer" },
    { name: "description", content: "UAAP Season 89 sports primer." },
  ];
}

export default function Home() {
  return (
    <main>
      <Sidebar />
      <div className="h-dvh w-full snap-start">
        <FrontPage />
      </div>
      <div className="h-dvh w-full snap-start">
        <EditorsMessage />
      </div>
      <section>
        <SportPrimer primer={basketball} />
        <SportPrimer primer={football} />
        <SportPrimer primer={badminton} />
        <SportPrimer primer={TableTennis} />
        <SportPrimer primer={BeachVolleyball} />
        <SportPrimer primer={Swimming} />
        <SportPrimer primer={TrackAndField} />
        <SportPrimer primer={chess} />
        <SportPrimer primer={cheerdance} />
      </section>
      <Credits />
    </main>
  );
}
