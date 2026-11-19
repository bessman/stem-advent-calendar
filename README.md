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

Before deployment, set `site_url` in `zensical.toml` to the real public base URL (recommended by Zensical).
