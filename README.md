# STEM Advent Calendar 2026 — Zensical site

A static website for 24 science and technology activities for children aged 6–9.

## Develop locally

1. Install Zensical using the [official instructions](https://zensical.org/docs/).
2. In this directory, run `zensical serve` and open `http://localhost:8000`.
3. To produce the publishable HTML, run `zensical build` (output: `site/`).

## Project structure

- `zensical.toml` — Zensical site settings and navigation.
- `docs/index.md` — introduction and the complete planned calendar.
- `docs/stylesheets/extra.css` — small style overrides.
- `templates/activity.md` — authoring template, **not** published in the site.

## Add an activity

1. Copy `templates/activity.md` to `docs/activities/day-01.md` (change day number).
2. Complete all five required content sections and check the materials, cost, timing and safety.
3. Add its navigation entry to `zensical.toml` under the appropriate week.
4. Add a link from the day name on the homepage once the page exists.

No activity links appear on the initial homepage because the 24 detail pages have not yet been written.

## Translate a mission card

Only the child's mission card is localized; the page heading, adult instructions and site navigation remain in English.

1. Keep the English card inside the `mission-card` wrapper from the activity template.
2. Copy its entire `mission-card__translation` wrapper inside the same outer wrapper, after the English version.
3. Give the copy a unique BCP 47 `lang` code (for example, `sv`) and a native `data-language-label` (for example, `Svenska`). Keep `markdown="1"` on both wrappers and blank lines around the Markdown content.
4. Translate the complete card, including its title, equipment list, numbered steps and closing question. Keep quantities and safety instructions equivalent to the English original.
5. Run `zensical build`, then check the language selector using `zensical serve`.

Day 1 provides an English/Swedish example. The shared controller in [docs/javascripts/mission-card.js](docs/javascripts/mission-card.js) discovers the available translations; no JavaScript changes are needed to add a language or activity.

The button above the card appears only when there are multiple languages. English is the default. A selection is remembered in this browser when local storage is available; pages without that translation fall back to English without overwriting the preference. Keep an English version on every card.

Without JavaScript, all translations remain readable with language labels. With JavaScript, printing includes only the selected translation and hides the selector. Search may match any translation because all versions are included in the generated page.

Before deployment, set `site_url` in `zensical.toml` to the real public base URL (recommended by Zensical).
