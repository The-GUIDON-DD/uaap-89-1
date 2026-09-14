import mensPlayers from "../assets/badminton/mens-players.jpg";
import womensPlayers from "../assets/badminton/womens-players.jpg";
import { defineSportPrimer } from "../types";

/** Badminton primer (two teams → pinwheel layout). See football.ts for why
 * `art` is empty and `label` is blank on each team. */
export const badminton = defineSportPrimer({
  slug: "badminton",
  name: "Badminton",
  label: ["", "BADMINTON"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Badminton players",
      label: ["", ""],
      art: [],
      article: {
        title: "The Standard Bearers",
        titleColor: "#a30095",
        lead: "HAVING RETURNED",
        body: "to the mountaintop last season, the Ateneo Men’s Badminton Team is primed to defend the throne and claim back-to-back status as UAAP champions…",
        to: "/sports/mens-badminton",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Badminton players",
      label: ["", ""],
      art: [],
      article: {
        title: "Greater than Greatness",
        titleColor: "#00bf9d",
        lead: "A CHAMPIONSHIP",
        body: "solidifies legacies for teams, but five championships over a six-year span set dynasties in writing forever. For the Ateneo Women’s Badminton Team…",
        to: "/sports/womens-badminton",
      },
    },
  ],
});
