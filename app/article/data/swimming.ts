import mensPlayers from "../assets/swimming/mens-players.jpg";
import womensPlayers from "../assets/swimming/womens-players.jpg";
import { defineSportPrimer } from "../types";

/** Swimming primer (two teams → pinwheel layout). See football.ts for why
 * `art` is empty and `label` is blank on each team. */
export const swimming = defineSportPrimer({
  slug: "swimming",
  name: "Swimming",
  label: ["", "SWIMMING"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Swimming players",
      label: ["", ""],
      art: [],
      article: {
        title: "Men’s Sports Article Title",
        titleColor: "#a30095",
        lead: "LOREM IPSUM",
        body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis….",
        to: "/sports/mens-swimming",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Swimming players",
      label: ["", ""],
      art: [],
      article: {
        title: "Women’s Sports Title",
        titleColor: "#00bf9d",
        lead: "LOREM IPSUM",
        body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis….",
        to: "/sports/womens-swimming",
      },
    },
  ],
});
