import artLeft from "../assets/cheerdance/art-left.svg";
import artR1 from "../assets/cheerdance/art-r1.svg";
import artR2 from "../assets/cheerdance/art-r2.svg";
import artR3 from "../assets/cheerdance/art-r3.svg";
import players from "../assets/cheerdance/players.png";
import { defineSportPrimer } from "../types";

export const cheerdance = defineSportPrimer({
  slug: "cheerdance",
  name: "Cheerdance",
  label: ["CHEERDANCE", ""],
  teams: [
    {
      players,
      playersAlt: "Ateneo Blue Babble Battalion",
      art: [artLeft, artR1, artR2, artR3],
      article: {
        title: "Rooted to Rise",
        titleColor: "#d29300",
        lead: "A FRESH",
        body: "routine takes shape for the Blue Babble Battalion as they prepare to cheer louder in Season 89. With a renewed commitment to continued progress…",
        to: "/sports/cheerdance",
      },
    },
  ],
});
