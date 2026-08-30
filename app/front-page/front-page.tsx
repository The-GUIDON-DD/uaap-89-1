import { type MotionValue, motion, useTransform } from "motion/react";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import textLockup from "../public/front-page/Text.svg";

export function FrontPage({ progress }: { progress: MotionValue<number> }) {
  const scale = useViewportScale();

  // Exit/reentry: as the user scrolls toward the next page the title lifts
  // away and fades, reversing cleanly on the way back.
  const scrollY = useTransform(progress, [0, 1], [0, -200]);
  const scrollOpacity = useTransform(progress, [0, 1], [1, 0]);

  return (
    <section className="relative size-full overflow-hidden">
      {/* The shared photo/tint/gradient backdrop and the shared decorative circles
          both live once in Home, so the background is pixel-identical on every
          page and never appears to move, reset, or shift when scrolling. */}

      {/* Title lockup: authored on a 1920x1080 canvas, scaled and centered to fit
          any viewport. z-20 keeps it above the shared circles layer (z-10). */}
      <div
        className="absolute left-1/2 top-1/2 z-20"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full">
          {/* Outer layer: entrance only — drops down from above once on load. */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Inner layer: scroll-linked exit/reentry, composes with the entrance
                above since translateY and opacity naturally combine when nested. */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: scrollOpacity, y: scrollY }}
            >
              <div className="-translate-x-1/2 absolute h-[353.496px] left-[calc(50%+2.5px)] top-[137px] w-[1603px]">
                <img
                  alt="UAAP Season 89 First Semester Primer — The GUIDON"
                  className="block size-full"
                  src={textLockup}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
