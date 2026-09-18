import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import accentBack from "../public/front-page/accent-back.svg";
import accentFrontmost from "../public/front-page/accent-frontmost.svg";
import accentLine from "../public/front-page/accent-line.svg";
import accentMiddle from "../public/front-page/accent-middle.svg";
import band1 from "../public/front-page/band-1.svg";
import band2 from "../public/front-page/band-2.svg";
import bgWhiteA from "../public/front-page/bg-white-a.svg";
import bgWhiteB from "../public/front-page/bg-white-b.svg";
import logo from "../public/front-page/LOGO.svg";
import cheerCombined from "../public/front-page/sports/cheer-combined.webp";
import mBadminton from "../public/front-page/sports/m-badminton.webp";
import mFootball from "../public/front-page/sports/m-football.webp";
import mTableTennis from "../public/front-page/sports/m-table-tennis.webp";
import mTrackField from "../public/front-page/sports/m-track-field.webp";
import wBadminton from "../public/front-page/sports/w-badminton.webp";
import wBeachVolleyball from "../public/front-page/sports/w-beach-volleyball.webp";
import wFootball from "../public/front-page/sports/w-football.webp";
import wTableTennis from "../public/front-page/sports/w-table-tennis.webp";
import wTrackField from "../public/front-page/sports/w-track-field.webp";
import title from "../public/front-page/title.svg";

const SPORTS = [
  { name: "Football", men: mFootball, women: wFootball },
  { name: "Badminton", men: mBadminton, women: wBadminton },
  { name: "Table Tennis", men: mTableTennis, women: wTableTennis },
  { name: "Beach Volleyball", men: null, women: wBeachVolleyball },
  { name: "Track & Field", men: wTrackField, women: mTrackField },
] as const;

type Slide = {
  key: string;
  men: string | null;
  women: string | null;
  cheer: string | null;
};

// The cheer photo already has both men and women in a single shot, so it
// isn't paired with a men/women counterpart like the other sports — it
// gets its own centered slide instead.
const SLIDES: Slide[] = [
  ...SPORTS.map((sport) => ({
    key: sport.name,
    men: sport.men as string,
    women: sport.women as string,
    cheer: null,
  })),
  { key: "Cheer", men: null, women: null, cheer: cheerCombined },
];

const ALL_IMAGES = [
  ...SPORTS.flatMap((sport) => [sport.men, sport.women]),
  cheerCombined,
];

const SLIDE_INTERVAL_MS = 4000;

// On phones the 16:9 canvas is cropped to a narrow slice around its middle
// (x = 960), which cuts off the athletes standing left of center. Below this
// width we re-center the crop on the athletes instead.
const MOBILE_MAX_W = 768;
const MOBILE_FOCUS_X = 740;
// The cheer photo sits further left in the canvas than the paired shots.
const MOBILE_FOCUS_X_CHEER = 520;
// Per-slide overrides for photos whose subject sits off-center in the frame.
const MOBILE_FOCUS_X_BY_SLIDE: Record<string, number> = {
  "Track & Field": 840,
};
const TRANSITION = { duration: 0.65, ease: [0.4, 0, 0.2, 1] as const };

// Fades each photo out over this many design-space pixels right at the
// bottom of the canvas, so it dissolves into the shared backdrop instead of
// ending in a hard-cut line where this page meets the next one.
const BOTTOM_FADE_PX = 130;

function SlidingPhoto({
  src,
  slideKey,
  alt,
  box,
  anchor = "bottom",
  className = "",
}: {
  src: string | null;
  slideKey: string;
  alt: string;
  box: { left: number; top: number; width: number; height: number };
  anchor?: "bottom" | "center";
  className?: string;
}) {
  // Expressed in the box's own local coordinates, since that's what the
  // mask-image on this element is measured against.
  const fadeStart = Math.max(0, DESIGN_H - BOTTOM_FADE_PX - box.top);
  const fadeEnd = Math.min(box.height, DESIGN_H - box.top);
  const fadeMask = `linear-gradient(to bottom, black ${fadeStart}px, transparent ${fadeEnd}px)`;

  return (
    <div
      className={`absolute overflow-hidden ${className}`}
      style={{ ...box, maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    >
      <AnimatePresence initial={false}>
        {src && (
          <motion.img
            key={slideKey}
            alt={alt}
            className={`absolute inset-0 h-full w-full object-contain ${
              anchor === "bottom" ? "object-bottom" : "object-center"
            }`}
            src={src}
            // Cutout photos have jagged silhouettes (raised arms, rackets),
            // so a hard-edged slide can reveal a disconnected limb at the
            // clip boundary before the body follows. Pairing a short slide
            // with a fade keeps that moment translucent instead of jarring.
            initial={{ x: "22%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-22%", opacity: 0 }}
            transition={TRANSITION}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function FrontPage() {
  const scale = useViewportScale();
  const [slideIndex, setSlideIndex] = useState(0);
  const [viewportW, setViewportW] = useState(DESIGN_W);

  useEffect(() => {
    const update = () => setViewportW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Shift the canvas right so MOBILE_FOCUS_X lands mid-screen, clamped so the
  // canvas's left edge never comes into view.
  const slide = SLIDES[slideIndex];
  const focusX =
    MOBILE_FOCUS_X_BY_SLIDE[slide.key] ??
    (slide.cheer ? MOBILE_FOCUS_X_CHEER : MOBILE_FOCUS_X);
  const shiftX =
    viewportW < MOBILE_MAX_W
      ? Math.min(
          (DESIGN_W / 2 - focusX) * scale,
          (DESIGN_W / 2) * scale - viewportW / 2,
        )
      : 0;

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Warm the browser cache for every slide up front so switching slides
  // never shows a blank frame while an image is still loading.
  useEffect(() => {
    for (const src of ALL_IMAGES) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  return (
    <section className="relative z-20 size-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(calc(-50% + ${shiftX}px), -50%) scale(${scale})`,
          transition: `transform ${TRANSITION.duration}s cubic-bezier(${TRANSITION.ease.join(",")})`,
        }}
      >
        <div className="relative size-full overflow-hidden">
          {/* Entrance: drops down from above once on load. */}
          <motion.div className="absolute inset-0">
            <motion.div className="absolute inset-0">
              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 0, top: 79, width: 459, height: 719 }}
                src={accentBack}
              />

              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 0, top: 0, width: 937, height: 1080 }}
                src={band1}
              />

              <SlidingPhoto
                src={slide.men}
                slideKey={slide.key}
                alt={`Ateneo Blue Eagles ${slide.key} athletes`}
                box={{ left: -87, top: 80, width: 800, height: 1080 }}
                // Phones only have room for one athlete, so drop the one behind.
                className="hidden md:block"
              />

              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 197, top: 1, width: 1723, height: 1079 }}
                src={bgWhiteA}
              />

              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 419, top: 0, width: 1055, height: 1080 }}
                src={band2}
              />
              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 0, top: 1, width: 1031, height: 1079 }}
                src={accentMiddle}
              />

              <SlidingPhoto
                src={slide.women}
                slideKey={slide.key}
                alt={`Ateneo Lady Eagles ${slide.key} athletes`}
                box={{ left: 292, top: 100, width: 928, height: 1080 }}
              />

              <SlidingPhoto
                src={slide.cheer}
                slideKey={slide.key}
                alt="Ateneo Blue Babble Battalion cheerleaders"
                anchor="center"
                box={{ left: -20, top: 30, width: 1140, height: 1080 }}
              />

              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 721, top: 1, width: 1199, height: 1079 }}
                src={bgWhiteB}
              />
              <img
                alt="The GUIDON"
                className="absolute hidden md:block"
                style={{
                  right: "5%",
                  top: "15vh",
                  width: "20vw",
                }}
                src={logo}
              />
              <img
                alt="UAAP Season 89 First Semester Primer"
                className="absolute hidden md:block"
                style={{
                  right: "5%",
                  bottom: "15vh",
                  width: "30vw",
                }}
                src={title}
              />
              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 324, top: 540, width: 825, height: 540 }}
                src={accentFrontmost}
              />
              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 256, top: 968, width: 159, height: 112 }}
                src={accentLine}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Phones: the 16:9 canvas is cropped to its middle, which cuts off the
          right-hand logo and title, so show them as a regular overlay. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 md:hidden">
        <div className="flex flex-col items-end gap-4 bg-gradient-to-t from-white from-[85%] via-white/80 via-[93%] to-transparent px-5 pb-8 pt-12">
          <img alt="The GUIDON" className="w-[42vw] max-w-[200px]" src={logo} />
          <img
            alt="UAAP Season 89 First Semester Primer"
            className="w-[78vw] max-w-[360px]"
            src={title}
          />
        </div>
      </div>
    </section>
  );
}
