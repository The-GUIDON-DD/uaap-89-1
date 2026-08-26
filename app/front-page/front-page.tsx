import { motion } from "motion/react";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import teamPhoto from "../public/front-page/image 41.svg";
import textLockup from "../public/front-page/Text.svg";

const popEase = [0, 0, 0, 1.011];

// biome-ignore lint/suspicious/noExplicitAny: motion's Easing type rejects our verbatim cubic-bezier/keyframe arrays
const imgMotion: any = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 1] },
  transition: { opacity: { duration: 0.9, times: [0, 1], ease: "linear" } },
};

// biome-ignore lint/suspicious/noExplicitAny: motion's Easing type rejects our verbatim cubic-bezier/keyframe arrays
const expandMotion: any = {
  initial: { scale: 0 },
  animate: { scale: [0, 0, 1, 1] },
  transition: {
    scale: {
      duration: 0.9,
      times: [0, 0.15, 0.65, 1],
      ease: ["linear", popEase, "linear"],
    },
  },
};

// biome-ignore lint/suspicious/noExplicitAny: motion's Easing type rejects our verbatim cubic-bezier/keyframe arrays
const textMotion: any = {
  initial: { opacity: 0, y: -200 },
  animate: { opacity: [0, 1, 1], y: [-200, -200, 0, 0] },
  transition: {
    opacity: {
      duration: 0.9,
      times: [0, 0.777, 1],
      ease: ["easeOut", "linear"],
    },
    y: {
      duration: 0.9,
      times: [0, 0.1106, 0.777, 1],
      ease: ["linear", "easeOut", "linear"],
    },
  },
};

function GreenCircle() {
  return (
    <>
      <motion.div
        className="absolute left-[-107px] size-[450px] top-[712px]"
        {...expandMotion}
      >
        <svg
          aria-hidden="true"
          className="absolute block inset-0 size-full"
          fill="none"
          height="450"
          preserveAspectRatio="none"
          viewBox="0 0 450 450"
          width="450"
        >
          <circle
            cx="225"
            cy="225"
            r="223.5"
            stroke="#66AF45"
            strokeWidth="3"
          />
        </svg>
      </motion.div>
      <div
        className="absolute left-[103px] size-[30px] top-[922px]"
        data-name="Center"
      >
        <svg
          aria-hidden="true"
          className="absolute block inset-0 size-full"
          fill="none"
          height="30"
          preserveAspectRatio="none"
          viewBox="0 0 30 30"
          width="30"
        >
          <circle cx="15" cy="15" r="14" stroke="#707071" strokeWidth="2" />
        </svg>
      </div>
    </>
  );
}

function OrangeCircle() {
  return (
    <>
      <motion.div
        className="absolute left-[1318.8px] size-[732px] top-[-285.2px]"
        {...expandMotion}
      >
        <svg
          aria-hidden="true"
          className="absolute block inset-0 size-full"
          fill="none"
          height="732"
          preserveAspectRatio="none"
          viewBox="0 0 732 732"
          width="732"
        >
          <circle
            cx="366"
            cy="366"
            r="364.5"
            stroke="#B33926"
            strokeWidth="3"
          />
        </svg>
      </motion.div>
      <div
        className="absolute left-[1669.8px] size-[30px] top-[65.8px]"
        data-name="Center"
      >
        <svg
          aria-hidden="true"
          className="absolute block inset-0 size-full"
          fill="none"
          height="30"
          preserveAspectRatio="none"
          viewBox="0 0 30 30"
          width="30"
        >
          <circle cx="15" cy="15" fill="#B33926" r="15" />
        </svg>
      </div>
    </>
  );
}

function GreyCircle() {
  return (
    <div className="absolute flex items-center justify-center left-[1437px] size-[496.481px] top-[-475px]">
      <div className="flex-none rotate-[6.27deg]">
        <div className="relative size-[450px]" data-name="Grey circle">
          <svg
            aria-hidden="true"
            className="absolute block inset-0 size-full"
            fill="none"
            height="450"
            preserveAspectRatio="none"
            viewBox="0 0 450 450"
            width="450"
          >
            <g>
              <circle
                cx="225"
                cy="225"
                r="223.5"
                stroke="#707071"
                strokeWidth="3"
              />
              <circle
                cx="225"
                cy="225"
                fill="#090A0B"
                r="14"
                stroke="#707071"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function FrontPage() {
  const scale = useViewportScale();

  return (
    <section
      className="relative size-full overflow-hidden"
      style={{ background: "#121212" }}
    >
      <motion.div className="absolute inset-0" {...imgMotion}>
        <img
          alt="Ateneo Blue Eagles basketball team lined up on court"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={teamPhoto}
        />
      </motion.div>

      <div
        className="absolute inset-0 size-full"
        style={{ background: "rgba(18,18,18,0.6)" }}
      />
      <div
        className="absolute inset-0 size-full"
        style={{
          backgroundImage:
            "linear-gradient(179.9396734604826deg, rgba(0,0,0,0) 3.1133%, rgb(28,68,128) 107.81%)",
        }}
      />

      {/* Decorative graphic + title lockup: authored on a 1920x1080 canvas, scaled and
          centered to fit any viewport without distorting the circles or overlapping edges. */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full">
          <motion.div
            className="absolute left-[-107px] size-[902px] top-[-29px]"
            {...expandMotion}
          >
            <svg
              aria-hidden="true"
              className="absolute block inset-0 size-full"
              fill="none"
              height="902"
              preserveAspectRatio="none"
              viewBox="0 0 902 902"
              width="902"
            >
              <circle
                cx="451"
                cy="451"
                r="449.5"
                stroke="#707071"
                strokeWidth="3"
              />
            </svg>
          </motion.div>

          <GreenCircle />
          <OrangeCircle />

          <motion.div
            className="absolute left-[1642.034px] size-[446px] top-[297.034px]"
            {...expandMotion}
          >
            <svg
              aria-hidden="true"
              className="block size-full"
              fill="none"
              height="449"
              preserveAspectRatio="none"
              viewBox="0 0 449 449"
              width="449"
            >
              <circle
                cx="224.5"
                cy="224.5"
                r="223"
                stroke="#707071"
                strokeDasharray="3 3"
                strokeWidth="3"
              />
            </svg>
          </motion.div>

          <GreyCircle />

          <motion.div className="absolute inset-0" {...textMotion}>
            <div className="-translate-x-1/2 absolute h-[353.496px] left-[calc(50%+2.5px)] top-[137px] w-[1603px]">
              <img
                alt="UAAP Season 89 First Semester Primer — The GUIDON"
                className="block size-full"
                src={textLockup}
              />
            </div>
          </motion.div>

          <div className="absolute flex h-[4px] items-center justify-center left-[419px] top-[337px] w-[11px]">
            <div className="flex-none rotate-[160.02deg]">
              <div className="h-0 relative w-[11.705px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    height="1"
                    preserveAspectRatio="none"
                    viewBox="0 0 11.7047 1"
                    width="11.7047"
                  >
                    <line stroke="white" x2="11.7047" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
