# Asso Info Evry - Association Website

Official website for Asso Info Evry, the student association for Computer Science at Université d'Évry Val-d'Essonne.

**Live site**: https://asso.info-evry.fr

## Features

- Modern glassmorphism dark theme design
- Responsive mobile-first layout with floating tab bar
- Association information and mission
- Resource links (Discord, Telegram, GitHub, Drive)
- Nuit de l'Info event promotion
- Membership section with benefits
- SF Symbols icons throughout

## Tech Stack

- **Framework**: Astro 6.x (static site generation)
- **Hosting**: Cloudflare Workers
- **Design**: Shared design system via the maestro Bun workspace (`@info-evry/astro-design`)
- **Content**: Shared knowledge base via the maestro Bun workspace (`@info-evry/knowledge`)
- **Styling**: CSS with custom properties (design tokens)

## Project Structure

```
astro-asso/
├── src/
│   ├── pages/
│   │   └── index.astro       # Main landing page
│   ├── components/
│   │   ├── Header.astro      # Site header (wraps design system)
│   │   ├── Footer.astro      # Site footer (wraps design system)
│   │   ├── Hero.astro        # Hero section with CTA
│   │   ├── About.astro       # About the association
│   │   ├── Resources.astro   # Links and resources
│   │   ├── NuitInfo.astro    # NDI event promotion
│   │   └── Membership.astro  # Join the association
│   └── layouts/
│       └── Layout.astro      # Base layout with MobileNav
├── public/
│   ├── fonts/               # SF Symbols font
│   ├── favicon.svg          # Site favicon
│   └── robots.txt           # SEO robots file
└── docs/
    └── setup.md             # Setup guide
```

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- Cloudflare account (for deployment)

### Installation

```bash
# Clone the maestro repo (this project is part of its Bun workspace)
git clone https://github.com/info-evry/astro-maestro.git
cd astro-maestro
bun install
```

### Local Development

```bash
bun run dev
```

Visit `http://localhost:4321`

### Build

```bash
bun run build
```

### Deploy

Deployment is handled via Cloudflare Workers.

```bash
# Preview build locally
bun run preview
```

## Page Sections

| Section | Anchor | Description |
|---------|--------|-------------|
| Hero | - | Main hero with association tagline |
| À propos | `#a-propos` | About the association |
| Ressources | `#ressources` | Links to Discord, Telegram, Drive |
| Nuit de l'Info | `#ndi` | NDI event promotion |
| Rejoindre | `#rejoindre` | Membership benefits and CTA |

## Mobile Navigation

The site uses a floating tab bar on mobile (via `MobileNav` from the design system):

- À propos → `#a-propos`
- Ressources → `#ressources`
- NDI → `#ndi`
- Rejoindre (CTA) → `/adhesion`

## Updating Shared Packages

The design system (`@info-evry/astro-design`) and knowledge base (`@info-evry/knowledge`) are
maestro Bun workspace packages under `projects/`. Update them by editing those projects directly
and running `bun install` from the maestro root.

## Related Repositories

- `astro-design` (`@info-evry/astro-design` workspace package) - Shared design system
- `astro-knowledge` (`@info-evry/knowledge` workspace package) - Shared content
- `astro-ndi` (maestro workspace project) - NDI registration platform
- `astro-join` (maestro workspace project) - Membership portal

## License

AGPL-3.0 - Asso Info Evry
