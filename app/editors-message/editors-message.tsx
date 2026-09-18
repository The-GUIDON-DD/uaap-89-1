import { Link } from "react-router";
import { PRIMER_DEFAULTS } from "../article/types";
import {
  DESIGN_H,
  DESIGN_W,
  useViewportScale,
} from "../lib/use-viewport-scale";
import background from "../public/editors-message/background.svg";

/** Right-pointing arrow for the "Read More" button. */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 17 13.4142"
      fill="none"
      aria-hidden="true"
      className={`block shrink-0 ${className ?? ""}`}
    >
      <path
        d="M0 6.70711H16M10 0.707107L16 6.70711L10 12.7071"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditorsMessage() {
  const scale = useViewportScale();
  const buttonColor = PRIMER_DEFAULTS.buttonColor;
  const buttonHover = PRIMER_DEFAULTS.buttonHoverColor;

  return (
    <section
      className="relative z-20 size-full overflow-hidden"
      id="editors-message"
    >
      {/* Phones: a stacked layout instead of the cropped 16:9 canvas. */}
      <div className="relative flex size-full flex-col justify-end overflow-hidden bg-black px-6 pb-12 pt-20 md:hidden">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-70"
          src={background}
        />
        <img
          alt="Editor's Message"
          src="/editors.webp"
          className="absolute left-1/2 top-[6%] h-[90%] md:h-[56%] max-w-none -translate-x-1/2"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 88%, transparent 100%)",
          }}
        />
        {/* Dark gradient over the lower part so the text reads over the art,
            running all the way to the bottom edge with the streaks. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[53%]"
          style={{
            background:
              "linear-gradient(to top, #000 0%, #000 78%, rgba(0,0,0,0.8) 86%, rgba(0,0,0,0.45) 93%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col gap-4">
          <p className="font-display text-lg uppercase text-white">
            A message from the editors
          </p>
          <h2 className="font-display text-5xl uppercase leading-[1.05] text-white">
            Fight and <br />
            rise together
          </h2>
          <p className="font-archivo text-base text-white">
            <strong>NOW MORE</strong> than ever, sports has become an arena not
            just for play, but for real human stories...
          </p>
          <Link
            to={"/editors-message"}
            aria-label="Read more: Editor's Message"
            className="group mt-2 flex h-[48px] w-[200px] items-center justify-center gap-[9px] rounded-[7px] bg-[var(--btn)] text-white transition-colors hover:bg-[var(--btn-hover)]"
            style={
              {
                "--btn": buttonColor,
                "--btn-hover": buttonHover,
              } as React.CSSProperties
            }
          >
            <span className="text-[20px] font-bold">Read More</span>
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-1/2 hidden md:block"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          background: "black",
        }}
      >
        <div className="relative size-full pb-25 pt-60 px-45">
          <img
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: DESIGN_W,
              height: DESIGN_H,
              // Fades the top edge to transparent so the streaks don't start
              // in a hard-cut line where the front page ends — they dissolve
              // out of the shared backdrop instead of appearing abruptly.
              maskImage: "linear-gradient(to bottom, transparent 0%, black 6%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%)",
            }}
            src={background}
          />
          <img
            id="editor-image"
            alt="Editor's Message"
            src="/editors.webp"
            className="absolute right-[10%] bottom-0 h-[95%]"
          />

          <h1 className="font-display text-white text-4xl uppercase relative z-50 mb-3">
            A message from the editors
          </h1>
          <h1 className="font-display text-white text-9xl uppercase relative z-50 mb-15">
            Fight and <br />
            rise together
          </h1>
          <p className="font-archivo text-white text-2xl relative z-50 w-[40%] mb-25">
            <strong>NOW MORE</strong> than ever, sports has become an arena not
            just for play, but for real human stories. After the passing of
            Chukwuemeka Divine Adili and Rene Clert Baterbonia, the sports
            community must look beyond the court...
          </p>
          <Link
            to={"/editors-message"}
            aria-label={`Read more: Editor's Message}`}
            className="group flex h-[52px] w-[224px] max-w-full items-center justify-center gap-[9px] rounded-[7px] bg-[var(--btn)] text-white transition-colors hover:bg-[var(--btn-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#194681] focus-visible:ring-offset-2 relative z-50"
            style={{
              "--btn": buttonColor,
              "--btn-hover": buttonHover,
            }}
          >
            <span className="font-bold text-[20px] lg:text-[24px]">
              Read More
            </span>
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
