import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { EditorsMessage } from "../editors-message/editors-message";
import { FrontPage } from "../front-page/front-page";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import teamPhoto from "../public/front-page/image 41.svg";
import { SharedCircles } from "../shared-circles/shared-circles";

export function meta() {
  return [
    { title: "UAAP Season 89 First Semester Primer | The GUIDON" },
    {
      name: "description",
      content: "The GUIDON's UAAP Season 89 First Semester Primer.",
    },
  ];
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const scale = useViewportScale();
  const { scrollYProgress } = useScroll({ container: mainRef });

  return (
    <>
      {/* Shared backdrop: one instance of the photo, tint, and gradient behind both
          pages, so the background is pixel-identical and never appears to move,
          reset, or shift when scrolling between them. */}
      <motion.img
        alt="Ateneo Blue Eagles basketball team lined up on court"
        className="fixed inset-0 max-w-none object-cover pointer-events-none size-full"
        src={teamPhoto}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "linear" }}
      />
      <div
        className="fixed inset-0 size-full"
        style={{ background: "rgba(18,18,18,0.5)" }}
      />
      <div
        className="fixed inset-0 size-full"
        style={{
          backgroundImage:
            "linear-gradient(179.9396734604826deg, rgba(0,0,0,0) 3.1133%, rgb(28,68,128) 107.81%)",
        }}
      />

      {/* Shared decorative circles: identical elements on both pages, so instead of
          duplicating them, one set lives here and glides between each page's
          layout as the user scrolls, driven directly by scroll progress. Sits
          above each page's tint but below each page's own text/lines. */}
      <div
        className="fixed inset-0 z-10"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <div className="relative size-full">
            <SharedCircles progress={scrollYProgress} />
          </div>
        </div>
      </div>

      <main
        ref={mainRef}
        className="relative h-dvh w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
      >
        <div className="h-dvh w-full snap-start">
          <FrontPage progress={scrollYProgress} />
        </div>
        <div className="h-dvh w-full snap-start">
          <EditorsMessage progress={scrollYProgress} />
        </div>
      </main>
    </>
  );
}
