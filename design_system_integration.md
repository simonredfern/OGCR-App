# OGCR Design System integration

How this app consumes the OGCR Design System: why it hand-mirrors the token values
instead of installing the package, what is pinned to which upstream commit, how to
re-reconcile when upstream moves, and which components have been ported to Svelte.

This is a record of *our consumption* of the design system. It is not the design
system's specification — that lives upstream at
`packages/design-system/docs/design-system.md` and is the authority. Where this
document and the upstream spec disagree about the design system, the spec wins.

## The short version

The OGCR Design System is a **React 19 + Base UI + Tailwind v4** component library.
This app is **SvelteKit 5 + Skeleton 4 + Tailwind v4**. None of its 42 components can be
imported here. So we mirror its **token values** by hand and build the Svelte components
ourselves against the published spec.

Everything in this document exists so that mirroring is a *checkable* operation rather
than a copy that silently rots — which is exactly what happened to the previous copy
(see the [drift log](#drift-log)).

## Upstream provenance (what we are pinned to)

| | |
| --- | --- |
| Repo | `https://github.com/Maji-Studio/ogcr` |
| Remote (SSH) | `git@github.com:Maji-Studio/ogcr.git` |
| Local clone | `~/Documents/workspace_2024/Maji-Studio/ogcr` |
| Branch | `main` |
| Reconciled against commit | `182d425e76ce204826c9b2440930b5a8f7d02094` (`182d425`, 2026-09-07) |
| Package | `@majistudio/ogcr-design-system` **1.1.0** (also on npm) |
| Token source files | `packages/design-system/src/styles/palette.css` (all 62 colour literals)<br>`packages/design-system/src/styles/theme.css` (spacing / radius / type / elevation / motion) |
| Written spec | `packages/design-system/docs/design-system.md` |
| Last upstream commit that changed those tokens | `e9471331f60bec1d76c91198771be4f392602cb7` (`e947133`, 2026-08-13) — *"feat(ds): align tokens to figma and ship the full stylesheet contract"* |
| Figma source of truth | file `2P6XrQJhT8I39IR5LGK7RT` (OGCR – Design System); upstream last reconciled it 2026-08-13 |

**The token pin that matters is `e947133`, not `182d425`.** `182d425` is just the repo HEAD
we happened to read. If `git log e947133..main -- packages/design-system/src/styles/` is
empty, our tokens are current no matter how far HEAD has moved.

### Predecessor repo — do not use

`https://github.com/Maji-Studio/ogcr-design-system` is **archived** and frozen at 1.0.0.
Its README points at the monorepo. Its Vercel demo and Storybook are frozen too. A local
clone may still exist at `~/Documents/workspace_2024/OGCR-design/ogcr-design-system`;
treat it as historical only.

## Why we do not just install the package

Installing `@majistudio/ogcr-design-system` and importing its `styles.css` is technically
possible in a Tailwind v4 app, and it would give us exact tokens. We are not doing it yet,
for one specific reason documented in the upstream spec (§1, *Consuming the shipped
stylesheet*):

> **`--spacing` is pinned to `1px` globally.** […] Stock Tailwind sets `.25rem` […]
> **This rescales existing app markup that used the stock 4px-step scale: `p-4` is 4px
> now, not 16px.** Sweep numeric spacing classes during adoption.

This app sets `--spacing: 0.25rem` (`src/ogcr-theme.css`) and uses **1,192 numeric
spacing/size classes across 37 of its 41 Svelte files**. Importing the stylesheet shrinks
every one of them to a quarter size. That is an app-wide restyling sweep, not a
token refresh, and it cannot be scoped to one route — `--spacing` lives in `@theme` at
the root.

Two further behaviour changes from the same section, for whenever we do adopt it:

- `--font-size-m` moved 16 → 18px, taking `--text-h4` and `--text-body` with it. Body copy
  and h4 grow 2px system-wide.
- `shadow-elevation-s` never existed. If anything here uses it, it renders nothing.

## What we mirror, and what we deliberately do not

**`src/ogcr-design-system-reference.css`** — the mirror. Named DS tokens at their exact
upstream values. It is reference/documentation; nothing imports it.

**`src/ogcr-theme.css`** — the active theme. Two distinct things live here:

1. *The named DS token block* — a 1:1 mirror of upstream values. Keep exact.
2. *The Skeleton `--color-*` ramps* — **derived, not mirrored.** These are interpolated
   11-step ramps with DS values pinned at particular steps (e.g. `--color-secondary-400`
   is `brand-green-500`, `-500` is `interaction-primary-default`). The in-between steps
   have no upstream counterpart and are ours. Do not "reconcile" them against upstream;
   only the anchor steps need to agree.

   One consequence as of 1.1.0: `--color-secondary-600` / `--color-success-600`
   (`#416c51`) no longer correspond to *any* DS token — `interaction-primary-hover` moved
   away from that value. They remain valid ramp steps. Code that wants the true brand
   hover must use `var(--interaction-primary-hover)`, not `secondary-600`.

## Drift log

### 2026-09-22 — first reconciliation

The previous mirror claimed to be a *"verbatim copy of
OGCR-design/ogcr-design-system/src/index.css captured 2026-05-04."* That file no longer
exists upstream — it was split into `palette.css` + `theme.css`. Diffing the mirror
against the real palette found, of 62 upstream colour tokens: **38 identical, 5 drifted,
19 missing.**

Drifted values (old → correct):

| Token | Was | Now | Note |
| --- | --- | --- | --- |
| `--text-positive` | `#416c51` | `#4f8263` | |
| `--icon-positive` | `#416c51` | `#4f8263` | |
| `--interaction-primary-hover` | `#416c51` | `#335641` | |
| `--interaction-primary-active` | `#416c51` | `#335641` | |
| `--interaction-secondary-focus` | `#e2d0bf` | `#c3daed` | a beige where the brand has light blue |

The green moves are upstream's deliberate *active-green vs. selection-navy* split
(`68073dd` in the archived repo).

Added (were missing): `yellow-300`, `text-progress`, `icon-progress`, the four `icon-*-light`
tokens, `surface-progress`, `border-neutral-strong`, `border-positive-strong`,
`border-warning-strong`, the four `interaction-secondary-*` tokens,
`interaction-tertiary-active`, `scrollbar-track`, `scrollbar-thumb`, `z-overlay`, `z-toast`.

Non-colour drift found in the same pass:

- **Type ladder.** Upstream is 10 / 14 / 18 / 20 / 24 / 32 / 40 / 48 / 64. Ours had
  `--font-size-xs: 14px` and `--font-size-s: 16px`; 16px is not on the ladder at all.
  Corrected to `xs: 10px`, `s: 14px`. **This is the one change here that can reflow
  existing markup** — anything using `--font-size-xs`/`-s` directly gets smaller.
- **`--radius-full`** was `999px`; upstream is `9999px`.
- **`--focus-ring-error` was removed upstream.** Per the spec: *"It existed, referenced
  nothing, and was removed; use `--focus-error` (the full shadow) instead."* Ours is kept
  for now, marked deprecated, because app code still references it.

## How to check whether upstream has changed

```bash
npm run check:design-tokens
```

Fetches the published tarball for the pinned version and diffs every token against
`src/ogcr-design-system-reference.css` — all 62 `--ds-*` colours from `dist/styles.css`,
plus the spacing, radius, type, elevation, motion and font-family scales from
`dist/theme.css`. Exit 0 in sync, 1 on drift, 2 if it could not check (offline).

It reads the **published npm package**, not a clone, so it needs no checkout and no
machine-specific path — and it compares against the artifact we would actually consume
if we ever adopt the stylesheet directly. It also prints a note when a newer version
than our pin exists; `--latest` checks against that version instead.

The script normalises what the minified stylesheet does to values: `#fff` back to
`#ffffff`, `var(--ds-x)` to our bare `var(--x)`, unitless `0` to `0px`, and upstream's
`rem` type scale to our `px`. The renamed scales are compared through an explicit map
(`--space-m` ↔ `--spacing-16`, `--font-size-s` ↔ `--text-s`, and so on) which lives at
the top of the script.

### When it reports drift

Update all four together, or the next reader gets a different answer depending on which
file they open:

1. `src/ogcr-design-system-reference.css` — the mirror
2. `src/ogcr-theme.css` — the *named DS token block* only, not the Skeleton ramps
3. `src/routes/design/+page.svelte` — the gallery hardcodes the values as display strings
4. this document — the provenance block, and a row in the drift log below

Then bump `PINNED_VERSION` in the script.

### Checking for unreleased changes

The script tracks published releases. To see whether something is brewing upstream that
has not been published yet, use the clone:

```bash
cd ~/Documents/workspace_2024/Maji-Studio/ogcr
git fetch && git log e947133..origin/main -- packages/design-system/src/styles/
```

Empty output means nothing has touched the token sources since our pin.

## Component port status

We build these in Svelte ourselves. Upstream section numbers refer to
`packages/design-system/docs/design-system.md`.

| Upstream component | Spec | Status here |
| --- | --- | --- |
| Card | §4.3 | not yet ported |
| Pill | §4.6 | not yet ported |
| Message | §4.9 | not yet ported |
| KPI | §4.11 | not yet ported |
| Table | §4.14 | not yet ported |
| Select / Combobox | §4.17 / §4.18 | not yet ported — build on `bits-ui` |
| Tabs | §4.23 | not yet ported — build on `bits-ui` |
| Breadcrumb | §4.26 | not yet ported |
| Pagination | §4.27 | not yet ported |
| Tooltip | §4.34 | not yet ported — build on `bits-ui` |

### A trap in the spec

`docs/design-system.md` §4.1–4.14 shows copy-paste CSS using `ogcr-*` BEM class names
(`.ogcr-card`, `.ogcr-table__th`). **Those classes exist nowhere in the shipped source** —
`grep -r "ogcr-card" packages/design-system/src/` returns nothing. The real components are
Tailwind utility strings with `data-slot` anatomy (e.g. Card is
`flex flex-col gap-16 p-16 bg-surface-light border border-border-medium rounded-16`).

This survives upstream's own *"reconcile the spec with figma and code"* pass (`d345312`),
so it is live in 1.1.0. Upstream's `CLAUDE.md` says the spec wins over code on
disagreement; for this particular disagreement it should not. **Read the component source,
use the doc for behaviour, anatomy and rationale.**

## Appendix: on porting this app to React

Not planned. Recorded because the question keeps coming up.

The case for it is narrow and real: the design system is React and will stay React, so in
Svelte we hand-port all 42 components and hand-port every future release — plus TanStack
Table, which the registry table leans on. Upstream `apps/farmer-prototype` (Next.js 16 +
React 19) is a working reference for consuming the DS, and the monorepo is shaped to take
a second app.

The case against: ~6,600 lines of Svelte markup across 41 components, plus the pieces with
no mechanical mapping — `svelte-kit-sessions` + Redis + arctic OAuth (farmer uses
better-auth), form actions, `adapter-node`. The markup is mechanical; the auth flow is not,
because verifying it means round-trips against a live OBP server.

What would *not* need rewriting: `src/lib/` — roughly 4,470 lines of framework-free
TypeScript (`obp/`, `chain/`, `oauth/`, `marketplace/`, `reference/`, `health-check/`).
Only three files there import anything SvelteKit-specific.

Note also that `farmer-prototype` is not a backend we could inherit: its only tables are
Better Auth's plus generic `projects`/`items`, it defaults to `MOCK_DATA=true` with an
in-memory store, and every carbon-domain surface in it (programs, dashboard, the 2,097-line
scope-3 flow) is hardcoded TypeScript constants. This app has considerably more real
domain logic than it does.
