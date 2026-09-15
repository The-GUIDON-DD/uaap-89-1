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
export const basketball = defineSportPrimer({
  slug: "basketball",
  name: "Basketball",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "BASKETBALL"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Basketball players",
      label: ["MEN’S", "BASKETBALL"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "Playing for a Purpose",
        titleColor: "#a30095",
        lead: "AFTER AN",
        body: "offseason marked by the loss of their beloved teammates Divine Adili and Rene Baterbonia, the Ateneo Men’s Basketball Team heads into Season 89 with…",
        to: "/sports/mens-basketball",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Basketball players",
      label: ["WOMEN’S", "BASKETBALL"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Stand and Deliver",
        titleColor: "#00bf9d",
        lead: "AFTER ENDING",
        body: "a decade-long podium drought, the Ateneo Women’s Basketball Team has set their sights on the league’s ultimate prize in UAAP Season 89. With sharpened talons…",
        to: "/sports/womens-basketball",
      },
    },
  ],
});
