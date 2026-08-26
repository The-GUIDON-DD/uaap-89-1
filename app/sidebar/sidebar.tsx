import { useState } from "react";
import chevron from "./assets/chevron.svg";
import guidonLogo from "./assets/guidon-logo.svg";
import uaapTitle from "./assets/uaap-title.svg";

type SportOption = {
  name: string;
  /** Present (even if empty) for a collapsible option; omit for a leaf option. */
  subOptions?: string[];
};

const options: SportOption[] = [
  {
    name: "Basketball",
    subOptions: ["Men’s Basketball", "Women’s Basketball"],
  },
  { name: "Badminton", subOptions: ["Men’s Badminton", "Women’s Badminton"] },
  {
    name: "Beach Volleyball",
    subOptions: ["Men’s Beach Volleyball", "Women’s Beach Volleyball"],
  },
  {
    name: "Track and Field",
    subOptions: ["Men’s Track and Field", "Women’s Track and Field"],
  },
  {
    name: "Table Tennis",
    subOptions: ["Men’s Table Tennis", "Women’s Table Tennis"],
  },
  { name: "Chess", subOptions: ["Men’s Chess", "Women’s Chess"] },
  { name: "Cheerdance" },
];

// Native ease-in-out, matching the reference site's transitions.
const EASE = "ease-[cubic-bezier(0.42,0,0.58,1)]";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  // Only one sport is expanded at a time (accordion).
  const [openSport, setOpenSport] = useState<string | null>("Basketball");

  const toggle = (name: string) =>
    setOpenSport((prev) => (prev === name ? null : name));

  const bar =
    "block h-[2px] w-[22px] rounded-full bg-current transition-all duration-300 ease-in-out";

  return (
    <>
      {/* Toggle button (hamburger ⇄ ✕) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`fixed left-4 top-4 z-[6000] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg text-white transition-colors ${
          open ? "bg-transparent" : "bg-[#1c4480]"
        }`}
      >
        <span
          className={`${bar} ${open ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span className={`${bar} ${open ? "opacity-0" : ""}`} />
        <span
          className={`${bar} ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </button>

      {/* Sliding sidebar drawer */}
      <aside
        aria-hidden={!open}
        className={`scrollbar-overlay fixed left-0 top-0 z-[5000] flex h-screen w-[360px] max-w-[85vw] flex-col bg-[#1c4480] font-archivo text-white transition-transform duration-300 ${EASE} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo block */}
        <div className="flex flex-col gap-[12px] px-[40px] pt-[64px]">
          <img
            src={guidonLogo}
            alt="The Guidon"
            className="block h-[24px] w-[157px]"
          />
          <img
            src={uaapTitle}
            alt="UAAP Season 89"
            className="block h-[95px] w-[184px]"
          />
          <p className="text-[20px] leading-[0.9]">First Semester Primer</p>
        </div>

        {/* Options list */}
        <nav className="mt-[24px] flex flex-col">
          {options.map((option) => {
            const subs = option.subOptions;
            const collapsible = subs !== undefined;
            const isOpen = collapsible && openSport === option.name;

            return (
              <div
                key={option.name}
                className={`transition-colors duration-[250ms] ${EASE} ${
                  isOpen ? "bg-[#16396e]" : "bg-transparent"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={collapsible ? isOpen : undefined}
                  onClick={() => collapsible && toggle(option.name)}
                  className={`flex w-full cursor-pointer items-center gap-[19px] px-[40px] py-[14px] text-left transition-colors duration-200 ${EASE} ${
                    isOpen ? "bg-[#1b62cd]" : "hover:bg-[#1b62cd]/30"
                  }`}
                >
                  <span className="whitespace-nowrap text-[19px] font-bold">
                    {option.name}
                  </span>
                  {collapsible && (
                    <img
                      src={chevron}
                      alt=""
                      aria-hidden="true"
                      className={`block h-[8px] w-[14px] transition-transform duration-[250ms] ${EASE} ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {subs && subs.length > 0 && (
                  <div
                    className={`grid transition-[grid-template-rows] duration-[250ms] ${EASE} ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-[12px] pb-[16px] pl-[58px] pt-[10px] text-[18px]">
                        {subs.map((sub) => (
                          <p key={sub}>{sub}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
