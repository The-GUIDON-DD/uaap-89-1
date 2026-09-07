import { type MotionValue, motion, useTransform } from "motion/react";
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
import photoMen from "../public/front-page/photo-men.png";
import photoWomen from "../public/front-page/photo-women.png";
import textLockup from "../public/front-page/text-lockup.svg";

export function FrontPage({ progress }: { progress: MotionValue<number> }) {
  const scale = useViewportScale();

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

              <img
                alt="Ateneo Blue Eagles football players"
                className="absolute object-cover"
                style={{ left: -87, top: -188, width: 847, height: 1270 }}
                src={photoMen}
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
              <div
                className="absolute overflow-hidden"
                style={{ left: 292, top: 163, width: 928, height: 1387 }}
              >
                <img
                  alt="Ateneo Lady Eagles football players"
                  className="absolute max-w-none object-cover"
                  style={{
                    left: "-17.4%",
                    top: "-32.34%",
                    width: "131.87%",
                    height: "132.36%",
                  }}
                  src={photoWomen}
                />
              </div>
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
