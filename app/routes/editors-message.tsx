import { Link } from "react-router";
import { Sidebar } from "~/sidebar/sidebar";
import type { Route } from "./+types/sport";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Editor's Message — UAAP Season 89` }];
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 17 13.4142"
      fill="none"
      aria-hidden="true"
      className={`block shrink-0 ${className ?? ""}`}
    >
      <path
        d="M0 6.70711H16M10 0.707107L16 6.70711L10 12.7071"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EditorsMessage() {
  return (
    <main className="w-full min-h-screen grid grid-cols-1 grid-rows-1 bg-white">
      <Sidebar />
      <section className="size-full col-start-1 row-start-1 bg-white">
        <section className="bg-[url('/article-bg.svg')] bg-cover bg-black w-full h-85" />
        <Link
          to="/"
          className="mt-4 rounded-lg px-5 py-2 font-bold transition-colors bg-[#1c4480] text-white font-archivo absolute right-4 sm:right-[5vw] top-3 sm:top-5 z-10 group"
        >
          <ArrowRight className="transition-transform duration-200 group-hover:-translate-x-1.5 group-focus-visible:-translate-x-1.5 -scale-x-100 inline-block mr-2" />
          Back
        </Link>
      </section>
      <section className="size-full col-start-1 row-start-1 relative pt-24 pb-16 px-5 sm:pt-40 sm:px-[10%] lg:px-[20%] xl:px-[30%]">
        <section className="min-h-52 flex flex-col gap-2 mb-12 sm:mb-4">
          <h1 className="font-display text-white text-4xl sm:text-6xl uppercase whitespace-pre-line">
            Fight and
            <br />
            Rise Together
          </h1>
          <p className="text-white">
            By <strong>Carmela Therese Papa</strong> and{" "}
            <strong>Ravi G. Tan</strong>
          </p>
        </section>
        <article className="w-full flex flex-col gap-8 my-0 text-black">
          <p>
            <span className="font-bold uppercase text-[#1c4480]">NOW MORE</span>{" "}
            than ever, sports has become an arena not just for play, but for
            real human stories. After the passing of Chukwuemeka Divine Adili
            and Rene Clert Baterbonia, the sports community must look beyond the
            court and recognize the importance of holistic student-athlete
            well-being.
          </p>
          <p>
            Aside from the competitions student-athletes take on, their toughest
            battles are often fought and won behind the scenes—unseen and
            overlooked. In line with this, The GUIDON Sports remains committed
            to highlighting and humanizing stories that drive excellence both on
            and off the court.
          </p>
          <p>
            As the University Athletic Association of the Philippines (UAAP)
            Season 89 recognizes the value of a sporting community beyond just
            the game itself, the publication dedicates this primer to those who
            faithfully carry the Blue Eagle name. This includes the
            student-athletes, as well as the families, friends, coaches, and
            student-managers who fuel their passion.
          </p>
          <p>
            Entering Season 89 following a tumultuous buildup clouded with
            uncertainty, the Blue Eagles remain driven by the One Big Fight and
            are ready to rise above adversity. With challenges in store, we call
            the Ateneo community to rally behind our student-athletes in
            conquering the fight ahead.
          </p>
          <p>
            If there is anything we can hold onto this season, it is that we
            have a lot to play for: our born and found families, ourselves, and
            our futures.
          </p>
        </article>
      </section>
    </main>
  );
}
