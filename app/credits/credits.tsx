import guidonLogo from "./assets/guidon-logo.svg";

export type CreditEditor = { position: string; name: string };
export type CreditSection = { position: string; names: string[] };

/** Join names for display: "A", "A and B", or "A, B, and C" (Oxford comma). */
function formatNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export type CreditsProps = {
  /** First display line, e.g. "UAAP SEASON 89". */
  title?: string;
  /** Second display line, e.g. "FIRST SEMESTER PRIMER". */
  subtitle?: string;
  /** Left column: single-name credits (editors). */
  editors?: CreditEditor[];
  /** Right column: grouped credits with many contributors. */
  sections?: CreditSection[];
};

const defaultEditors: CreditEditor[] = [
  { position: "Editor-in-Chief", name: "Caitlin Bernal" },
  { position: "Associate Editor", name: "Sab Mercado" },
  { position: "Managing Editor", name: "Annika Napiza" },
  { position: "Design Executive Editor", name: "Aliya Delos Santos" },
];

const defaultSections: CreditSection[] = [
  {
    position: "Sports Editors",
    names: ["Carmela Therese Papa", "Ravi G. Tan"],
  },
  {
    position: "Writers",
    names: [
      "A.J. Antonio",
      "Jules Aranjuez",
      "Sophia Bautista",
      "Gabrielle Binguan",
      "Laurence Fernando",
      "David Enrico Galvez",
      "Jhared Ivan Isidro",
      "Dencel Londres",
      "Mario Quirino Manlutac",
      "Chloe Marie Molina",
      "Alexi Navarro",
      "CJ Pentinio",
      "Ella Portacio",
      "RV Quinto",
    ],
  },
  { position: "Photos Editors", names: ["Bea Pador", "Sam Tadeo"] },
  {
    position: "Photo Credits",
    names: [
      "Zeb De Leon",
      "Clarence Masilag",
      "Derek Soronio",
      "Adrienne Rozal",
      "Joseph Castillo",
      "Aidyn Grey Monteras",
      "Enrico Jocson",
      "Jio Japson",
      "RJ Hernandez",
      "Sha See",
      "Tracy G. Rodriguez",
      "Via Panopio",
      "Rhian Herrera",
      "Zyle Cadiz",
      "Sam Tadeo",
      "Bea Pador",
    ],
  },
  {
    position: "Graphic Design Editors",
    names: ["Chevin Paul Gealone", "Jacob Marcelo"],
  },
  { position: "Branding", names: ["Jacob Marcelo"] },
  { position: "Designer", names: ["Bel Baylon"] },
  { position: "Developers", names: ["John Jerome Pardo", "Neil Biason"] },
];

export function Credits({
  title = "UAAP SEASON 89",
  subtitle = "FIRST SEMESTER PRIMER",
  editors = defaultEditors,
  sections = defaultSections,
}: CreditsProps = {}) {
  return (
    <footer className="flex min-h-screen w-full flex-col bg-[#194681] font-archivo text-white">
      <div className="mx-auto flex w-full max-w-[1777px] flex-1 flex-col px-6 py-[22px] sm:px-12 lg:px-[92px]">
        {/* Masthead */}
        <div className="flex flex-col gap-[14px] lg:gap-[16px]">
          <img
            src={guidonLogo}
            alt="The Guidon"
            className="block h-auto w-[180px] sm:w-[210px] lg:w-[232px]"
          />
          <h2 className="font-display text-[32px] leading-[1.1] tracking-[0.01em] sm:text-[46px] lg:text-[56px]">
            <span className="block">{title}</span>
            <span className="block">{subtitle}</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="mt-[16px] h-[2px] w-full bg-white" />

        {/* Credits — grows to fill the remaining height */}
        <div className="mt-[16px] flex flex-1 flex-col gap-[24px] text-[13px] lg:flex-row lg:gap-[40px] lg:text-[14px]">
          <dl className="flex shrink-0 flex-col gap-[14px] lg:w-[240px]">
            {editors.map((editor, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: order-independent credit list
              <div key={`${editor.position}-${i}`}>
                <dt className="font-bold uppercase leading-[1.3] tracking-[0.06em]">
                  {editor.position}
                </dt>
                <dd className="font-normal leading-[1.5] text-white/85">
                  {editor.name}
                </dd>
              </div>
            ))}
          </dl>

          <dl className="flex flex-1 flex-col gap-[10px]">
            {sections.map((section, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: order-independent credit list
              <div key={`${section.position}-${i}`}>
                <dt className="font-bold uppercase leading-[1.3] tracking-[0.06em]">
                  {section.position}
                </dt>
                <dd className="font-normal leading-[1.6] text-white/85">
                  {formatNames(section.names)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </footer>
  );
}
