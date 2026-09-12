/**
 * Data model for a sport's article "primer" — this is the ONE place to edit a
 * sport's content. Everything the reusable `<SportPrimer>` renders (labels,
 * titles, colors, copy, links, images) comes from a `SportPrimer` object; see
 * `data/basketball.ts` (two teams) and `data/cheerdance.ts` (one team) for
 * worked examples, and `README.md` for how to add a new sport.
 *
 * Two layouts share this one model, chosen automatically by team count:
 *   • 2 teams → a pinwheel 2×2 (two photo panels + two article cards)
 *   • 1 team  → a full-width photo hero above a centered article
 *
 * Each team supplies its own player cutout + feather-art SVGs (per sport,
 * usually recolored per team). See `assets/<sport>/`.
 */

/** A white article card next to (or below) a team panel. */
export type ArticleCard = {
  /** Big display heading, e.g. "Playing for a Purpose". */
  title: string;
  /** Heading color (hex). */
  titleColor: string;
  /** Bold, colored intro run, e.g. "AFTER AN". Optional. */
  lead?: string;
  /** Color of the `lead` run. Defaults to `PRIMER_DEFAULTS.leadColor`. */
  leadColor?: string;
  /** Remaining body copy (regular weight). Kept to a few lines by line-clamp. */
  body: string;
  /** Where the button links to. */
  to: string;
  /** Button label. Defaults to "Read More". */
  readMore?: string;
  /** Button background (hex). Defaults to `PRIMER_DEFAULTS.buttonColor`. */
  buttonColor?: string;
};

/** One team: a transparent player cutout, feather art, and its paired article. */
export type TeamPanel = {
  /** Imported transparent player-cutout PNG (tightly cropped, ~1500px wide). */
  players?: string;
  /** Accessible description of the players, e.g. "Ateneo Men's Basketball players". */
  playersAlt: string;
  /**
   * Feather-art SVG sources in template order: [left, r1, r2, r3]. Mapped onto
   * the shared art geometry for the panel (2-team) or hero (1-team). Missing
   * entries are skipped.
   */
  art: (string | undefined)[];
  /** The article shown beside (2-team) or below (1-team) this team. */
  article: ArticleCard;
  /** Per-team label override (two lines); defaults to the sport `label`. */
  label?: [string, string];
};

/** A full sport page — one or two teams. */
export type SportPrimer = {
  /** URL slug, e.g. "basketball". */
  slug: string;
  /** Human name for the screen-reader heading, e.g. "Basketball". */
  name: string;
  /** Sport label shown on the photo panel(s), as two lines (2nd may be ""). */
  label: [string, string];
  /** One team → stacked hero; two teams → pinwheel. */
  teams: [TeamPanel] | [TeamPanel, TeamPanel];
};

/** Season-wide copy + brand defaults — edit here to change every primer at once. */
export const PRIMER_DEFAULTS = {
  /** Appended to each page's screen-reader heading. */
  subtitle: "UAAP Season 89 First Semester Primer",
  /** Default color for the article `lead` run. */
  leadColor: "#194681",
  /** Default "Read More" button colors. */
  buttonColor: "#d29300",
  buttonHoverColor: "#b57e00",
} as const;

/**
 * Identity helper that gives a sport data file full type-checking and a place
 * to hang defaults later. Use in each `data/<sport>.ts`.
 */
export function defineSportPrimer(primer: SportPrimer): SportPrimer {
  return primer;
}
