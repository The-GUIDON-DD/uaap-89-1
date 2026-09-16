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
export const football = defineSportPrimer({
  slug: "football",
  name: "football",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "football"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Football players",
      label: ["MEN’S", "FOOTBALL"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "Chasing Resurgence",
        titleColor: "#a30095",
        lead: "FUELED BY",
        body: "last season’s fifth-place finish, the Ateneo Men’s Football Team (AMFT) gears up to outrun the odds of Season 89 and surge back onto the podium.",
        to: "/sports/mens-football",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Football players",
      label: ["WOMEN’S", "FOOTBALL"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Nothing Stronger Than Family",
        titleColor: "#00bf9d",
        lead: "FOLLOWING A",
        body: "monumental third-place finish, the Ateneo Women’s Football Team (AWFT) is ready to lace their boots for their UAAP Season 89 campaign.",
        to: "/sports/womens-football",
      },
    },
  ],
});
