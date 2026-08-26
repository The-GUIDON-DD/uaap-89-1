import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import textureOverlay from "../public/editors-message/texture-overlay.png";
import teamPhoto from "../public/front-page/image 41.svg";

const greyCircleMotion = {
  initial: { x: -207.725, y: -461.782 },
  animate: { x: [-207.725, -207.725, 0, 0], y: [-461.782, -461.782, 0, 0] },
  transition: {
    x: {
      duration: 1.4,
      times: [0, 0.0231, 0.5695, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
    y: {
      duration: 1.4,
      times: [0, 0.0231, 0.5695, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
  },
} as const;

const orangeCircleMotion = {
  initial: { x: -208.887, y: -587.652 },
  animate: { x: [-208.887, -208.887, 0, 0], y: [-587.652, -587.652, 0, 0] },
  transition: {
    x: {
      duration: 1.4,
      times: [0, 0.0431, 0.58, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
    y: {
      duration: 1.4,
      times: [0, 0.0431, 0.58, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
  },
} as const;

const lineMotion = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 0, 1, 1] },
  transition: {
    opacity: {
      duration: 1.4,
      times: [0, 0.3714, 0.6507, 1],
      ease: ["linear", "easeOut", "linear"],
    },
  },
} as const;

const greyDashedMotion = {
  initial: { x: 331.836, y: -432.433 },
  animate: { x: [331.836, 331.836, 0, 0], y: [-432.433, -432.433, 0, 0] },
  transition: {
    x: {
      duration: 1.4,
      times: [0, 0.0898, 0.59, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
    y: {
      duration: 1.4,
      times: [0, 0.0898, 0.59, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
  },
} as const;

const dotMotion = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 0, 1, 1] },
  transition: {
    opacity: {
      duration: 1.4,
      times: [0, 0.5333, 0.8126, 1],
      ease: ["linear", "easeOut", "linear"],
    },
  },
} as const;

const bigGreyCircleMotion = {
  initial: { x: 408, y: 60 },
  animate: { x: [408, 0, 0], y: [60, 0, 0] },
  transition: {
    x: { duration: 1.4, times: [0, 0.5495, 1], ease: ["easeInOut", "linear"] },
    y: { duration: 1.4, times: [0, 0.5495, 1], ease: ["easeInOut", "linear"] },
  },
} as const;

const greenCircleMotion = {
  initial: { x: -214, y: 786 },
  animate: { x: [-214, -214, 0, 0], y: [786, 786, 0, 0] },
  transition: {
    x: {
      duration: 1.4,
      times: [0, 0.064, 0.5574, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
    y: {
      duration: 1.4,
      times: [0, 0.064, 0.5574, 1],
      ease: ["linear", "easeInOut", "linear"],
    },
  },
} as const;

const articleTitleMotion = {
  initial: { opacity: 0, y: -200 },
  animate: { opacity: [0, 0, 1, 1], y: [-200, -200, 0, 0] },
  transition: {
    opacity: {
      duration: 1.4,
      times: [0, 0.1224, 0.6219, 1],
      ease: ["linear", "easeOut", "linear"],
    },
    y: {
      duration: 1.4,
      times: [0, 0.1935, 0.6219, 1],
      ease: ["linear", "easeOut", "linear"],
    },
  },
} as const;

const readMoreMotion = {
  initial: { opacity: 0, x: -500 },
  animate: { opacity: [0, 0, 1, 1], x: [-500, -500, 0, 0] },
  transition: {
    opacity: {
      duration: 1.4,
      times: [0, 0.1224, 0.6219, 1],
      ease: ["linear", "easeOut", "linear"],
    },
    x: {
      duration: 1.4,
      times: [0, 0.1935, 0.6219, 1],
      ease: ["linear", "easeOut", "linear"],
    },
  },
} as const;

function reveal(
  // biome-ignore lint/suspicious/noExplicitAny: motion's Easing type rejects our verbatim cubic-bezier/keyframe arrays
  config: { initial: any; animate: any; transition: any },
  isInView: boolean,
) {
  return {
    initial: config.initial,
    animate: isInView ? config.animate : config.initial,
    transition: config.transition,
  };
}

export function EditorsMessage() {
  const scale = useViewportScale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="relative size-full overflow-hidden"
      style={{ background: "#121212" }}
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={teamPhoto}
      />
      <div
        className="absolute inset-0 size-full"
        style={{ background: "rgba(18,18,18,0.4)" }}
      />
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover opacity-50 pointer-events-none size-full"
        src={textureOverlay}
      />
      <div
        className="absolute inset-0 size-full"
        style={{
          backgroundImage:
            "linear-gradient(179.9396734604826deg, rgba(0,0,0,0) 3.1133%, rgb(28,68,128) 107.81%)",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full">
          {/* Grey circle */}
          <motion.div
            className="absolute flex items-center justify-center left-[1644.72px] size-[496.481px] top-[-12.46px]"
            {...reveal(greyCircleMotion, isInView)}
          >
            <div className="flex-none rotate-[6.27deg]">
              <div className="relative size-[450px]">
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
                    stroke="#707071"
                    strokeWidth="3"
                  />
                  <circle
                    cx="225"
                    cy="225"
                    r="14"
                    stroke="#707071"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute flex items-center justify-center left-[1489.88px] size-[807.609px] top-[264.65px]"
            {...reveal(orangeCircleMotion, isInView)}
          >
            <div className="flex-none rotate-[6.27deg]">
              <div className="relative size-[732px]">
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
                  <circle cx="366" cy="366" fill="#B33926" r="15" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right line dashed */}
          <div className="absolute flex h-[755.922px] items-center justify-center left-[1432.53px] top-[-87.47px] w-[461.155px]">
            <div className="flex-none rotate-[-121.39deg]">
              <motion.div
                className="h-0 relative w-[885.484px]"
                {...reveal(lineMotion, isInView)}
              >
                <div className="absolute inset-[-3px_0_0_0]">
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    height="3"
                    preserveAspectRatio="none"
                    viewBox="0 0 885.484 3"
                    width="885.484"
                  >
                    <line
                      stroke="#707071"
                      strokeDasharray="3 3"
                      strokeWidth="3"
                      x2="885.484"
                      y1="1.5"
                      y2="1.5"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Line 6 */}
          <div className="absolute flex h-[459.564px] items-center justify-center left-[1461.88px] top-[668.45px] w-[431.807px]">
            <div className="flex-none rotate-[133.22deg]">
              <motion.div
                className="h-0 relative w-[630.601px]"
                {...reveal(lineMotion, isInView)}
              >
                <div className="absolute inset-[-3px_0_0_0]">
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    height="3"
                    preserveAspectRatio="none"
                    viewBox="0 0 630.601 3"
                    width="630.601"
                  >
                    <line
                      stroke="#B33926"
                      strokeWidth="3"
                      x2="630.601"
                      y1="1.5"
                      y2="1.5"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Grey circle dashed */}
          <motion.div
            className="absolute flex items-center justify-center left-[1283px] size-[492.068px] top-[701.24px]"
            {...reveal(greyDashedMotion, isInView)}
          >
            <div className="flex-none rotate-[6.27deg]">
              <div className="relative size-[446px]">
                <div className="absolute inset-[-0.34%]">
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
                </div>
              </div>
            </div>
          </motion.div>

          {/* Intersection dot top orange */}
          <div className="absolute flex items-center justify-center left-[1685.18px] size-[33.099px] top-[339.05px]">
            <div className="flex-none rotate-[6.27deg]">
              <motion.div
                className="relative size-[30px]"
                {...reveal(dotMotion, isInView)}
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
              </motion.div>
            </div>
          </div>

          {/* Intersection dot bottom orange */}
          <div className="absolute flex items-center justify-center left-[1627.76px] size-[33.099px] top-[916.23px]">
            <div className="flex-none rotate-[6.27deg]">
              <motion.div
                className="relative size-[30px]"
                {...reveal(dotMotion, isInView)}
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
              </motion.div>
            </div>
          </div>

          {/* Left line */}
          <div className="absolute flex h-[704px] items-center justify-center left-[-11px] top-[-153px] w-[612px]">
            <div className="-rotate-[49deg] flex-none">
              <motion.div
                className="h-0 relative w-[932.824px]"
                {...reveal(lineMotion, isInView)}
              >
                <div className="absolute inset-[-3px_0_0_0]">
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    height="3"
                    preserveAspectRatio="none"
                    viewBox="0 0 932.824 3"
                    width="932.824"
                  >
                    <line
                      stroke="#707071"
                      strokeWidth="3"
                      x2="932.824"
                      y1="1.5"
                      y2="1.5"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Big grey circle */}
          <motion.div
            className="absolute left-[-515px] size-[902px] top-[-89px]"
            {...reveal(bigGreyCircleMotion, isInView)}
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

          {/* Green circle */}
          <motion.div
            className="absolute left-[107px] size-[450px] top-[-74px]"
            {...reveal(greenCircleMotion, isInView)}
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
              <circle
                cx="225"
                cy="225"
                fill="#090A0B"
                r="14"
                stroke="#707071"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* Intersection dot top green */}
          <div className="absolute flex items-center justify-center left-[370px] size-[33.099px] top-[352px]">
            <div className="flex-none rotate-[6.27deg]">
              <motion.div
                className="relative size-[30px]"
                {...reveal(dotMotion, isInView)}
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
                  <circle cx="15" cy="15" fill="#66AF45" r="15" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Article title */}
          <motion.div
            className="absolute w-[1072px] text-white"
            style={{ top: 151, left: 162, height: 504 }}
            {...reveal(articleTitleMotion, isInView)}
          >
            <p
              className="absolute left-0 right-0 top-0 leading-[99.9%] not-italic text-[40px] tracking-[-0.8px]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
              }}
            >
              A MESSAGE FROM THE EDITORS
            </p>
            <div
              className="absolute left-0 right-px top-[74px] leading-[0] not-italic"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 140,
              }}
            >
              <p className="leading-[0.9] mb-0">TITLE OF ARTICLE</p>
              <p className="leading-[0.9]">LOREM IPSUM</p>
            </div>
            <p
              className="absolute leading-[99.9%] text-[32px] tracking-[-0.64px]"
              style={{
                top: 392,
                left: "calc(50% - 535px)",
                width: 929,
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
              }}
            >
              LOREM IPSUM{" "}
              <span
                style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400 }}
              >
                lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat ....
              </span>
            </p>
          </motion.div>

          {/* Hamburger menu */}
          <div className="absolute h-[18px] left-[92px] top-[60px] w-[34px]">
            {(
              [
                ["bottom-full", "top-0"],
                ["bottom-1/2", "top-1/2"],
                ["bottom-0", "top-full"],
              ] as const
            ).map(([b, t]) => (
              <div
                key={`${b}-${t}`}
                className={`absolute ${b} ${t} left-0 right-0`}
              >
                <div className="absolute inset-[-4px_0_0_0]">
                  <svg
                    aria-hidden="true"
                    className="block size-full"
                    fill="none"
                    height="4"
                    preserveAspectRatio="none"
                    viewBox="0 0 34 4"
                    width="34"
                  >
                    <line
                      stroke="white"
                      strokeWidth="4"
                      x2="34"
                      y1="2"
                      y2="2"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Read more */}
          <motion.div
            className="absolute inset-0 overflow-visible pointer-events-none"
            {...reveal(readMoreMotion, isInView)}
          >
            <div className="absolute flex h-0 items-center justify-center left-[-1580px] top-[874.92px] w-[1697px]">
              <div className="flex-none rotate-180">
                <div className="h-0 relative w-[1697px]">
                  <div className="absolute inset-[-3px_0_0_0]">
                    <svg
                      aria-hidden="true"
                      className="block size-full"
                      fill="none"
                      height="3"
                      preserveAspectRatio="none"
                      viewBox="0 0 1697 3"
                      width="1697"
                    >
                      <line
                        stroke="white"
                        strokeWidth="3"
                        x2="1697"
                        y1="1.5"
                        y2="1.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="-translate-x-full absolute leading-[0.9] left-[347px] not-italic text-[49.422px] text-right text-white top-[854px] whitespace-nowrap"
              style={{ fontFamily: "'Abel', sans-serif" }}
            >
              Read More
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
