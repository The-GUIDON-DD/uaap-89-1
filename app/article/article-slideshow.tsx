import { useEffect, useRef, useState } from "react";
import { SportPrimer } from "./sport-primer";
import type { SportPrimer as SportPrimerData } from "./types";

/** Below this width, scroll-lock falls back to a normal stack of sections.
 * Matches Tailwind's `lg` breakpoint, same as the primer layouts. */
const DESKTOP_QUERY = "(min-width: 1024px)";

/** Full crossfade duration, fade out plus fade in, from useReveal in
 * sport-primer.tsx. A wheel or touch gesture during one is ignored. */
const TRANSITION_MS = 1000;

/**
 * On desktop the frame never moves. Only the current sport's picture and
 * text change. A wheel tick, swipe, or arrow key advances to the next or
 * previous sport instead of scrolling the page.
 *
 * Below `lg`, renders every sport as a normal scrolling stack instead.
 */
export function ArticleSlideshow({ primers }: { primers: SportPrimerData[] }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [index, setIndex] = useState(0);
  const locked = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const go = (delta: number) => {
      if (locked.current) return;
      setIndex((i) => {
        const next = Math.min(Math.max(i + delta, 0), primers.length - 1);
        if (next === i) return i;
        locked.current = true;
        window.setTimeout(() => {
          locked.current = false;
        }, TRANSITION_MS);
        return next;
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      go(e.deltaY > 0 ? 1 : -1);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchStartY.current == null) return;
      const dy =
        touchStartY.current - (e.touches[0]?.clientY ?? touchStartY.current);
      if (Math.abs(dy) > 40) {
        go(dy > 0 ? 1 : -1);
        touchStartY.current = null;
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDesktop, primers.length]);

  if (!isDesktop) {
    return (
      <>
        {primers.map((primer) => (
          <SportPrimer key={primer.slug} primer={primer} />
        ))}
      </>
    );
  }

  // No key: SportPrimer stays mounted across slides so its children can
  // crossfade instead of hard-cutting on remount. Still remounts when the
  // layout shape changes, pinwheel to hero.
  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden">
      <SportPrimer primer={primers[index]} />
    </div>
  );
}
