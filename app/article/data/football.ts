import mensPlayers from "../assets/football/mens-players.jpg";
import womensPlayers from "../assets/football/womens-players.jpg";
import { defineSportPrimer } from "../types";

/**
 * Football primer (two teams, pinwheel layout).
 *
 * Unlike Basketball and Cheerdance, no isolated player cutout or feather-art
 * SVGs exist yet for this sport. Each team's image is the flattened Figma
 * export (players and background art baked into one photo), so `art` is
 * empty and `label` is blank to avoid double-drawing the label already baked
 * into the image. Swap in real transparent cutouts and art later the same
 * way Basketball was done, no other changes needed.
 */
export const football = defineSportPrimer({
  slug: "football",
  name: "Football",
  label: ["", "FOOTBALL"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Football players",
      label: ["", ""],
      art: [],
      article: {
        title: "Chasing Resurgence",
        titleColor: "#a30095",
        lead: "FUELED BY",
        body: "last season’s fifth-place finish, the Ateneo Men’s Football Team (AMFT) gears up to outrun the odds of Season 89 and surge back onto the podium. Following a productive…",
        to: "/sports/mens-football",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Football players",
      label: ["", ""],
      art: [],
      article: {
        title: "Women’s Sports Title",
        titleColor: "#00bf9d",
        lead: "LOREM IPSUM",
        body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis….",
        to: "/sports/womens-football",
      },
    },
  ],
});
