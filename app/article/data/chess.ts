import mensPlayers from "../assets/chess/mens-players.jpg";
import womensPlayers from "../assets/chess/womens-players.jpg";
import { defineSportPrimer } from "../types";

/** Chess primer (two teams → pinwheel layout). See football.ts for why
 * `art` is empty and `label` is blank on each team. */
export const chess = defineSportPrimer({
  slug: "chess",
  name: "Chess",
  label: ["", "CHESS"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Chess player",
      label: ["", ""],
      art: [],
      article: {
        title: "Men’s Sports Title",
        titleColor: "#a30095",
        lead: "LOREM IPSUM",
        body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis….",
        to: "/sports/mens-chess",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Chess player",
      label: ["", ""],
      art: [],
      article: {
        title: "Women’s Sports Title",
        titleColor: "#00bf9d",
        lead: "LOREM IPSUM",
        body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis….",
        to: "/sports/womens-chess",
      },
    },
  ],
});
