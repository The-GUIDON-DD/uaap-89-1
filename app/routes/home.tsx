import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EditorsMessage } from "../editors-message/editors-message";
import { FrontPage } from "../front-page/front-page";

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
  const { scrollYProgress } = useScroll({ container: mainRef });
  // The front page is white and the editors' message page is black. Instead
  // of two flat, independently-colored sections meeting at a hard edge, one
  // shared backdrop sweeps continuously from white to black behind both of
  // them, driven by the same scroll progress as everything else — so the
  // seam between the pages blends instead of cutting.
  const backdropColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#ffffff", "#000000"],
  );

  return (
    <>
      <motion.div
        className="fixed inset-0"
        style={{ backgroundColor: backdropColor }}
        aria-hidden="true"
      />

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
