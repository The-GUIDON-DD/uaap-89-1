import { animate } from "animejs";
import { type CSSProperties, useEffect, useRef } from "react";
import { Link } from "react-router";

import {
  type ArticleCard,
  PRIMER_DEFAULTS,
  type SportPrimer as SportPrimerData,
  type TeamPanel,
} from "./types";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ *
 * Feather-art geometry — positions in % of the design box. Every sport
 * reuses these and only supplies its own recolored SVGs: [left, r1, r2, r3].
 * ------------------------------------------------------------------ */

type ArtLeaf = { left: number; top: number; width: number; height: number };

/** 2-team pinwheel panel (design box 1111×540). */
const PANEL_ART: ArtLeaf[] = [
  { left: -15.302, top: 3.704, width: 67.147, height: 102.425 },
  { left: 50.045, top: 0, width: 35.013, height: 116.256 },
  { left: 66.246, top: 54.815, width: 18.624, height: 46.296 },
  { left: 81.638, top: 42.963, width: 23.313, height: 59.882 },
];

/** 1-team full-width hero (design box 1920×662). */
const HERO_ART: ArtLeaf[] = [
  { left: -18.01, top: 3.71, width: 54.78, height: 114.66 },
  { left: 64.17, top: 0, width: 24.84, height: 116.26 },
  { left: 75.66, top: 54.82, width: 13.21, height: 46.29 },
  { left: 86.58, top: 42.96, width: 16.54, height: 59.88 },
];

/* ------------------------------------------------------------------ *
 * Motion — the background (the black/white panels themselves) never
 * moves; only the picture and the text fade in and glide upward, once,
 * the first time each scrolls into view (700ms, ease out). Honors
 * prefers-reduced-motion by showing content in its final state instantly.
 * ------------------------------------------------------------------ */

/** Runs `enter` once, when `el` first scrolls into view. */
function onInView(
  el: Element,
  enter: () => void,
  threshold = 0.2,
  rootMargin = "0px",
) {
  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        obs.unobserve(entry.target);
        enter();
      }
    },
    { threshold, rootMargin },
  );
  io.observe(el);
  return () => io.disconnect();
}

const clearHidden = (el: HTMLElement | null) => {
  if (!el) return;
  el.style.opacity = "1";
  el.style.transform = "none";
};

/** Fades `ref`'s element in and glides it upward once it scrolls into view. */
function useReveal<T extends HTMLElement>(distance = 40) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      clearHidden(el);
      return;
    }

    return onInView(el, () => {
      animate(el, {
        opacity: [0, 1],
        translateY: [`${distance}px`, "0px"],
        duration: 700,
        ease: "out(2)",
      });
    });
  }, [distance]);

  return ref;
}

/* ------------------------------------------------------------------ *
 * Pieces
 * ------------------------------------------------------------------ */

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

/** The Druk-style sport label in a photo panel corner. */
function SportLabel({
  lines,
  side,
}: {
  lines: [string, string];
  side: "left" | "right";
}) {
  return (
    <p
      className={`pointer-events-none absolute z-10 font-display font-black uppercase leading-[1] tracking-[-0.02em] text-white text-[clamp(1.05rem,2.1vw,40px)] ${
        side === "right" ? "text-right" : "text-left"
      }`}
      style={{ top: "8%", [side]: "4.7%" }}
    >
      {lines[0]}
      {lines[1] && (
        <>
          <br />
          {lines[1]}
        </>
      )}
    </p>
  );
}

/** A team hero panel: feather art, dark gradient, players, and a label. */
function PhotoPanel({
  team,
  label,
  labelSide,
  hero,
  className,
  playersHeight = "h-[88%] sm:h-full",
}: {
  team: TeamPanel;
  label: [string, string];
  labelSide: "left" | "right";
  hero?: boolean;
  className?: string;
  /** Tailwind height class for the players image. */
  playersHeight?: string;
}) {
  const revealRef = useReveal<HTMLDivElement>();
  const template = hero ? HERO_ART : PANEL_ART;
  const coverW = hero
    ? "max(100cqw, calc(100cqh * 1920 / 662))"
    : "max(100cqw, calc(100cqh * 1111 / 540))";

  return (
    <div
      className={`relative overflow-hidden bg-black ${className ?? ""}`}
      style={{ containerType: "size" }}
    >
      {/* The picture — feather art, players, base gradient, and the sport
          label — fades in and glides upward together as one unit. The black
          panel behind it is static and never moves. */}
      <div ref={revealRef} className="absolute inset-0">
        {/* Feather art — scaled to cover the panel, centered. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            aspectRatio: hero ? "1920 / 662" : "1111 / 540",
            width: coverW,
          }}
        >
          {team.art.map((src, i) => {
            const geom = template[i];
            if (!src || !geom) return null;
            return (
              <img
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                className="absolute max-w-none select-none"
                style={{
                  left: `${geom.left}%`,
                  top: `${geom.top}%`,
                  width: `${geom.width}%`,
                  height: `${geom.height}%`,
                }}
              />
            );
          })}
        </div>

        {/* Dark gradient at the base for label/photo contrast. */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[42%] w-full opacity-50 mix-blend-multiply"
          style={{ background: "linear-gradient(to top, #000, rgba(0,0,0,0))" }}
        />

        {/* Players — sized by height, centered by the wrapper. Pinwheel
            panels stand on the bottom edge; the taller hero top-anchors so
            heads stay in frame. */}
        {team.players && (
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
              hero ? "top-[4%]" : "bottom-0"
            } ${playersHeight}`}
          >
            <img
              src={team.players}
              alt={team.playersAlt}
              className="block h-full w-auto max-w-none select-none"
            />
          </div>
        )}

        <SportLabel lines={team.label ?? label} side={labelSide} />
      </div>
    </div>
  );
}

/** Heading + blurb + "Read More", shared by both layouts. */
function ArticleContent({
  article,
  contextLabel,
  align,
}: {
  article: ArticleCard;
  contextLabel: string;
  align: "start" | "center";
}) {
  const revealRef = useReveal<HTMLDivElement>();
  const leadColor = article.leadColor ?? PRIMER_DEFAULTS.leadColor;
  const buttonColor = article.buttonColor ?? PRIMER_DEFAULTS.buttonColor;
  const buttonHover = article.buttonColor ?? PRIMER_DEFAULTS.buttonHoverColor;
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center lg:gap-[40px]" : "items-start lg:gap-[26px]"}`}
    >
      {/* Title + body fade in and glide upward together; the Read More
          button below stays static. */}
      <div
        ref={revealRef}
        className={`flex flex-col gap-3 ${centered ? "items-center lg:gap-[22px]" : "items-start lg:gap-[16px]"}`}
      >
        <h2
          className={`font-display font-black leading-[0.9] ${centered ? "text-[clamp(2rem,6vw,108px)]" : "text-[clamp(1.75rem,4.6vw,76px)]"}`}
          style={{ color: article.titleColor }}
        >
          {article.title}
        </h2>
        <p
          className={`font-bold leading-[1.05] tracking-[-0.48px] text-[clamp(1rem,1.35vw,24px)] line-clamp-5 lg:line-clamp-4 ${centered ? "max-w-[52ch]" : ""}`}
        >
          {article.lead && (
            <>
              <span style={{ color: leadColor }}>{article.lead}</span>{" "}
            </>
          )}
          <span className="font-normal text-black">{article.body}</span>
        </p>
      </div>

      <Link
        to={article.to}
        aria-label={`Read more: ${contextLabel}`}
        className="group flex h-[52px] w-[224px] max-w-full items-center justify-center gap-[9px] rounded-[7px] bg-[var(--btn)] text-white transition-colors hover:bg-[var(--btn-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#194681] focus-visible:ring-offset-2"
        style={
          {
            "--btn": buttonColor,
            "--btn-hover": buttonHover,
          } as CSSProperties
        }
      >
        <span className="font-bold text-[20px] lg:text-[24px]">
          {article.readMore ?? "Read More"}
        </span>
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Layouts
 * ------------------------------------------------------------------ */

const labelOf = (t: TeamPanel, fallback: [string, string]) =>
  (t.label ?? fallback).join(" ");

/**
 * Two-team pinwheel:
 *   ┌───────────────┬───────────┐
 *   │  team A photo │  A article│
 *   ├───────────┬───┴───────────┤
 *   │  B article │  team B photo│
 *   └───────────┴───────────────┘
 */
function TwoTeamLayout({ primer }: { primer: SportPrimerData }) {
  const [a, b] = primer.teams as [TeamPanel, TeamPanel];
  return (
    <main className="flex flex-col lg:grid lg:h-screen lg:grid-cols-[807fr_304fr_807fr] lg:grid-rows-2">
      <h1 className="sr-only">
        {primer.name} — {PRIMER_DEFAULTS.subtitle}
      </h1>

      <PhotoPanel
        team={a}
        label={primer.label}
        labelSide="right"
        className="aspect-[4/5] sm:aspect-video lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:aspect-auto lg:h-full"
      />
      <article className="flex flex-col justify-start bg-white px-8 py-10 font-archivo lg:col-start-3 lg:row-start-1 lg:h-full lg:px-[77px] lg:py-[48px]">
        <ArticleContent
          article={a.article}
          contextLabel={labelOf(a, primer.label)}
          align="start"
        />
      </article>

      <PhotoPanel
        team={b}
        label={primer.label}
        labelSide="left"
        className="aspect-[4/5] sm:aspect-video lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:aspect-auto lg:h-full"
      />
      <article className="flex flex-col justify-start bg-white px-8 py-10 font-archivo lg:col-start-1 lg:row-start-2 lg:h-full lg:px-[77px] lg:py-[48px]">
        <ArticleContent
          article={b.article}
          contextLabel={labelOf(b, primer.label)}
          align="start"
        />
      </article>
    </main>
  );
}

/** One-team layout: a full-width feather hero above a centered article. */
function OneTeamLayout({ primer }: { primer: SportPrimerData }) {
  const [a] = primer.teams;
  return (
    <main className="flex flex-col lg:min-h-screen">
      <h1 className="sr-only">
        {primer.name} — {PRIMER_DEFAULTS.subtitle}
      </h1>

      <PhotoPanel
        team={a}
        label={primer.label}
        labelSide="right"
        hero
        playersHeight="h-[108%] sm:h-[122%]"
        className="aspect-[4/5] sm:aspect-[1920/662] lg:aspect-auto lg:h-[61.3vh]"
      />
      <article className="flex flex-col items-center bg-white px-8 py-14 font-archivo lg:flex-1 lg:justify-center lg:px-[77px]">
        <ArticleContent
          article={a.article}
          contextLabel={labelOf(a, primer.label)}
          align="center"
        />
      </article>
    </main>
  );
}

/** Renders a sport's article primer, choosing the layout by team count. */
export function SportPrimer({ primer }: { primer: SportPrimerData }) {
  return primer.teams.length === 1 ? (
    <OneTeamLayout primer={primer} />
  ) : (
    <TwoTeamLayout primer={primer} />
  );
}
