# Cuppet Design System

Brand contract for the Cuppet marketing site and product surfaces.
Sources of practice: Hallmark (modern-minimal, anti-slop), Open Design (`DESIGN.md` + tokens), UI/UX Pro Max (SaaS landing discipline).

## Intent

Cuppet is scheduled agents across apps people already use. The site should feel **warm, operational, and trustworthy** — not playful consumer toys, not neon AI, not glassmorphism.

Tone: direct, specific, calm. Prefer concrete workflow language over generic SaaS buzzwords.

## Audience & job

- **Audience:** busy operators, PMs, founders, knowledge workers who already live in mail, calendar, docs, and chat.
- **Primary action:** join the waitlist.
- **Secondary action:** understand connectors + how scheduling differs from chat.

## Genre

**Modern-minimal** with a warm operational accent (sage on paper). Single restrained brand hue. Generous whitespace. Large confident display. Product mockups over abstract illustration.

## Color

| Token | Value | Use |
| --- | --- | --- |
| Page | `#fbfaf8` | Root background |
| Canvas | `#f3f1ec` | Soft bands |
| Surface | `#ffffff` | Cards, panels |
| Ink | `#1c1a17` | Headings, body |
| Accent | `#5f8a74` | CTAs, focus, active |
| Accent deep | `#4a6f5c` | Hover / emphasis |
| Accent soft | `rgba(95, 138, 116, 0.14)` | Chips, rings |
| Footer | `#1a1815` | Closing band |

Rules:

- One chromatic brand color. Warm neutrals everywhere else.
- No purple/pink AI gradients, no neon, no full-page color floods.
- Light text on dark footer only; keep body contrast ≥ 4.5:1.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display / brand | Comfortaa 600–700 | Wordmark, major marketing headings |
| Body / UI | Inter 400–600 | Paragraphs, nav, forms, dense UI |
| Mono (product only) | system mono | Logs, IDs inside mockups |

Scale:

- Display hero: `clamp(2.25rem, 4.6vw, 3.75rem)`, tracking `-0.035em`, line-height ~1.08
- Section H2: `clamp(1.875rem, 3vw, 2.5rem)`
- Body: 16–18px / 1.65
- Labels / eyebrows: 11–12px, uppercase, tracking ~0.1em, accent-deep or muted ink
- Never italicize display headers. Emphasis via weight or accent color only.

## Layout

- Max content width ~1200–1280px, gutters `clamp(20px, 4vw, 56px)`.
- Hero: two-column (title + actions left, lede right) collapsing to one column under 720px.
- Section rhythm: intro → content → quiet band → next; avoid card-in-card nesting.
- Sticky floating nav (pill shell), not a full-bleed sticky slab.
- Footer: statement + compact link groups + single CTA — not a saturated 5-column mega-footer.

## Components

### Primary CTA

- Min height 44px, radius 10–12px (pill allowed on nav bar only).
- Fill: vertical green gradient (`#74a08a` → `#5f8a74` → `#547564`).
- Text: on-accent, 13–14px, weight 600–700.
- Hover: lift 1px + soft ring (`accent-soft`). Active: no lift.
- Always `cursor: pointer`. Focus-visible ring on all interactive elements.

### Secondary control

- Transparent / white fill, 1px border `ink @ 12%`, ink text.
- Hover: border accent, slight surface tint.

### Cards

- Radius 12px, hairline border, soft sage-tinted shadow.
- Hover transitions 160–220ms, transform/opacity only.
- Product scenes stay dense and operational (schedules, permissions, logs).

### Section markers

- Optional registration cross (brand craft) — at most one per section intro, never decorative clutter elsewhere.

## Motion

- Utilitarian only: hover, focus, short section reveals, demo state changes.
- Durations 160–220ms controls; ≤420ms section reveals.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for exits/reveals.
- Respect `prefers-reduced-motion`: collapse to opacity / instant.
- No bounce, overshoot, or endless decorative float on primary content.

## Content rules

- Do not invent metrics, customer counts, or testimonials.
- Prefer “what it does” over “AI-powered”.
- Headlines ≤ ~10 words when possible; lead with the outcome.
- Buttons say the action: “Join the waitlist”, not “Get started” unless the route is onboarding.

## Do / Don’t

**Do**

- Warm paper + sage accent + operational mockups
- Large display + quiet body
- Permission / schedule / log language in demos
- Real screenshots when available

**Don’t**

- AI purple gradients, glassmorphism, neon cyberpunk
- Fake browser/OS chrome unless the product surface requires a phone frame for a mobile demo
- Emoji as icons (use SVG)
- Invented social proof
- Bouncy micro-interactions on marketing chrome

## Implementation

Canonical tokens live in `tokens.css` and are mirrored as CSS variables in `app/globals.css`. Prefer `var(--color-*)` / `var(--space-*)` over raw hex in new work.

```css
@import "../tokens.css"; /* or project-relative path */
```

## Stamp

```
/* Cuppet · modern-minimal · warm-operational · tokens: tokens.css */
```
