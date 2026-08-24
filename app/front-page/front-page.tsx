import bigGreyCircle from "../public/front-page/Big grey circle.svg";
import greenCircle from "../public/front-page/Green circle.svg";
import greyCircleDashed from "../public/front-page/Grey circle dashed.svg";
import teamPhoto from "../public/front-page/image 41.svg";
import orangeCircle from "../public/front-page/Orange circle.svg";
import darkOverlay from "../public/front-page/Rectangle 7.svg";
import gradientOverlay from "../public/front-page/Rectangle 8.svg";
import baseBackground from "../public/front-page/Rectangle 9.svg";
import textLockup from "../public/front-page/Text.svg";

export function FrontPage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#121212]">
      <img
        src={baseBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={teamPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-[fade-in_0.9s_ease-out_both]"
      />
      <img
        src={darkOverlay}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-[fade-in_0.9s_ease-out_both]"
      />
      <img
        src={gradientOverlay}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-[fade-in_0.9s_ease-out_both]"
      />

      <img
        src={bigGreyCircle}
        alt=""
        className="absolute h-auto animate-[bloom_0.9s_ease-out_0s_both]"
        style={{ left: "-5.53%", top: "-2.6%", width: "46.82%" }}
      />
      <img
        src={orangeCircle}
        alt=""
        className="absolute h-auto animate-[bloom_0.9s_ease-out_0.15s_both]"
        style={{ left: "68.73%", top: "-26.28%", width: "37.95%" }}
      />
      <img
        src={greyCircleDashed}
        alt=""
        className="absolute h-auto animate-[bloom_0.9s_ease-out_0.3s_both]"
        style={{ left: "85.5%", top: "27.45%", width: "23.24%" }}
      />
      <img
        src={greenCircle}
        alt=""
        className="absolute h-auto animate-[bloom_0.9s_ease-out_0.45s_both]"
        style={{ left: "-5.52%", top: "66.02%", width: "23.28%" }}
      />

      <img
        src={textLockup}
        alt="UAAP Season 89 First Semester Primer — The GUIDON"
        className="absolute h-auto animate-[fade-drop-in_0.7s_ease-out_both]"
        style={{ left: "7%", top: "9%", width: "85%" }}
      />
    </main>
  );
}
