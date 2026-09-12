# Sport primers

A **primer** is one sport's landing section. The reusable `<SportPrimer>`
component renders it entirely from a plain data object, so **all content is
edited in one small data file per sport** — you never touch the component.

```
app/article/
├─ sport-primer.tsx     the reusable component + layouts + animation (don't edit for content)
├─ types.ts             the data shape + season-wide defaults (subtitle, button color…)
├─ data/
│  ├─ basketball.ts     ← edit Basketball here (2 teams → pinwheel)
│  └─ cheerdance.ts     ← edit Cheerdance here (1 team → hero)
└─ assets/<sport>/      that sport's images (players + feather art)
```

Team count picks the layout automatically: **2 teams → 2×2 pinwheel**,
**1 team → full-width hero + centered article**.

## Editing an existing sport

Open `data/<sport>.ts` and change any field. Everything visible is here:

| Field | What it controls |
|---|---|
| `name` | Screen-reader page heading (`"Basketball"`) |
| `label` | Sport label on the photo(s), two lines (`["", "BASKETBALL"]`) |
| `teams[].label` | Per-team label override (`["MEN'S", "BASKETBALL"]`) |
| `teams[].players` | The player cutout image (swap the import at the top) |
| `teams[].playersAlt` | Alt text for the players |
| `teams[].art` | Feather SVGs `[left, r1, r2, r3]` |
| `article.title` / `titleColor` | Heading text + color |
| `article.lead` / `leadColor` | Bold intro run + its color |
| `article.body` | Body copy (auto-clamped to a few lines) |
| `article.to` | Where "Read More" links |
| `article.readMore` | Button label (optional, defaults to "Read More") |
| `article.buttonColor` | Button color (optional, defaults to gold) |

Season-wide text/colors (the "UAAP Season 89 …" subtitle, default lead/button
colors) live once in `PRIMER_DEFAULTS` in `types.ts`.

## Adding a new sport

1. **Assets** → `assets/<sport>/`:
   - `players.png` (or `mens-players.png` / `womens-players.png`) — transparent
     cutout(s), tightly cropped to the figures, ~1500px wide.
   - Feather SVGs `art-left.svg`, `art-r1.svg`, `art-r2.svg`, `art-r3.svg`
     (per team for a 2-team sport, e.g. `mens-art-*` / `womens-art-*`).
2. **Data** → copy `data/basketball.ts` (2 teams) or `data/cheerdance.ts`
   (1 team) to `data/<sport>.ts`, update imports + text.
3. **Route** → render it, e.g. in a route module:
   ```tsx
   import { volleyball } from "../article/data/volleyball";
   import { SportPrimer } from "../article/sport-primer";
   export default () => <SportPrimer primer={volleyball} />;
   ```
   (and register the path in `app/routes.ts`).

Animation, mirroring (left/right swipes), the hero vs pinwheel choice, and
reduced-motion handling are all automatic — the data file never deals with them.
