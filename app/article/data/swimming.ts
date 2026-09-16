import mensArtLeft from "../assets/basketball/mens-art-left.svg";
import mensArtR1 from "../assets/basketball/mens-art-r1.svg";
import mensArtR2 from "../assets/basketball/mens-art-r2.svg";
import mensArtR3 from "../assets/basketball/mens-art-r3.svg";
import mensPlayers from "../assets/basketball/mens-players.png";
import womensArtLeft from "../assets/basketball/womens-art-left.svg";
import womensArtR1 from "../assets/basketball/womens-art-r1.svg";
import womensArtR2 from "../assets/basketball/womens-art-r2.svg";
import womensArtR3 from "../assets/basketball/womens-art-r3.svg";
import womensPlayers from "../assets/basketball/womens-players.png";
import { defineSportPrimer } from "../types";

/**
 * Basketball primer (two teams → pinwheel layout).
 *
 * This file is the single edit point for Basketball. Change any text, color,
 * link, or swap an image import above — nothing else needs to be touched.
 * Field-by-field docs live on the types in `../types.ts`.
 */
export const Swimming = defineSportPrimer({
  slug: "swimming",
  name: "swimming",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "Swimming"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Swimming players",
      label: ["MEN’S", "Swimming"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "The Dynasty Continues",
        titleColor: "#a30095",
        lead: "UNMATCHED IN",
        body: "collegiate waters, the Ateneo Men’s Swimming Team enters Season 89 already carrying history on their side.",
        to: "/sports/mens-swimming",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Swimming players",
      label: ["WOMEN’S", "Swimming"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Waves of redemption",
        titleColor: "#00bf9d",
        lead: "WITH THE",
        body: "gold in sight, the Ateneo Women’s Swimming Team dives into UAAP Season 89 determined to turn last season’s silver finish into a championship run.",
        to: "/sports/womens-swimming",
      },
    },
  ],
});
