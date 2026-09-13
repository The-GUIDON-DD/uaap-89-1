import { animate } from "animejs";
import { type CSSProperties, useEffect, useRef, useState } from "react";
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
 * Feather art positions, in percent of the design box. Shared by every
 * sport; each sport only supplies its own SVGs: [left, r1, r2, r3].
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
 * The black/white panels never move. Only the picture and text move,
 * with the same fade and glide up, 700ms ease out:
 *
 *  1. Element scrolls into view for the first time: fades in.
 *  2. Data changes while already on screen (desktop slideshow):
 *     fades out, swaps content, fades back in. Same element the whole
 *     time, so it's a real crossfade, not a hard cut.
 *
 * Reduced motion skips straight to the final state.
 * ------------------------------------------------------------------ */

/** True if at least `ratio` of el's area is already inside the viewport. */
function isVisible(el: Element, ratio: number) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;
  const visibleW =
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
  const visibleH =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  if (visibleW <= 0 || visibleH <= 0) return false;
  return (visibleW * visibleH) / (rect.width * rect.height) >= ratio;
}

/**
 * Runs enter once, when el first scrolls into view. Never gets stuck:
 * checks synchronously first (an already-on-screen element, like the
 * current slide in the desktop slideshow, shouldn't wait on an async
 * callback a backgrounded or unfocused tab can delay indefinitely), and
 * if it has to wait, also rechecks on visibilitychange and after a flat
 * timeout, since a backgrounded tab can throttle IntersectionObserver
 * itself past the point of ever firing.
 */
function onInView(
  el: Element,
  enter: () => void,
  threshold = 0.2,
  rootMargin = "0px",
) {
  if (isVisible(el, threshold)) {
    enter();
    return () => {};
  }

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    cleanup();
    enter();
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          finish();
        }
      }
    },
    { threshold, rootMargin },
  );
  io.observe(el);

  const onVisibilityChange = () => {
    if (!document.hidden && isVisible(el, threshold)) finish();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const fallback = window.setTimeout(() => {
    if (isVisible(el, threshold)) finish();
  }, 1500);

  function cleanup() {
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.clearTimeout(fallback);
  }

  return cleanup;
}

const clearHidden = (el: HTMLElement | null) => {
  if (!el) return;
  el.style.opacity = "1";
  el.style.transform = "none";
};

const FADE_OUT_MS = 260;
const REVEAL_MS = 700;

/**
 * Fades value in on first view, crossfades to a new value on every change
 * after that. Returns the ref to attach and the value to render, which
 * lags briefly behind value during a swap's fade-out.
 */
function useReveal<T>(value: T, distance = 40) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRef(value);
  const enteredView = useRef(false);
  const [rendered, setRendered] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shown.current !== value) {
      // Not visible yet, swap without animating. onInView below reveals
      // whichever value is current once it is.
      if (!enteredView.current) {
        shown.current = value;
        setRendered(value);
        return;
      }
      if (prefersReducedMotion()) {
        shown.current = value;
        setRendered(value);
        return;
      }
      animate(el, {
        opacity: [1, 0],
        duration: FADE_OUT_MS,
        ease: "out(2)",
      });
      // Plain timer, not animejs's onComplete, since that doesn't fire
      // reliably when the tab is throttled.
      const timer = window.setTimeout(() => {
        shown.current = value;
        setRendered(value);
        animate(el, {
          opacity: [0, 1],
          translateY: [`${distance}px`, "0px"],
          duration: REVEAL_MS,
          ease: "out(2)",
        });
      }, FADE_OUT_MS);
      return () => {
        window.clearTimeout(timer);
      };
    }

    if (enteredView.current) return;
    if (prefersReducedMotion()) {
      enteredView.current = true;
      clearHidden(el);
      return;
    }
    return onInView(el, () => {
      enteredView.current = true;
      animate(el, {
        opacity: [0, 1],
        translateY: [`${distance}px`, "0px"],
        duration: REVEAL_MS,
        ease: "out(2)",
      });
    });
  }, [value, distance]);

  return { ref, value: rendered };
}

const WIPE_OUT_MS = 300;
const WIPE_IN_MS = 700;
const WIPE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const setWipe = (el: HTMLElement, shown: boolean) => {
  el.style.clipPath = shown ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)";
};

/**
 * Reveals value on ref's element in place: a clip-path wipe that opens
 * from the right edge toward the left, like text appearing under a
 * curtain pulled off to the left. No fade, no movement. Fades straight
 * to shown on first view, wipes closed then open again on later changes.
 */
function useWipeReveal<T, E extends HTMLElement = HTMLDivElement>(value: T) {
  const ref = useRef<E>(null);
  const shown = useRef(value);
  const enteredView = useRef(false);
  const [rendered, setRendered] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shown.current !== value) {
      if (!enteredView.current) {
        shown.current = value;
        setRendered(value);
        return;
      }
      if (prefersReducedMotion()) {
        shown.current = value;
        setRendered(value);
        return;
      }
      el.style.transition = `clip-path ${WIPE_OUT_MS}ms ease-in`;
      setWipe(el, false);
      const timer = window.setTimeout(() => {
        shown.current = value;
        setRendered(value);
        el.style.transition = "none";
        setWipe(el, false);
        void el.offsetWidth;
        el.style.transition = `clip-path ${WIPE_IN_MS}ms ${WIPE_EASE}`;
        setWipe(el, true);
      }, WIPE_OUT_MS);
      return () => {
        window.clearTimeout(timer);
      };
    }

    if (enteredView.current) return;
    if (prefersReducedMotion()) {
      enteredView.current = true;
      el.style.clipPath = "none";
      return;
    }
    setWipe(el, false);
    return onInView(el, () => {
      enteredView.current = true;
      el.style.transition = `clip-path ${WIPE_IN_MS}ms ${WIPE_EASE}`;
      setWipe(el, true);
    });
  }, [value]);

  return { ref, value: rendered };
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
      className={`pointer-events-none absolute z-10 font-display font-black uppercase leading-[1] tracking-[-0.02em] text-white text-[clamp(1.05rem,3.6cqw,44px)] ${
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
  const { ref, value: shownTeam } = useReveal(team, hero ? 56 : 40);
  const template = hero ? HERO_ART : PANEL_ART;
  const coverW = hero
    ? "max(100cqw, calc(100cqh * 1920 / 662))"
    : "max(100cqw, calc(100cqh * 1111 / 540))";

  return (
    <div
      className={`relative overflow-hidden bg-black ${className ?? ""}`}
      style={{ containerType: "size" }}
    >
      {/* Picture: art, players, gradient, label. Fades and glides as one
          unit. The black panel behind it stays static. */}
      <div ref={ref} className="absolute inset-0">
        {/* Feather art, scaled to cover the panel, centered. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            aspectRatio: hero ? "1920 / 662" : "1111 / 540",
            width: coverW,
          }}
        >
          {shownTeam.art.map((src, i) => {
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

        {/* Players sized by height, centered. Pinwheel stands on the
            bottom edge; hero anchors top so heads stay in frame. */}
        {shownTeam.players && (
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
              hero ? "top-[4%]" : "bottom-0"
            } ${playersHeight}`}
          >
            <img
              src={shownTeam.players}
              alt={shownTeam.playersAlt}
              className="block h-full w-auto max-w-none select-none"
            />
          </div>
        )}

        <SportLabel lines={shownTeam.label ?? label} side={labelSide} />
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
  const { ref, value: shownArticle } = useWipeReveal(article);
  const { ref: buttonRef, value: shownButton } = useWipeReveal<
    ArticleCard,
    HTMLAnchorElement
  >(article);
  const leadColor = shownArticle.leadColor ?? PRIMER_DEFAULTS.leadColor;
  const buttonColor = shownButton.buttonColor ?? PRIMER_DEFAULTS.buttonColor;
  const buttonHover =
    shownButton.buttonColor ?? PRIMER_DEFAULTS.buttonHoverColor;
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-8 ${centered ? "items-center text-center lg:gap-[48px]" : "items-start lg:gap-[40px]"}`}
    >
      {/* Title and body stay in place; a clip-path wipe reveals them. */}
      <div
        ref={ref}
        className={`flex flex-col gap-3 ${centered ? "items-center lg:gap-[22px]" : "items-start lg:gap-[20px]"}`}
      >
        <h2
          className={`font-display font-black leading-[0.9] ${centered ? "text-[clamp(2rem,6.1cqw,108px)]" : "text-[clamp(1.75rem,16.1cqw,120px)]"}`}
          style={{ color: shownArticle.titleColor }}
        >
          {shownArticle.title}
        </h2>
        <p
          className={`font-bold leading-[1.05] tracking-[-0.48px] line-clamp-5 lg:line-clamp-4 ${centered ? "max-w-[52ch] text-[clamp(1rem,1.4cqw,24px)]" : "text-[clamp(1rem,3.7cqw,26px)]"}`}
        >
          {shownArticle.lead && (
            <>
              <span style={{ color: leadColor }}>{shownArticle.lead}</span>{" "}
            </>
          )}
          <span className="font-normal text-black">{shownArticle.body}</span>
        </p>
      </div>

      <Link
        ref={buttonRef}
        to={shownButton.to}
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
          {shownButton.readMore ?? "Read More"}
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
      <article
        className="flex flex-col justify-center bg-white px-8 py-10 font-archivo lg:col-start-3 lg:row-start-1 lg:h-full lg:px-[80px] lg:py-[64px]"
        style={{ containerType: "inline-size" }}
      >
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
      <article
        className="flex flex-col justify-center bg-white px-8 py-10 font-archivo lg:col-start-1 lg:row-start-2 lg:h-full lg:px-[80px] lg:py-[64px]"
        style={{ containerType: "inline-size" }}
      >
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
      <article
        className="flex flex-col items-center bg-white px-8 py-14 font-archivo lg:flex-1 lg:justify-center lg:px-[77px]"
        style={{ containerType: "inline-size" }}
      >
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
