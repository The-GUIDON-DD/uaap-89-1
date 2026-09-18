import mensArtLeft from "../assets/basketball/mens-art-left.svg";
import mensArtR1 from "../assets/basketball/mens-art-r1.svg";
import mensArtR2 from "../assets/basketball/mens-art-r2.svg";
import mensArtR3 from "../assets/basketball/mens-art-r3.svg";
import womensArtLeft from "../assets/basketball/womens-art-left.svg";
import womensArtR1 from "../assets/basketball/womens-art-r1.svg";
import womensArtR2 from "../assets/basketball/womens-art-r2.svg";
import womensArtR3 from "../assets/basketball/womens-art-r3.svg";
import mensPlayers from "../assets/beach-volleyball/mens-players.webp";
import womensPlayers from "../assets/beach-volleyball/womens-players.webp";
import { defineSportPrimer } from "../types";

/**
 * Basketball primer (two teams → pinwheel layout).
 *
 * This file is the single edit point for Basketball. Change any text, color,
 * link, or swap an image import above — nothing else needs to be touched.
 * Field-by-field docs live on the types in `../types.ts`.
 */
export const BeachVolleyball = defineSportPrimer({
  slug: "beach-volleyball",
  name: "beach-volleyball",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "Beach Volleyball"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Beach Volleyball players",
      label: ["MEN’S", "Beach Volleyball"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "Onwards and Upwards",
        titleColor: "#a30095",
        lead: "AFTER SECURING",
        body: "bronze in the last tournament, the Ateneo Men’s Beach Volleyball Team (AMBVT) now hopes to bring home a championship title for the upcoming season.",
        to: "/sports/mens-beach-volleyball",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Beach Volleyball players",
      label: ["WOMEN’S", "Beach Volleyball"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Head in the Game",
        titleColor: "#00bf9d",
        lead: "THE ATENEO",
        body: "Women’s Beach Volleyball Team gears up for Season 89 with unrelenting drive for redemption after the Final Four bid slipped through their hands in the previous season.",
        to: "/sports/womens-beach-volleyball",
      },
    },
  ],
});
