import { Link } from "react-router";
import { writeups } from "~/article/data/writeups";
import { Sidebar } from "~/sidebar/sidebar";
import type { Route } from "./+types/sport";

function prettify(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${prettify(params.sport)} — UAAP Season 89` }];
}

export function SportNotFound({ sportName }: { sportName: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1c4480] px-6 text-center font-archivo text-white">
      <p className="text-[13px] uppercase tracking-[0.2em] text-white/60">
        UAAP Season 89 · First Semester Primer
      </p>
      <h1 className="text-[40px] font-bold leading-[1.1] sm:text-[64px]">
        {sportName}
      </h1>
      <p className="text-white/70">Coverage coming soon.</p>
      <Link
        to="/"
        className="mt-4 rounded-lg px-5 py-2 font-bold transition-colors hover:bg-white/10 group"
      >
        <span className="transition-all duration-150 relative group-hover:right-0.5">
          ←
        </span>{" "}
        Back
      </Link>
    </main>
  );
}

function ArticleContent({ article }: { article: string }) {
  const paragraphs = article.split("\n\n");
  const firstTwoWords = paragraphs[0].split(" ").slice(0, 2).join(" ");
  return (
    <article className="w-full flex flex-col gap-8 my-8">
      {/* render first paragraph */}
      <p>
        <span className="font-bold uppercase text-[#1c4480]">
          {firstTwoWords}{" "}
        </span>
        {paragraphs[0].split(" ").slice(2).join(" ")}
      </p>
      {paragraphs.slice(1).map((para) => (
        <p key={para}>{para}</p>
      ))}
    </article>
  );
}

function Bylines({ bylines }: { bylines: string[] }) {
  switch (bylines.length) {
    case 0:
      return null;
    case 1:
      return (
        <p className="text-white">
          By <strong>{bylines[0]}</strong>
        </p>
      );
    default: {
      return (
        <p className="text-white">
          By{" "}
          {bylines.map((byline, ix) =>
            ix < bylines.length - 1 ? (
              <>
                <strong>{byline}</strong>,{" "}
              </>
            ) : (
              <>
                and <strong>{byline}</strong>
              </>
            ),
          )}
        </p>
      );
    }
  }
}

/** Right-pointing arrow for the "Read More" button. */
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

export default function Sport({ params }: Route.ComponentProps) {
  const sportKey = params.sport;
  if (!(sportKey in writeups)) {
    return <SportNotFound sportName={prettify(params.sport)} />;
  }
  const sportData = writeups[sportKey as keyof typeof writeups];

  return (
    <main className="w-full min-h-screen grid grid-cols-1 grid-rows-1">
      <Sidebar />
      <section className="size-full col-start-1 row-start-1 bg-white">
        <section className="bg-[url('/article-bg.svg')] bg-cover bg-black w-full h-85" />
        <Link
          to="/"
          className="mt-4 rounded-lg px-5 py-2 font-bold transition-colors bg-[#1c4480] text-white font-archivo absolute right-[5vw] top-5 group"
        >
          <ArrowRight className="transition-transform duration-200 group-hover:-translate-x-1.5 group-focus-visible:-translate-x-1.5 -scale-x-100 inline-block mr-2" />
          Back
        </Link>
      </section>
      <section className="size-full col-start-1 row-start-1 relative top-20 px-[30%]">
        <section className="h-52 flex flex-col gap-2">
          <h2 className="font-display text-[#d29300] text-3xl">
            {sportData.name}
          </h2>
          <h1 className="font-display text-white text-6xl uppercase whitespace-pre">
            {sportData.title}
          </h1>
          <Bylines bylines={sportData.bylines as string[]} />
        </section>
        <img
          alt={`${sportData.name} Team`}
          className="w-full"
          src={sportData.picture}
        />
        <ArticleContent article={sportData.article} />
      </section>
    </main>
  );
}
