import { useEffect, useState } from "react";

export const DESIGN_W = 1920;
export const DESIGN_H = 1080;

export function useViewportScale() {
  const [scale, setScale] = useState(() =>
    typeof window !== "undefined"
      ? Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H)
      : 1,
  );
  useEffect(() => {
    const update = () =>
      setScale(
        Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H),
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}
