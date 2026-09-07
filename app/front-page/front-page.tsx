import {
  AnimatePresence,
  type MotionValue,
  motion,
  useTransform,
} from "motion/react";
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
import cheerCombined from "../public/front-page/sports/cheer-combined.png";
import mBadminton from "../public/front-page/sports/m-badminton.png";
import mBasketball from "../public/front-page/sports/m-basketball.png";
import mBeachVolleyball from "../public/front-page/sports/m-beach-volleyball.png";
import mChess from "../public/front-page/sports/m-chess.png";
import mFootball from "../public/front-page/sports/m-football.png";
import mSwimming from "../public/front-page/sports/m-swimming.png";
import mTableTennis from "../public/front-page/sports/m-table-tennis.png";
import mTrackField from "../public/front-page/sports/m-track-field.png";
import wBadminton from "../public/front-page/sports/w-badminton.png";
import wBasketball from "../public/front-page/sports/w-basketball.png";
import wBeachVolleyball from "../public/front-page/sports/w-beach-volleyball.png";
import wChess from "../public/front-page/sports/w-chess.png";
import wFootball from "../public/front-page/sports/w-football.png";
import wSwimming from "../public/front-page/sports/w-swimming.png";
import wTableTennis from "../public/front-page/sports/w-table-tennis.png";
import wTrackField from "../public/front-page/sports/w-track-field.png";
import textLockup from "../public/front-page/text-lockup.svg";

const SPORTS = [
  { name: "Football", men: mFootball, women: wFootball },
  { name: "Basketball", men: mBasketball, women: wBasketball },
  { name: "Badminton", men: mBadminton, women: wBadminton },
  { name: "Chess", men: mChess, women: wChess },
  { name: "Table Tennis", men: mTableTennis, women: wTableTennis },
  { name: "Beach Volleyball", men: mBeachVolleyball, women: wBeachVolleyball },
  { name: "Track & Field", men: mTrackField, women: wTrackField },
  { name: "Swimming", men: mSwimming, women: wSwimming },
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
const TRANSITION = { duration: 0.65, ease: [0.4, 0, 0.2, 1] as const };

function SlidingPhoto({
  src,
  slideKey,
  alt,
  box,
  anchor = "bottom",
}: {
  src: string | null;
  slideKey: string;
  alt: string;
  box: { left: number; top: number; width: number; height: number };
  anchor?: "bottom" | "center";
}) {
  return (
    <div className="absolute overflow-hidden" style={box}>
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

export function FrontPage({ progress }: { progress: MotionValue<number> }) {
  const scale = useViewportScale();
  const [slideIndex, setSlideIndex] = useState(0);

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

  const slide = SLIDES[slideIndex];

  const scrollY = useTransform(progress, [0, 1], [0, -200]);
  const scrollOpacity = useTransform(progress, [0, 1], [1, 0]);

  return (
    <section className="relative z-20 size-full overflow-hidden bg-white">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full overflow-hidden">
          {/* Entrance: drops down from above once on load. */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ opacity: scrollOpacity, y: scrollY }}
            >
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
                box={{ left: -87, top: 0, width: 847, height: 1080 }}
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
                box={{ left: -20, top: 0, width: 1140, height: 1080 }}
              />

              <img
                alt=""
                aria-hidden="true"
                className="absolute"
                style={{ left: 721, top: 1, width: 1199, height: 1079 }}
                src={bgWhiteB}
              />
              <img
                alt="UAAP Season 89 First Semester Primer — The GUIDON"
                className="absolute"
                style={{
                  left: 1216,
                  top: 68,
                  width: 621,
                  height: 944,
                }}
                src={textLockup}
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
    </section>
  );
}
