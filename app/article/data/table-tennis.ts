import mensPlayers from "../assets/table-tennis/mens-players.jpg";
import womensPlayers from "../assets/table-tennis/womens-players.jpg";
import { defineSportPrimer } from "../types";

/** Table tennis primer (two teams → pinwheel layout). See football.ts for
 * why `art` is empty and `label` is blank on each team. */
export const tableTennis = defineSportPrimer({
  slug: "table-tennis",
  name: "Table Tennis",
  label: ["", "TABLE TENNIS"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Table Tennis players",
      label: ["", ""],
      art: [],
      article: {
        title: "Unfinished Business",
        titleColor: "#a30095",
        lead: "FOUR STRAIGHT",
        body: "silver finishes have only deepened the Ateneo Men’s Table Tennis Team’s (AMTTT) desire to finally bring home the gold. After falling short of the championship…",
        to: "/sports/mens-table-tennis",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Table Tennis players",
      label: ["", ""],
      art: [],
      article: {
        title: "Making the Leap",
        titleColor: "#00bf9d",
        lead: "LOOKING TO",
        body: "fight their way back to the top, the Ateneo Women’s Table Tennis Team (AWTTT) enters Season 89 fixed on securing a championship after their short-lived…",
        to: "/sports/womens-table-tennis",
      },
    },
  ],
});
