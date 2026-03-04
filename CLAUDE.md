# PersonalSite — Claude Instructions

## Project Overview
A static fantasy-themed personal site hub (no framework, no build step, plain HTML/CSS/JS).
Opens directly in a browser via `file://`. Three planned sub-sites: Resume, Woodworking Showcase, Book Tracker.

GitHub: https://github.com/tomhoskins/PersonalSite

---

## Git & GitHub Rules

- **Always commit and push after every meaningful change.** Never leave work uncommitted at the end of a session.
- **One logical change per commit.** Don't batch unrelated edits together.
- **Commit message format:**
  ```
  <type>: <short imperative summary>

  <optional body — what and why, not how>

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
  Types: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`
- **Always push to `origin/master`** after committing: `git push origin master`
- **Never force-push, never amend published commits.**
- **Never commit:** `.env`, secrets, `node_modules/`, OS files (already in `.gitignore`).
- To run locally: open `index.html` directly in the browser (`start "" index.html` on Windows).

---

## File Structure

```
PersonalSite/
├── index.html          # Single page — all sections inline
├── css/
│   ├── reset.css       # Box-model reset only
│   ├── variables.css   # All design tokens (edit here first)
│   ├── typography.css  # Font rules, text styles
│   ├── layout.css      # Page structure, sections, grid, candles
│   ├── components.css  # Cards, badges, reusable UI pieces
│   ├── animations.css  # All @keyframes and animation assignments
│   └── responsive.css  # Media queries only (no new design here)
└── js/
    └── embers.js       # Particle system + scroll parallax var
```

**No external images.** All textures via CSS gradients + inline SVG `feTurbulence`. All SVG is inline in `index.html`.

---

## Design System

### Colors — always use CSS variables, never raw hex in CSS rules
| Variable | Value | Use |
|---|---|---|
| `--color-void` | `#0A0805` | Page background |
| `--color-deep-stone` | `#1A1510` | Section backgrounds |
| `--color-stone` | `#2C2418` | Elevated surfaces |
| `--color-parchment` | `#C8A96E` | Body text, secondary |
| `--color-parchment-light` | `#E8D5A3` | Primary text |
| `--color-parchment-bright` | `#F5ECD7` | Hero/headings |
| `--color-gold` | `#D4A017` | Primary accent |
| `--color-gold-bright` | `#FFD700` | Hover states, glow |
| `--color-gold-dim` | `#8B6914` | Resting borders |
| `--color-ember-orange` | `#FF6B35` | Particles |

**Per-card accent variables** (defined in `variables.css`):
- Resume: `--color-resume` / `--color-resume-glow`
- Woodworking: `--color-wood` / `--color-wood-glow`
- Books: `--color-books` / `--color-books-glow`

### Typography
- **Headings, labels, nav:** `Cinzel` (Google Fonts, weights 400/600/700/900)
- **Body, descriptions, bios:** `EB Garamond` (regular + italic)
- All font sizes use `clamp()` — never fixed `px` for text.
- Gold gradient text pattern (hero name, can be reused):
  ```css
  background: linear-gradient(180deg, #FFD700 0%, #D4A017 40%, #8B6914 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ```

### Spacing
Use the spacing scale from `variables.css`: `--space-xs` through `--space-2xl`. No arbitrary pixel values.

### Borders & Surfaces
- Resting card border: `1px solid var(--color-gold-dim)`
- Hover card border: `1px solid var(--color-gold)`
- Card background: radial gradient + SVG noise overlay (see `components.css`)

---

## Design Aesthetic Rules

- **High fantasy** — Lord of the Rings / Game of Thrones feel at all times.
- Dark backgrounds only. No white or light-mode surfaces.
- Gold is the primary accent. Per-realm colors (green, blue) are secondary and used only within their card.
- New sections follow the same parchment-texture card pattern.
- New icons must be inline SVG, matching the existing stroke-based style (~54×54 viewBox, `currentColor`).
- New dividers should follow the existing ornamental SVG style (centre diamond/dot, fading ruled lines).
- Candles remain desktop-only (`display:none` below 1024px).
- Always add `aria-hidden="true"` to decorative SVGs and `aria-label` to interactive/landmark elements.

---

## Animations & Motion

- All `@keyframes` go in `animations.css`.
- All transitions use variables: `--transition-fast`, `--transition-mid`, `--transition-slow`.
- Every animation block must include a `prefers-reduced-motion` guard in `animations.css` (the global one at the bottom already covers it).
- Card hover: `translateY(-6px)` + border + glow only — don't add scale or other transforms.

---

## Responsive Rules

- Breakpoints: mobile `< 640px`, sm `640px`, lg `1024px`.
- All media queries go in `responsive.css` only.
- Grid: 1 col mobile → 2 col sm → 3 col lg (already set; don't change without a good reason).

---

## Adding a New Sub-Site Card

1. Copy an existing `<article class="realm-card card--X">` block in `index.html`.
2. Add a new per-card color pair to `variables.css`.
3. Add `.card--X .card-glow` and `.card--X .card-title` rules to `components.css`.
4. Match corner filigree stroke color to the new accent color.
5. Create a new inline SVG icon (54×54, stroke-based, `currentColor`).
6. Commit: `feat: add <realm name> realm card`

---

## What Not To Do

- Don't introduce external images, icon libraries, or CSS frameworks.
- Don't add JavaScript beyond `embers.js` unless a feature genuinely requires it.
- Don't use hardcoded hex colors in CSS — always use a variable.
- Don't create new CSS files — use the existing ones.
- Don't skip committing and pushing at the end of a session.
