import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const popEase = [0, 0, 0, 1.011];

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

/** Center-derived: a dot always sits at the exact center of its ring's box. */
function dotInset(ringSize: number) {
  return ringSize / 2 - 15;
}

function Ring({
  progress,
  from,
  to,
  size,
  stroke,
  dashed,
  entrance,
  maskDotCenter,
}: {
  progress: MotionValue<number>;
  from: { left: number; top: number };
  to: { left: number; top: number };
  size: number;
  stroke: string;
  dashed?: boolean;
  entrance?: boolean;

  maskDotCenter?: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const left = useTransform(progress, [0, 1], [from.left, to.left]);
  const top = useTransform(progress, [0, 1], [from.top, to.top]);

  const localMaskX = useTransform(
    [maskDotCenter?.x ?? left, left],
    ([mx, l]) => (mx as number) - (l as number),
  );
  const localMaskY = useTransform(
    [maskDotCenter?.y ?? top, top],
    ([my, t]) => (my as number) - (t as number),
  );
  const mask = useMotionTemplate`radial-gradient(circle at ${localMaskX}px ${localMaskY}px, transparent 15px, black 16px)`;

  const maskRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!maskDotCenter) return;
    maskRef.current?.style.setProperty("mask-image", mask.get());
    maskRef.current?.style.setProperty("-webkit-mask-image", mask.get());
  }, [mask, maskDotCenter]);
  useMotionValueEvent(mask, "change", (latest) => {
    if (!maskDotCenter) return;
    maskRef.current?.style.setProperty("mask-image", latest);
    maskRef.current?.style.setProperty("-webkit-mask-image", latest);
  });

  return (
    <motion.div
      ref={maskDotCenter ? maskRef : undefined}
      className="absolute"
      style={{ left, top, width: size, height: size }}
      {...(entrance ? expandMotion : undefined)}
    >
      <svg
        aria-hidden="true"
        className="absolute block inset-0 size-full"
        fill="none"
        height={size}
        preserveAspectRatio="none"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1.5}
          stroke={stroke}
          strokeDasharray={dashed ? "3 3" : undefined}
          strokeWidth="3"
        />
      </svg>
    </motion.div>
  );
}

function CenterDot({
  progress,
  from,
  to,
  ringSize,
  fill,
  stroke,
}: {
  progress: MotionValue<number>;
  from: { left: number; top: number };
  to: { left: number; top: number };
  ringSize: number;
  fill: string;
  stroke: string;
}) {
  const inset = dotInset(ringSize);
  const left = useTransform(
    progress,
    [0, 1],
    [from.left + inset, to.left + inset],
  );
  const top = useTransform(
    progress,
    [0, 1],
    [from.top + inset, to.top + inset],
  );

  return (
    <motion.div className="absolute size-[30px]" style={{ left, top }}>
      <svg
        aria-hidden="true"
        className="absolute block inset-0 size-full"
        fill="none"
        height="30"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
        width="30"
      >
        <circle
          cx="15"
          cy="15"
          fill={fill}
          r="14"
          stroke={stroke}
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  );
}

const TRANSPARENT_DOT = {
  from: { left: -107, top: 712 },
  to: { left: 107, top: -74 },
  ringSize: 450,
};

export function SharedCircles({ progress }: { progress: MotionValue<number> }) {
  // Global (design-space) center of the transparent dot, wherever it
  // currently sits — same math CenterDot uses internally to place itself.
  const dotInsetVal = dotInset(TRANSPARENT_DOT.ringSize) + 15;
  const dotCenterX = useTransform(
    progress,
    [0, 1],
    [
      TRANSPARENT_DOT.from.left + dotInsetVal,
      TRANSPARENT_DOT.to.left + dotInsetVal,
    ],
  );
  const dotCenterY = useTransform(
    progress,
    [0, 1],
    [
      TRANSPARENT_DOT.from.top + dotInsetVal,
      TRANSPARENT_DOT.to.top + dotInsetVal,
    ],
  );
  const dotCenter = { x: dotCenterX, y: dotCenterY };

  return (
    <>
      <Ring
        progress={progress}
        from={{ left: -107, top: -29 }}
        to={{ left: -515, top: -89 }}
        size={902}
        stroke="#707071"
        entrance
        maskDotCenter={dotCenter}
      />

      <Ring
        progress={progress}
        from={{ left: -107, top: 712 }}
        to={{ left: 107, top: -74 }}
        size={450}
        stroke="#66AF45"
        entrance
      />
      <CenterDot
        progress={progress}
        from={TRANSPARENT_DOT.from}
        to={TRANSPARENT_DOT.to}
        ringSize={TRANSPARENT_DOT.ringSize}
        fill="transparent"
        stroke="#707071"
      />

      <Ring
        progress={progress}
        from={{ left: 1318.8, top: -285.2 }}
        to={{ left: 1527.6845, top: 302.4545 }}
        size={732}
        stroke="#B33926"
        entrance
      />
      <CenterDot
        progress={progress}
        from={{ left: 1318.8, top: -285.2 }}
        to={{ left: 1527.6845, top: 302.4545 }}
        ringSize={732}
        fill="#B33926"
        stroke="#B33926"
      />

      <Ring
        progress={progress}
        from={{ left: 1642.034, top: 297.034 }}
        to={{ left: 1306.034, top: 724.274 }}
        size={446}
        stroke="#707071"
        dashed
        entrance
      />

      {/* Static grey circle: no entrance pop on either page, only glides with scroll.
          No center dot on this one. */}
      <Ring
        progress={progress}
        from={{ left: 1460.2405, top: -451.7595 }}
        to={{ left: 1667.9605, top: 10.7805 }}
        size={450}
        stroke="#707071"
      />
    </>
  );
}
