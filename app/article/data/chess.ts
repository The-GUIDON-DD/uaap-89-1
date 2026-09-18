import mensArtLeft from "../assets/basketball/mens-art-left.svg";
import mensArtR1 from "../assets/basketball/mens-art-r1.svg";
import mensArtR2 from "../assets/basketball/mens-art-r2.svg";
import mensArtR3 from "../assets/basketball/mens-art-r3.svg";
import womensArtLeft from "../assets/basketball/womens-art-left.svg";
import womensArtR1 from "../assets/basketball/womens-art-r1.svg";
import womensArtR2 from "../assets/basketball/womens-art-r2.svg";
import womensArtR3 from "../assets/basketball/womens-art-r3.svg";
import mensPlayers from "../assets/chess/mens-players.webp";
import womensPlayers from "../assets/chess/womens-players.webp";
import { defineSportPrimer } from "../types";

/**
 * Basketball primer (two teams → pinwheel layout).
 *
 * This file is the single edit point for Basketball. Change any text, color,
 * link, or swap an image import above — nothing else needs to be touched.
 * Field-by-field docs live on the types in `../types.ts`.
 */
export const chess = defineSportPrimer({
  slug: "chess",
  name: "chess",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "Chess"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Chess players",
      label: ["MEN’S", "Chess"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "A Gambit for Glory",
        titleColor: "#a30095",
        lead: "EVERY GAMBIT",
        body: "is a risk that requires courage and conviction. For the Ateneo Men’s Chess Team (AMCT), UAAP Season 89 is another opportunity to make a calculated risk.",
        to: "/sports/mens-chess",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s chess players",
      label: ["WOMEN’S", "Chess"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Across The Board",
        titleColor: "#00bf9d",
        lead: "FRESH OFF",
        body: "a strong showing in UAAP Season 88, the Ateneo Women’s Chess Team (AWCT) looks to build on last season’s campaign with resilience and a renewed sense of purpose.",
        to: "/sports/womens-chess",
      },
    },
  ],
});
