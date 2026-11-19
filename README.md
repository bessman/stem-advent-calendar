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

## Print all mission cards

Use **Print all 24 mission cards** on the homepage, or **Print mission cards** in the navigation. Choose **English** or **Svenska**, then **Print / Save PDF**. The language choice is shared with the individual activity pages and remembered in this browser.

The combined HTML page loads the current cards from all 24 activity pages; no separate copies need updating. Only languages available on every card are offered, and printing stays disabled if loading fails. JavaScript and a running site are required.

Print on A4 or Letter in portrait at 100% scale with browser headers and footers off. Cards have dashed cutting borders and measure 90 x 120 mm, arranged four per sheet. Fold each card in half twice to fit a 7 cm box. Select **Save as PDF** in the browser print dialog to export a PDF.

## Overall inventory

Use **Overall inventory** in the navigation to view one table collected from the Materials lists on all 24 activity pages. Equivalent items are grouped alphabetically, with activity entries in day order within each group and links back to each source list. Use **Sort by** to switch between grouped **Item** order and numeric **Activity day** order. Activity order repeats the item name on each row. Each activity's amount and notes are preserved; quantities are not combined. JavaScript and a running site are required.

### Materials naming and reuse

- Use a `## Materials list` section with exactly three columns: `Item`, `Amount needed`, and `Notes`.
- Reuse an existing item name for interchangeable materials, preferably singular: for example, `Small clear cup` regardless of quantity. Grouping ignores case and repeated whitespace, but does not guess synonyms or singular/plural variants.
- Put quantities and dimensions in `Amount needed`; keep specifications and safety requirements in `Notes`. Keep non-interchangeable materials distinct, such as `Adhesive tape` and `Insulating tape`, or small paperclips and large steel paperclips.
- A shared name means the same kind of material, not necessarily the same physical object. Consumables such as tape need a portion for each activity. For the same physical equipment, write `Reuse the [item] from Day N.` in Notes, and identify any additional parts separately.
- List components separately even when supplied as an assembly. Preserve assembly and safety instructions in Notes. For example, a reused red LED and resistor have separate rows while remaining connected in series.
- Keep retained experiments distinct from fresh supplies. Use `Keep the setup intact for Day N.` when creating one, and identify the original day when reusing it. Containers and components in a retained setup remain occupied until that activity.
- Notes are for people, not parsed metadata. There is no automatic purchasing total or inferred reuse calculation; check the per-activity notes before buying or packing materials.

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
