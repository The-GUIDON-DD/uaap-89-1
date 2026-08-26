import { Link } from "react-router";
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

export default function Sport({ params }: Route.ComponentProps) {
  const name = prettify(params.sport);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1c4480] px-6 text-center font-archivo text-white">
      <p className="text-[13px] uppercase tracking-[0.2em] text-white/60">
        UAAP Season 89 · First Semester Primer
      </p>
      <h1 className="text-[40px] font-bold leading-[1.1] sm:text-[64px]">
        {name}
      </h1>
      <p className="text-white/70">Coverage coming soon.</p>
      <Link
        to="/"
        className="mt-4 rounded-lg border border-white/40 px-5 py-2 font-bold transition-colors hover:bg-white/10"
      >
        ← Back
      </Link>
    </main>
  );
}
