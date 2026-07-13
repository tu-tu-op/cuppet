# Keel-Inspired Design System

Source target: https://keel.so/
Generated from the public Keel homepage and DESIGN.md guidance on 2026-07-11.

## Design Intent

Keel's visual language is a warm, precise operations-platform aesthetic: editorial display typography, compact SaaS controls, dense operational UI mockups, and restrained color accents. The experience should feel controlled, fast, trustworthy, and built for operators who manage real workflows.

Use this design system when building interfaces that should resemble Keel's public website and product previews, not as a brand-legal reproduction of Keel assets.

## Colors

### Core Palette

- **Page Background** (`#FFFFFF`): Main page background and navigation surface.
- **Warm Canvas** (`#FAF7F6`): Secondary page bands, quiet sections, and warm product mockup backgrounds.
- **Hero Cream** (`#FFFBF7`): Hero panels and soft editorial surfaces.
- **Cream Accent** (`#FFF4D5`): Low-intensity highlight fills, badges, and warning-tinted UI states.
- **Warm Border** (`#E8D6C5`): Pill borders, soft dividers, and beige-tinted card outlines.

### Text

- **Heading Ink** (`#26201C`): Primary display headings and section headlines.
- **Body Ink** (`#3D3533`): Main body copy and strong labels.
- **Muted Copy** (`#57524D`): Supporting paragraphs and secondary explanatory text.
- **Soft Black 60** (`rgba(0, 0, 0, 0.6)`): Hero supporting copy and subdued metadata.
- **Soft Black 45** (`rgba(9, 9, 0, 0.45)`): Hairline shadows and fine UI separators.

### Brand And Action

- **Primary Green Top** (`#16806A`): Top stop of primary CTA gradient.
- **Primary Green Bottom** (`#0E5E4E`): Bottom stop of primary CTA gradient.
- **Primary Border** (`#0C5F4E`): CTA border and pressed outline.
- **Deep Green** (`#077460`): Strong success/action accents.
- **Dark Green Section** (`#275F55`): Footer/about bands and dark editorial sections.

### Accent Colors

- **Badge Orange** (`#FF9923`): "NEW" pill, glow accents, and announcement markers.
- **Gold** (`#FFBA17`): Logo/accent geometry and warm highlights.
- **Coral** (`#FF866F`): Logo/accent geometry and light error/warm UI marks.
- **Sky Blue** (`#30A5FF`): Logo/accent geometry and integration highlights.
- **Violet** (`#9700F4`): Logo/accent geometry and advanced/developer highlights.
- **Mint** (`#5DDCC2`): Code syntax and positive technical accents.

### Semantic Tokens

- **Success Text** (`#027947`) with **Success Fill** (`#EAF3CE`).
- **Warning Text** (`#DC6803`) with **Warning Fill** (`#FFF4D5`).
- **Info Text** (`#175CD3`) with **Info Fill** (`#D1E9FF`).
- **Purple Text** (`#6927DA`) with **Purple Fill** (`#ECE9FE`).

## Typography

### Font Families

- **Display**: `"Family Medium", Georgia, "Times New Roman", serif`
  - Use for hero headings and major editorial section titles.
  - Weight: 500.
  - Character: high-contrast, literary, confident.
- **Interface**: `"Inter", "Inter Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Use for navigation, body copy, buttons, labels, cards, tables, and metadata.
  - Weights: 400, 500, 600, 700.
- **Code/Data**: `"Fragment Mono", "Geist Mono", "IBM Plex Mono", "PT Mono", monospace`
  - Use for schema/code panels, row IDs, data values, technical tags, and console UI.

### Type Scale

- **Hero Display Desktop**: 62px / 100%, weight 500, centered, `#26201C` or `rgba(0,0,0,0.85)`.
- **Hero Display Tablet/Mobile**: 48px / 100%, weight 500, centered.
- **Section Heading Desktop**: 46px / 1.1, weight 500, `#26201C`.
- **Section Heading Mobile**: 36-38px / 1.1, weight 500.
- **Subsection Heading**: 24-28px / 1.15, weight 600.
- **Body Large**: 17-18px / 150%, weight 400, muted ink.
- **Body**: 14-16px / 140-150%, weight 400-500.
- **Navigation**: 14px / 1em, weight 600, `#3D3D3D`.
- **Button**: 13px / 19px, weight 550-600, letter spacing `0.02em`.
- **Caption/Metadata**: 11-13px / 16-18px, weight 500-600.

Keep display text tightly set with line-height near 1.0-1.1. Do not use negative letter spacing; Keel's key type is compact through font choice and line height.

## Spacing

Use a 4px base unit.

- **Micro**: 4px
- **Small**: 8px
- **Compact Gap**: 12px
- **Default Gap**: 16px
- **Medium Gap**: 24px
- **Section Gap**: 32-40px
- **Large Gap**: 48-64px
- **Hero Padding**: 80px top, 74px bottom on desktop
- **Page Gutter Desktop**: 24px
- **Page Gutter Mobile**: 16px
- **Max Page Width**: 1500px
- **Hero Text Width**: 760px
- **Mockup Width**: up to 1400px

## Layout

- Use a centered, max-width page shell with 24px desktop gutters.
- Keep hero content vertically stacked: announcement, display heading, supporting copy, primary CTA, then product/mockup visualization.
- Use warm full-width bands and unframed sections instead of nested cards.
- Use cards for repeated feature/module items, product mockups, tables, and modal-like UI only.
- Make operational UI examples dense and believable: tables, status rows, field groups, progress indicators, small labels, and code panels.
- Breakpoints:
  - Desktop: `min-width: 900px`
  - Tablet: `651px - 899.98px`
  - Mobile: `max-width: 650.98px`

## Components

### Header

- White surface with 8px radius.
- Layout: logo left, nav centered, auth/actions right.
- Padding: 12px vertical around the nav bar.
- Nav text: Inter Display, 14px, 600, `#3D3D3D`.
- Keep links sparse. Avoid heavy dropdown chrome unless the content needs it.

### Primary Button

- Height: 40px.
- Radius: 4px.
- Border: 1px solid `#0C5F4E`.
- Background: linear gradient `180deg, #16806A 0%, #0E5E4E 100%`.
- Text: white, 13px, 550-600, line-height 19px, slight positive letter spacing.
- Shadow/focus ring: `0 4px 4px rgba(234,234,234,0.25), 0 0 0 3px rgba(19,114,95,0.12)`.

### Secondary Button

- Radius: 4px.
- Border: 1px solid `rgba(61, 53, 51, 0.25)`.
- Background: transparent or `rgba(250,247,246,0)`.
- Text: Inter, 14px, 600, dark ink.
- Dark variant: transparent fill, 1px `rgba(255,255,255,0.25)` border, white text.

### Announcement Badge

- Outer capsule radius: 58px.
- Inner `NEW` pill: `#FF9923`, radius 100px, small glow `0 0 13.9px 1px rgba(255,154,35,0.25)`.
- Text: 13px, 500, `rgba(0,0,0,0.64)`.
- Keep copy short and pair with a bold inline link.

### Module Pills

- Radius: 50px.
- Border: 1px solid `#E8D6C5`.
- Background: `rgba(252,247,245,0.65)`.
- Shadow: `0 2px 5.3px rgba(199,146,68,0.18)`.
- Text: 12px / 22px, weight 500, `#635B5B`.

### Cards And Panels

- Radius: 7-8px.
- Background: white, `#FFFBF7`, or `rgba(255,255,255,0.92)`.
- Border: 1px warm border or `rgba(0,0,0,0.09)`.
- Use soft shadow, not heavy elevation.
- Content density should be high: labels, rows, values, status chips, sparklines, and avatars can coexist if alignment is strict.

### Product UI Mockups

- Favor beige/off-white application surfaces with compact sidebars, tabs, breadcrumbs, data tables, and workflow status bars.
- Text sizes are mostly 11-14px.
- Use `#1CA388` / green for active progress, warm orange/coral for attention, and muted grays for inactive states.
- Field rows should feel structured and operational rather than decorative.

### Code Panels

- Dark surface: `#30323A`, `#292B34`, or `#36383F`.
- Header dots: coral `#ED6B5B`, yellow `#F3BF49`, green `#5BC550`.
- Code label: 11px / 16px, Inter or mono, `rgba(255,255,255,0.4)`.
- Syntax accents: blue `#57A4D4`, gold `#F6C451`, coral `#F8927F`, violet `#D085FF`, mint `#5DDCC2`, gray `#9B9B9B`.

## Elevation

- **Hairline Panel**: `0 1px 8px rgba(0,0,0,0.02), 0 0 1px rgba(0,0,0,0.4)`.
- **Soft Card**: `0 4px 12px -2px rgba(26,26,1,0.08), 0 2px 4px -2px rgba(26,26,1,0.12)`.
- **Floating UI**: `0 0 1px rgba(9,9,0,0.45), 0 10px 15px -3px rgba(26,26,1,0.12), 0 4px 6px -4px rgba(26,26,1,0.12)`.
- **Warm Pill**: `0 2px 5.3px rgba(199,146,68,0.18)`.
- **Inset Button Highlight**: `inset 0 1px 2px rgba(255,255,255,0.25)`.

## Imagery And Graphics

- Use real product UI mockups or purpose-built interface composites as the main visual asset.
- Hero backgrounds can use a soft radial cream gradient and subtle honeycomb/geometric texture.
- Use restrained conic or linear brand color glows only to support product visuals.
- Logo/accent geometry may combine gold, coral, sky blue, and violet.
- Avoid generic stock photos, abstract-only hero art, or decorative blobs disconnected from operations/product workflows.

## Motion

- Motion should feel utilitarian: hover highlights, soft reveals, progress changes, tab/layer transitions, and gentle mockup movement.
- Avoid bouncy or playful effects.
- Keep transitions short: 120-220ms for controls, 250-400ms for section reveals.

## Voice And Content

- Tone: direct, operational, confident, and specific.
- Prefer short declarative lines and concrete workflow language.
- Emphasize control, speed, ownership, integrations, and fit to real operations.
- Use operator/developer contrast when helpful, but keep it practical.
- Avoid generic SaaS buzzwords unless paired with concrete workflow examples.

## Do And Don't

- **Do** use warm editorial surfaces with compact, serious product UI.
- **Do** pair large display headlines with small, precise interface details.
- **Do** make mockups feel like real operations software: orders, inventory, fulfilment, warehouse, production, approvals, tasks, schema, APIs.
- **Do** keep radii mostly 4-8px, reserving 50-100px radius for pills only.
- **Do** keep CTAs green and high contrast.
- **Don't** overuse purple, blue, or orange as full-page themes; reserve them for accents.
- **Don't** use oversized marketing cards where a dense product section would communicate better.
- **Don't** make the UI feel playful, glassy, or neon.
- **Don't** replace operational mockups with vague illustrations.

## CSS Token Starter

```css
:root {
  --color-page: #ffffff;
  --color-canvas: #faf7f6;
  --color-hero: #fffbf7;
  --color-cream: #fff4d5;
  --color-border-warm: #e8d6c5;

  --color-heading: #26201c;
  --color-body: #3d3533;
  --color-muted: #57524d;

  --color-primary-top: #16806a;
  --color-primary-bottom: #0e5e4e;
  --color-primary-border: #0c5f4e;
  --color-section-dark: #275f55;

  --radius-control: 4px;
  --radius-card: 8px;
  --radius-pill: 50px;

  --font-display: "Family Medium", Georgia, "Times New Roman", serif;
  --font-ui: "Inter", "Inter Display", system-ui, sans-serif;
  --font-code: "Fragment Mono", "Geist Mono", "IBM Plex Mono", monospace;
}
```
