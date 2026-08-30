import {
  type MotionValue,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";

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

/**
 * A connecting line. Slides in/out horizontally (true screen-space, independent
 * of the line's own rotation) driven directly by scroll progress, so it enters
 * as the page scrolls in and reverses cleanly on the way back out.
 */
function Line({
  progress,
  fromX,
  outerClassName,
  rotateClassName,
  lineWidth,
  stroke,
  dashed,
}: {
  progress: MotionValue<number>;
  fromX: number;
  outerClassName: string;
  rotateClassName: string;
  lineWidth: number;
  stroke: string;
  dashed?: boolean;
}) {
  const x = useTransform(progress, [0, 1], [fromX, 0]);

  return (
    <motion.div className={outerClassName} style={{ x }}>
      <div className={rotateClassName}>
        <div className="h-0 relative" style={{ width: lineWidth }}>
          <div className="absolute inset-[-3px_0_0_0]">
            <svg
              aria-hidden="true"
              className="block size-full"
              fill="none"
              height="3"
              preserveAspectRatio="none"
              viewBox={`0 0 ${lineWidth} 3`}
              width={lineWidth}
            >
              <line
                stroke={stroke}
                strokeDasharray={dashed ? "3 3" : undefined}
                strokeWidth="3"
                x2={lineWidth}
                y1="1.5"
                y2="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EditorsMessage({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const scale = useViewportScale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  // Article title and Read More glide in/out continuously with scroll, like the
  // circles and lines, instead of firing once.
  const articleOpacity = useTransform(progress, [0, 1], [0, 1]);
  const articleY = useTransform(progress, [0, 1], [-200, 0]);
  const readMoreOpacity = useTransform(progress, [0, 1], [0, 1]);
  const readMoreX = useTransform(progress, [0, 1], [-500, 0]);

  // The shared green circle's center dot is genuinely transparent. Where it
  // travels directly over these lines, punch a matching hole through the
  // lines themselves (in this wrapper's own local/design-space coordinates)
  // so the dot only ever reveals the plain background, never a line.
  const dotMaskX = useTransform(progress, [0, 1], [118, 332]);
  const dotMaskY = useTransform(progress, [0, 1], [937, 151]);
  const linesMask = useMotionTemplate`radial-gradient(circle at ${dotMaskX}px ${dotMaskY}px, transparent 15px, black 16px)`;
  // motion's `style` prop only fast-path-updates a known whitelist of CSS
  // properties, which doesn't include mask-image — so it's applied here by
  // hand, imperatively, on every change instead.
  const linesMaskRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    linesMaskRef.current?.style.setProperty("mask-image", linesMask.get());
    linesMaskRef.current?.style.setProperty(
      "-webkit-mask-image",
      linesMask.get(),
    );
  }, [linesMask]);
  useMotionValueEvent(linesMask, "change", (latest) => {
    linesMaskRef.current?.style.setProperty("mask-image", latest);
    linesMaskRef.current?.style.setProperty("-webkit-mask-image", latest);
  });

  return (
    <section ref={sectionRef} className="relative size-full overflow-hidden">
      {/* The shared photo/tint/gradient backdrop and the shared decorative circles
          both live once in Home, so the background is pixel-identical on every
          page and never appears to move, reset, or shift when scrolling. */}

      {/* Connecting lines: no z-index, so they sit behind the shared circles
          (z-10) and the text layer (z-20) — backmost among all elements.
          Masked with a hole wherever the shared green dot currently sits. */}
      <div
        ref={linesMaskRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full">
          <Line
            progress={progress}
            fromX={500}
            outerClassName="absolute flex h-[755.922px] items-center justify-center left-[1432.53px] top-[-87.47px] w-[461.155px]"
            rotateClassName="flex-none rotate-[-121.39deg]"
            lineWidth={885.484}
            stroke="#707071"
            dashed
          />
          <Line
            progress={progress}
            fromX={500}
            outerClassName="absolute flex h-[459.564px] items-center justify-center left-[434px] top-[1760.6px] w-[431.807px]"
            rotateClassName="flex-none rotate-[133.22deg]"
            lineWidth={3630.601}
            stroke="#B33926"
          />
          <Line
            progress={progress}
            fromX={-500}
            outerClassName="absolute flex h-[704px] items-center justify-center left-[972.75px] top-[-1285px] w-[612px]"
            rotateClassName="-rotate-[49deg] flex-none"
            lineWidth={3932.824}
            stroke="#707071"
          />
        </div>
      </div>

      {/* z-20 keeps this above the shared circles layer (z-10). */}
      <div
        className="absolute left-1/2 top-1/2 z-20"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full">
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
            style={{
              top: 151,
              left: 162,
              height: 504,
              opacity: articleOpacity,
              y: articleY,
            }}
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
            style={{ opacity: readMoreOpacity, x: readMoreX }}
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
