import guidonLogo from "./assets/guidon-logo.svg";

export type CreditEditor = { position: string; name: string };
export type CreditSection = { position: string; names: string[] };

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

const placeholderNames = Array.from({ length: 10 }, () => "Name Lorem Ipsum");

const defaultEditors: CreditEditor[] = [
  { position: "POSITION EDITOR", name: "Name Lorem Ipsum" },
  { position: "POSITION EDITOR", name: "Name Lorem Ipsum" },
  { position: "POSITION EDITOR", name: "Name Lorem Ipsum" },
  { position: "POSITION EDITOR", name: "Name Lorem Ipsum" },
];

const defaultSections: CreditSection[] = [
  { position: "POSITION ABCDEFG", names: placeholderNames },
  { position: "POSITION ABCDEFG", names: placeholderNames },
  { position: "POSITION ABCDEFG", names: placeholderNames },
  { position: "POSITION ABCDEFG", names: placeholderNames },
  { position: "POSITION ABCDEFG", names: placeholderNames },
];

export function Credits({
  title = "UAAP SEASON 89",
  subtitle = "FIRST SEMESTER PRIMER",
  editors = defaultEditors,
  sections = defaultSections,
}: CreditsProps = {}) {
  return (
    <footer className="flex min-h-screen w-full flex-col bg-[#194681] font-archivo text-white">
      <div className="mx-auto flex w-full max-w-[1777px] flex-1 flex-col px-6 py-[40px] sm:px-12 lg:px-[92px]">
        {/* Logo + title */}
        <div className="flex flex-col gap-[22px] lg:gap-[28px]">
          <img
            src={guidonLogo}
            alt="The Guidon"
            className="block h-auto w-[200px] sm:w-[240px] lg:w-[280px]"
          />
          <div className="font-display leading-[0.9] tracking-[0.01em]">
            <h2 className="text-[36px] sm:text-[52px] lg:text-[68px]">
              {title}
            </h2>
            <h2 className="text-[36px] sm:text-[52px] lg:text-[68px]">
              {subtitle}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-[28px] h-[2px] w-full bg-white" />

        {/* Credits — grows to fill the remaining height */}
        <div className="mt-[28px] flex flex-1 flex-col gap-[24px] text-[12px] lg:flex-row lg:gap-[40px] lg:text-[14px]">
          <div className="flex shrink-0 flex-col gap-[24px] lg:w-[320px]">
            {editors.map((editor, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: order-independent credit list
              <div key={`${editor.position}-${i}`}>
                <p className="font-bold leading-[1.2]">{editor.position}</p>
                <p className="font-normal leading-[1.2]">{editor.name}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-between gap-[16px]">
            {sections.map((section, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: order-independent credit list
              <div key={`${section.position}-${i}`}>
                <p className="font-bold leading-[1.2]">{section.position}</p>
                <p className="font-normal leading-[1.2]">
                  {section.names.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
