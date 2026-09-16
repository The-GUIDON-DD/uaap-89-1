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
export const badminton = defineSportPrimer({
  slug: "badminton",
  name: "badminton",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "badminton"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Badminton players",
      label: ["MEN’S", "Badminton"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "The Standard Bearers",
        titleColor: "#a30095",
        lead: "HAVING RETURNED",
        body: "to the mountaintop last season, the Ateneo Men’s Badminton Team is primed to defend the throne and claim back-to-back status as UAAP champions.",
        to: "/sports/mens-badminton",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Badminton players",
      label: ["WOMEN’S", "Badminton"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Greater Than Greatness",
        titleColor: "#00bf9d",
        lead: "A CHAMPIONSHIP",
        body: "solidifies legacies for teams, but five championships over a six-year span set dynasties in writing forever. For the Ateneo Women’s Badminton Team, it signals the start of an era of dominance.",
        to: "/sports/womens-badminton",
      },
    },
  ],
});
