import { useEffect, useRef, useState } from "react";
import { SportPrimer } from "./sport-primer";
import type { SportPrimer as SportPrimerData } from "./types";

/** Below this width, scroll-locking a full-screen slideshow doesn't work
 * well (no room for the pinwheel, touch scroll expectations differ) — fall
 * back to a normal, naturally-scrolling stack of sections instead. Matches
 * Tailwind's `lg` breakpoint, which the primer layouts switch on too. */
const DESKTOP_QUERY = "(min-width: 1024px)";

/** How long the fade + glide-up transition takes, so a wheel/touch gesture
 * during it doesn't skip a slide. Matches sport-primer.tsx's reveal. */
const TRANSITION_MS = 700;

/**
 * The homepage is "just one slide": on desktop the frame never moves — only
 * the current sport's picture and text fade in and glide upward (700ms ease
 * out) as the user scrolls. A wheel tick, swipe, or arrow key advances to
 * the next/previous sport instead of actually scrolling the page.
 *
 * On narrow screens (below `lg`) this instead renders every sport as a
 * normal, naturally-scrolling stack — locking scroll doesn't translate well
 * to touch-scrolling a small screen.
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

  const primer = primers[index];
  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden">
      <SportPrimer key={primer.slug} primer={primer} />
    </div>
  );
}
