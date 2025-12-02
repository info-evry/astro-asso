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

- **Framework**: Astro 5.x (static site generation)
- **Hosting**: Cloudflare Pages
- **Design**: Shared design system via git submodule
- **Content**: Shared knowledge base via git submodule
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
├── design/                   # Shared design system (submodule)
├── knowledge/                # Shared content (submodule)
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
# Clone with submodules
git clone --recursive https://github.com/info-evry/astro-asso.git
cd astro-asso

# Or init submodules if already cloned
git submodule update --init --recursive

# Install dependencies
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

Deployment is handled via Cloudflare Pages CI.

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

## Updating Submodules

When the design system or knowledge base is updated:

```bash
# Update both submodules to latest
git submodule update --remote

# Or update individually
git submodule update --remote design
git submodule update --remote knowledge

# Commit the update
git add design knowledge
git commit -m "Update submodules"
git push
```

## Related Repositories

- [astro-design](https://github.com/info-evry/astro-design) - Shared design system
- [astro-knowledge](https://github.com/info-evry/astro-knowledge) - Shared content
- [astro-ndi](https://github.com/info-evry/astro-ndi) - NDI registration platform
- [astro-join](https://github.com/info-evry/astro-join) - Membership portal

## License

AGPL-3.0 - Asso Info Evry
