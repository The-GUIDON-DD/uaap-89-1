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
      <div className="mx-auto flex w-full max-w-[1777px] flex-1 flex-col px-6 py-[44px] sm:px-12 lg:px-[92px]">
        {/* Masthead */}
        <div className="flex flex-col gap-[24px] lg:gap-[30px]">
          <img
            src={guidonLogo}
            alt="The Guidon"
            className="block h-auto w-[200px] sm:w-[240px] lg:w-[280px]"
          />
          <h2 className="font-display text-[36px] leading-[1.1] tracking-[0.01em] sm:text-[52px] lg:text-[68px]">
            <span className="block">{title}</span>
            <span className="block">{subtitle}</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="mt-[32px] h-[2px] w-full bg-white" />

        {/* Credits — grows to fill the remaining height */}
        <div className="mt-[32px] flex flex-1 flex-col gap-[28px] text-[14px] lg:flex-row lg:gap-[48px] lg:text-[18px]">
          <dl className="flex shrink-0 flex-col gap-[26px] lg:w-[300px]">
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

          <dl className="flex flex-1 flex-col gap-[16px]">
            {sections.map((section, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: order-independent credit list
              <div key={`${section.position}-${i}`}>
                <dt className="font-bold uppercase leading-[1.3] tracking-[0.06em]">
                  {section.position}
                </dt>
                <dd className="font-normal leading-[1.6] text-white/85">
                  {section.names.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </footer>
  );
}
