# ZetaZone Site Spec — v1

## Overview

ZetaZone is a single-page website for the ZetaZone Burning Man theme camp.
Live at **[zetazone.org](https://zetazone.org)**.

---

## Infrastructure

| Layer              | Service / Tool                  |
| ------------------ | ------------------------------- |
| Domain registrar   | GoDaddy                         |
| DNS                | Cloudflare (nameservers)        |
| Email forwarding   | Cloudflare Email Routing        |
| Hosting / CDN      | Vercel (auto-deploy from `main`) |
| Source control      | GitHub — `roip/zetazone`        |
| Package manager    | pnpm                            |

### Email

- `hello@zetazone.org` forwards to `zetazonecamp@gmail.com` via Cloudflare Email Routing.
- Gmail "Send mail as" configured so replies go out as `hello@zetazone.org`.
- SPF record: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`

### Deployment

- Pushes to `main` auto-deploy on Vercel.
- Build command: `pnpm build` (runs `next build`).
- No environment variables required.

---

## Tech Stack

| Concern    | Technology                     |
| ---------- | ------------------------------ |
| Framework  | Next.js 16 (App Router)        |
| Language   | TypeScript                      |
| Styling    | Tailwind CSS v4                 |
| Font       | Inter (via `next/font/google`)  |
| Images     | `next/image` (optimized)        |
| Dev tools  | sharp-cli (favicon generation)  |

---

## Project Structure

```
zetazone/
├── public/
│   ├── favicon.ico                  # 32x32 generated from hi-res.png
│   ├── apple-icon.png               # 180x180 Apple touch icon
│   └── images/
│       ├── site/                    # Logo variants, social icons
│       │   ├── hi-res.png           # Primary logo (Camp)
│       │   ├── hi-res-brc.png       # Alternate logo (Black Rock City)
│       │   ├── 2025-logo.jpg        # Original low-res logo
│       │   ├── ig.png               # Instagram icon
│       │   └── fb.png               # Facebook icon
│       └── gallery/
│           ├── camp/                # Camp life photos (12 images)
│           └── projects/            # Art/build project photos (18 images)
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout, metadata, fonts, icons
│   │   ├── page.tsx                 # Single-page site (all sections)
│   │   └── globals.css              # Tailwind imports + theme colors
│   └── components/
│       └── Gallery.tsx              # Reusable image gallery + lightbox
├── specs/
│   └── site-spec-v1.md             # This file
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Design System

### Color Palette (derived from camp logo)

| Token   | Hex       | Role                                |
| ------- | --------- | ----------------------------------- |
| `night` | `#0f1a2e` | Primary background                  |
| `deep`  | `#152238` | Alternating section background      |
| `navy`  | `#1b2d4a` | Cards, panels, image placeholders   |
| `slate` | `#2a4a6b` | Blue mid-tone, borders              |
| `dusk`  | `#3b5f87` | Lighter blue accent                 |
| `ember` | `#e08a3a` | Primary accent — headings, buttons  |
| `glow`  | `#d4a04a` | Secondary warm accent — links       |
| `flare` | `#e8622a` | Hover states, alerts                |
| `sand`  | `#e6c87a` | Body text, nav links                |
| `playa` | `#f0dca0` | Brightest text — hero title         |

### Typography

- Font: **Inter** (Google Fonts, variable)
- Headings: `font-bold` / `font-extrabold`, color `ember` or `glow`
- Body: color `sand/70`

---

## Site Sections

All sections live in a single page (`page.tsx`) with anchor-link navigation.

### 1. Navigation (sticky)
- Logo (hi-res.png, rounded) + "ZETAZONE" wordmark
- Links: About, Gallery, Projects, Camp Notes, Contact
- Backdrop blur, semi-transparent background
- Desktop only (hidden on mobile — TODO: add hamburger menu)

### 2. Hero
- Large centered logo
- "ZetaZone" title with ember/playa split color
- Tagline
- Two CTA buttons: "Learn More" → #about, "Get In Touch" → #contact

### 3. About
- Camp description paragraph
- Background: `deep/50` alternating band

### 4. Camp Gallery
- Reusable `Gallery` component with 12 camp photos
- 3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

### 5. Projects
- Same `Gallery` component with 18 project photos
- Background: `deep/50` alternating band

### 6. Camp Notes (placeholder)
- "Blog posts coming soon." — not yet implemented

### 7. Contact
- Email link: `hello@zetazone.org`
- Social icons: Instagram, Facebook (with linked images)
- Background: `deep/50` alternating band

### 8. Footer
- Copyright year (dynamic)
- "Built with dust and love."

---

## Components

### `Gallery` (`src/components/Gallery.tsx`)

Reusable image gallery with lightbox. Client component.

**Props:**
- `items: GalleryItem[]` — array of `{ src, alt, caption? }`
- `columns?: 2 | 3 | 4` — responsive grid columns (default 3)

**Features:**
- Responsive grid: 1 col → 2 col → 3/4 col based on breakpoint
- Click thumbnail to open lightbox overlay
- Lightbox: prev/next arrows on desktop, swipe on mobile
- Keyboard navigation: ← → arrows, Escape to close
- Captions: always visible on mobile, hover-reveal on desktop
- Image counter + "swipe to navigate" hint on mobile
- Body scroll lock when lightbox is open

---

## Metadata & SEO

- Title: "ZetaZone — Burning Man Camp"
- Description: "ZetaZone is a Burning Man theme camp. Explore our gallery, projects, and camp notes."
- OpenGraph tags configured for social sharing
- Favicon: 32x32 `.ico` from camp logo
- Apple touch icon: 180x180 `.png`

---

## Future / TODO

- [ ] Mobile hamburger menu for nav
- [ ] Camp Notes blog (MDX or CMS-backed posts)
- [ ] Image captions for gallery photos
- [ ] About section: expanded content, crew bios
- [ ] OG image for social sharing previews
- [ ] Image optimization: consider moving large galleries to a CDN or using blur placeholders
- [ ] Contact form (instead of / in addition to mailto)
- [ ] Analytics (Vercel Analytics or Plausible)
