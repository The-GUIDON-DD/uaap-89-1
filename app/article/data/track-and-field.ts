import mensPlayers from "../assets/track-and-field/mens-players.jpg";
import womensPlayers from "../assets/track-and-field/womens-players.jpg";
import { defineSportPrimer } from "../types";

/** Track and field primer (two teams → pinwheel layout). See football.ts
 * for why `art` is empty and `label` is blank on each team. */
export const trackAndField = defineSportPrimer({
  slug: "track-and-field",
  name: "Track and Field",
  label: ["", "TRACK AND FIELD"],
  teams: [
    {
      players: mensPlayers,
      playersAlt: "Ateneo Men’s Track and Field player",
      label: ["", ""],
      art: [],
      article: {
        title: "Faster, Higher, Longer",
        titleColor: "#a30095",
        lead: "THE ATENEO",
        body: "Men’s Track and Field Team (AMTF) showcased their rising power in Season 88, bringing home nine medals and a program-record 150-point haul. Hungry for more…",
        to: "/sports/mens-track-and-field",
      },
    },
    {
      players: womensPlayers,
      playersAlt: "Ateneo Women’s Track and Field player",
      label: ["", ""],
      art: [],
      article: {
        title: "Taking the Lead",
        titleColor: "#00bf9d",
        lead: "RENEWED BY",
        body: "grit, the Ateneo Women’s Track and Field Team (AWTF) charges into UAAP Season 89 eager to redeem the Blue and White. Aiming to rise above…",
        to: "/sports/womens-track-and-field",
      },
    },
  ],
});
