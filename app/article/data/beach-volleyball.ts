import mensPlayers from "../assets/beach-volleyball/mens-players.jpg";
import womensPlayers from "../assets/beach-volleyball/womens-players.jpg";
import { defineSportPrimer } from "../types";

/** Beach volleyball primer (two teams → pinwheel layout). See football.ts
 * for why `art` is empty and `label` is blank on each team. */
export const beachVolleyball = defineSportPrimer({
  slug: "beach-volleyball",
  name: "Beach Volleyball",
  label: ["", "BEACH VOLLEYBALL"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Beach Volleyball players",
      label: ["", ""],
      art: [],
      article: {
        title: "Men’s Sports Title",
        titleColor: "#a30095",
        lead: "LOREM IPSUM",
        body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis….",
        to: "/sports/mens-beach-volleyball",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Beach Volleyball players",
      label: ["", ""],
      art: [],
      article: {
        title: "Head in the Game",
        titleColor: "#00bf9d",
        lead: "THE ATENEO",
        body: "Women’s Beach Volleyball Team gears up for Season 89 with unrelenting drive for redemption after the Final Four bid slipped through their hands in the previous …",
        to: "/sports/womens-beach-volleyball",
      },
    },
  ],
});
