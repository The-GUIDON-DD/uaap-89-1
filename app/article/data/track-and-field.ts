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
export const TrackAndField = defineSportPrimer({
  slug: "track-and-field",
  name: "track-and-field",
  // Sport label shown on the photos (two lines). Teams override it below.
  label: ["", "Track and Field"],
  teams: [
    // ── Team 1 · top-left photo + top-right article ──────────────────────
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Track and Field players",
      label: ["MEN’S", "Track and Field"],
      art: [mensArtLeft, mensArtR1, mensArtR2, mensArtR3],
      article: {
        title: "Unfinished Business",
        titleColor: "#a30095",
        lead: "FOUR STRAIGHT",
        body: "silver finishes have only deepened the Ateneo Men's Table Tennis Team's (AMTTT) desire to finally bring home the gold.",
        to: "/sports/mens-track-and-field",
        // readMore / buttonColor are optional — default to "Read More" + gold.
      },
    },
    // ── Team 2 · bottom-right photo + bottom-left article ────────────────
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Track and Field players",
      label: ["WOMEN’S", "Track and Field"],
      art: [womensArtLeft, womensArtR1, womensArtR2, womensArtR3],
      article: {
        title: "Making The Leap",
        titleColor: "#00bf9d",
        lead: "LOOKING TO",
        body: "fight their way back to the top, the Ateneo Women’s Table Tennis Team (AWTTT) enters Season 89 fixed on securing a championship after their short-lived Final Four stint last season.",
        to: "/sports/womens-track-and-field",
      },
    },
  ],
});
