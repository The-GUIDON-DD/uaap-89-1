import { animate, stagger } from "animejs";
import { type CSSProperties, type Ref, useEffect, useRef } from "react";
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
 * Motion — directional swipe-in on view (mirrored by panel side),
 * echoing the season 88 primer's parallax photo reveals and overflow-hidden
 * text wipes (title from the adjacent photo, body from above). Honors reduced-motion.
 *
 * Every panel derives its swipe direction from its layout position, so the
 * effect is fully generalized — any sport's data gets the right mirroring.
 * ------------------------------------------------------------------ */

/** Which side an element swipes in from ("up" = vertical only). */
type SwipeFrom = "left" | "right" | "up";

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

/** Initial clip-reveal offset for article titles. "up" enters from the bottom. */
const titleInitialTransform = (from: SwipeFrom) =>
  from === "left"
    ? "translateX(-100%)"
    : from === "right"
      ? "translateX(100%)"
      : "translateY(100%)";

/** Bars start offset toward the bottom-right; players start below their panel. */
export const ART_INITIAL = "translate(60px, 84px)";
export const PLAYERS_INITIAL = "translateY(70%)";

/**
 * Reveals a photo panel — no fades. The feather bars slide in from the
 * bottom-right with staggered delays, the players rise up from the bottom
 * (clipped by the panel), and the label clip-wipes in from its corner side.
 * Honors reduced-motion.
 */
function usePhotoReveal(labelSide: "left" | "right") {
  const panelRef = useRef<HTMLDivElement>(null);
  const playersRef = useRef<HTMLImageElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const players = playersRef.current;
    const label = labelRef.current;
    const leaves = artRef.current
      ? (Array.from(artRef.current.children) as HTMLElement[])
      : [];
    const labelX = labelSide === "right" ? "105%" : "-105%";

    if (prefersReducedMotion()) {
      clearHidden(players);
      clearHidden(label);
      leaves.forEach(clearHidden);
      return;
    }

    return onInView(
      panel,
      () => {
        // Bars enter from the bottom-right, with varying (staggered) delays.
        if (leaves.length) {
          animate(leaves, {
            translateX: ["60px", "0px"],
            translateY: ["84px", "0px"],
            delay: stagger(110),
            duration: 900,
            ease: "out(2)",
          });
        }
        // Label clip-wipes in from its own corner side.
        if (label) {
          animate(label, {
            translateX: [labelX, "0%"],
            duration: 850,
            delay: 120,
            ease: "out(3)",
          });
        }
        // Players rise up from the bottom.
        if (players) {
          animate(players, {
            translateY: ["70%", "0%"],
            duration: 1050,
            delay: 120,
            ease: "out(3)",
          });
        }
      },
      0.2,
      // Trigger a little after the panel edge enters, so tall heroes reveal
      // once their players are actually on screen.
      "-12% 0px -12% 0px",
    );
  }, [labelSide]);

  return { panelRef, playersRef, artRef, labelRef };
}

/**
 * Reveals an article: title clips in horizontally from the adjacent photo side
 * (or vertically when `from` is `"up"`), body slides down from above. The Read
 * More button stays static — only the text animates.
 */
function useArticleReveal(from: SwipeFrom) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const title = titleRef.current;
    const body = bodyRef.current;

    if (prefersReducedMotion()) {
      for (const t of [title, body]) clearHidden(t);
      return;
    }

    return onInView(
      el,
      () => {
        if (title) {
          animate(title, {
            ...(from === "left"
              ? { translateX: ["-100%", "0%"] }
              : from === "right"
                ? { translateX: ["100%", "0%"] }
                : { translateY: ["100%", "0%"] }),
            duration: 900,
            ease: "out(3)",
          });
        }
        if (body) {
          animate(body, {
            translateY: ["-100%", "0%"],
            duration: 800,
            delay: 130,
            ease: "out(2)",
          });
        }
      },
      0.25,
    );
  }, [from]);

  return { ref, titleRef, bodyRef };
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
  labelRef,
}: {
  lines: [string, string];
  side: "left" | "right";
  labelRef?: Ref<HTMLParagraphElement>;
}) {
  return (
    // Clip-mask wrapper so the label wipes in from its corner (no fade).
    <div
      className={`pointer-events-none absolute z-10 overflow-hidden ${
        side === "right" ? "text-right" : "text-left"
      }`}
      style={{ top: "8%", [side]: "4.7%" }}
    >
      <p
        ref={labelRef}
        className="font-display font-black uppercase leading-[1] tracking-[-0.02em] text-white text-[clamp(1.05rem,2.1vw,40px)] will-change-transform"
        style={{
          transform:
            side === "right" ? "translateX(105%)" : "translateX(-105%)",
        }}
      >
        {lines[0]}
        {lines[1] && (
          <>
            <br />
            {lines[1]}
          </>
        )}
      </p>
    </div>
  );
}

/** A team hero panel: feather art, dark gradient, animated players, a label. */
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
  const { panelRef, playersRef, artRef, labelRef } = usePhotoReveal(labelSide);
  const template = hero ? HERO_ART : PANEL_ART;
  const coverW = hero
    ? "max(100cqw, calc(100cqh * 1920 / 662))"
    : "max(100cqw, calc(100cqh * 1111 / 540))";

  return (
    <div
      ref={panelRef}
      className={`relative overflow-hidden bg-black ${className ?? ""}`}
      style={{ containerType: "size" }}
    >
      {/* Feather art — scaled to cover the panel, centered. */}
      <div
        ref={artRef}
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
              className="absolute max-w-none select-none will-change-transform"
              style={{
                transform: ART_INITIAL,
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

      {/* Players — sized by height, centered by the wrapper (so the reveal
          transform doesn't fight the centering). Pinwheel panels stand on the
          bottom edge; the taller hero top-anchors so heads stay in frame. */}
      {team.players && (
        <div
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
            hero ? "top-[4%]" : "bottom-0"
          } ${playersHeight}`}
        >
          <img
            ref={playersRef}
            src={team.players}
            alt={team.playersAlt}
            className="block h-full w-auto max-w-none select-none will-change-transform"
            style={{ transform: PLAYERS_INITIAL }}
          />
        </div>
      )}

      <SportLabel
        lines={team.label ?? label}
        side={labelSide}
        labelRef={labelRef}
      />
    </div>
  );
}

/** Heading + blurb + "Read More", shared by both layouts. */
function ArticleContent({
  article,
  contextLabel,
  align,
  from,
}: {
  article: ArticleCard;
  contextLabel: string;
  align: "start" | "center";
  /** Side the title swipes in from (derived from layout position). */
  from: SwipeFrom;
}) {
  const { ref, titleRef, bodyRef } = useArticleReveal(from);
  const leadColor = article.leadColor ?? PRIMER_DEFAULTS.leadColor;
  const buttonColor = article.buttonColor ?? PRIMER_DEFAULTS.buttonColor;
  const buttonHover = article.buttonColor ?? PRIMER_DEFAULTS.buttonHoverColor;
  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 ${centered ? "items-center text-center lg:gap-[40px]" : "items-start lg:gap-[26px]"}`}
    >
      <div
        className={`flex flex-col gap-3 ${centered ? "items-center lg:gap-[22px]" : "items-start lg:gap-[16px]"}`}
      >
        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className={`font-display font-black leading-[0.9] will-change-transform ${centered ? "text-[clamp(2rem,6vw,108px)]" : "text-[clamp(1.75rem,4.6vw,76px)]"}`}
            style={{
              color: article.titleColor,
              transform: titleInitialTransform(from),
            }}
          >
            {article.title}
          </h2>
        </div>
        <div className="overflow-hidden">
          <p
            ref={bodyRef}
            className={`font-bold leading-[1.05] tracking-[-0.48px] text-[clamp(1rem,1.35vw,24px)] line-clamp-5 lg:line-clamp-4 will-change-transform ${centered ? "max-w-[52ch]" : ""}`}
            style={{ transform: "translateY(-100%)" }}
          >
            {article.lead && (
              <>
                <span style={{ color: leadColor }}>{article.lead}</span>{" "}
              </>
            )}
            <span className="font-normal text-black">{article.body}</span>
          </p>
        </div>
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
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
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

      {/* Top-left photo; top-right article title wipes in from the left. */}
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
          from="left"
        />
      </article>

      {/* Bottom-left article title wipes in from the left; bottom-right photo. */}
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
          from="left"
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
          from="up"
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
