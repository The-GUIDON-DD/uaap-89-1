import { type MotionValue, motion, useTransform } from "motion/react";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import articleTitle from "../public/editors-message/article-title.svg";
import background from "../public/editors-message/background.svg";
import hamburgerMenu from "../public/editors-message/hamburger-menu.svg";
import readMore from "../public/editors-message/read-more.svg";

export function EditorsMessage({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const scale = useViewportScale();
  // Article title and Read More glide in/out continuously with scroll,
  // instead of firing once.
  const articleOpacity = useTransform(progress, [0, 1], [0, 1]);
  const articleY = useTransform(progress, [0, 1], [-200, 0]);
  const readMoreOpacity = useTransform(progress, [0, 1], [0, 1]);
  const readMoreX = useTransform(progress, [0, 1], [-500, 0]);

  return (
    <section className="relative z-20 size-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="relative size-full">
          <img
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: 0, top: 0, width: DESIGN_W, height: DESIGN_H }}
            src={background}
          />

          <img
            alt="Hamburger menu"
            className="absolute"
            style={{ left: 92, top: 58, width: 34, height: 22 }}
            src={hamburgerMenu}
          />

          <motion.img
            alt="A message from the editors — title of article, lorem ipsum"
            className="absolute"
            style={{
              left: 162,
              top: 151,
              width: 1072,
              height: 504,
              opacity: articleOpacity,
              y: articleY,
            }}
            src={articleTitle}
          />

          <motion.img
            alt="Read More"
            className="absolute"
            style={{
              left: 162,
              top: 800,
              width: 257,
              height: 72,
              opacity: readMoreOpacity,
              x: readMoreX,
            }}
            src={readMore}
          />
        </div>
      </div>
    </section>
  );
}
