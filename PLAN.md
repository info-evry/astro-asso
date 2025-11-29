# Landing Page Plan - Association d'Informatique d'Evry

## Tech Stack (matching ~/Developer/asso/ndi/)
- **Astro 5.x** - Static site generation with server rendering capability
- **@astrojs/cloudflare** - Cloudflare Workers adapter
- **TypeScript** - Type safety
- **Vanilla CSS** - Custom properties design system (no Tailwind)
- **Vanilla JavaScript** - Minimal, no framework dependencies

## Content Structure (scraped from websites)

### Organization Info
- **Name**: Association des Etudiants en Informatique de l'Université d'Evry
- **Short name**: Association Info Evry / ADIEVE
- **Instagram**: @info_evry, @adieve.ueve

### Sections to Include

#### 1. Hero Section
- Association name with gradient text animation
- Tagline: "La communauté des étudiants en informatique d'Evry"
- Animated background gradient orbs (Linear style)
- CTA buttons: "Rejoindre l'association" + "Découvrir"

#### 2. About Section
- What is the association
- Mission: unify CS students, provide resources, organize events
- Modern glassmorphism cards with hover effects

#### 3. Resources Section (from info-evry.fr)
Grid of resource cards with icons and hover animations:
- **ECAMPUS** - Plateforme officielle de cours
- **Math Info Portal** - Portail d'informations
- **Drive** - Contenus partagés et ressources
- **Telegram** - Groupe de partage d'informations
- **Discord** - Serveur de communication étudiant
- **Contact** - Contacter les représentants

#### 4. Nuit de l'Info Section
- Event description (presentation only, no form)
- What: Competition nationale de développement web
- When: Premier jeudi de décembre, du coucher au lever du soleil (~16h)
- Teams: Étudiants multi-disciplinaires
- Challenges: Défis proposés par des entreprises partenaires
- Link to registration form at ndi project

#### 5. Membership Section
- Benefits of joining
- CTA to membership registration (link to asso.info-evry.fr/inscriptions)

#### 6. Footer
- Social links (Instagram)
- Copyright
- Contact info

---

## Design System (Linear/Vercel inspired)

### Colors
```css
:root {
  /* Base colors */
  --color-bg: #000000;
  --color-bg-subtle: #0a0a0a;
  --color-surface: #111111;
  --color-surface-elevated: #1a1a1a;

  /* Text */
  --color-text: #ffffff;
  --color-text-secondary: #a1a1a1;
  --color-text-muted: #666666;

  /* Accent gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
  --gradient-blue: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  --gradient-green: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  --gradient-orange: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);

  /* Glow effects */
  --glow-purple: 0 0 60px rgba(139, 92, 246, 0.3);
  --glow-blue: 0 0 60px rgba(59, 130, 246, 0.3);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
}
```

### Typography
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-display: 'Inter', sans-serif;

/* Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 2rem;
--text-4xl: 2.5rem;
--text-5xl: 3.5rem;
--text-6xl: 4.5rem;
```

### Visual Effects

#### Gradient Orbs (Hero background)
```css
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 20s ease-in-out infinite;
}

.orb-purple {
  background: rgba(139, 92, 246, 0.4);
  width: 600px;
  height: 600px;
}

.orb-blue {
  background: rgba(59, 130, 246, 0.3);
  width: 400px;
  height: 400px;
  animation-delay: -5s;
}
```

#### Glassmorphism Cards
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--border-default);
  transform: translateY(-4px);
  box-shadow: var(--glow-purple);
}
```

#### Gradient Text
```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Animated Border Gradient
```css
.border-gradient {
  position: relative;
  background: var(--color-surface);
  border-radius: 16px;
}

.border-gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: var(--gradient-primary);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.border-gradient:hover::before {
  opacity: 1;
}
```

### Animations

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Float (for orbs)
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
```

#### Shimmer (for loading/highlight)
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Component Patterns

#### Buttons
```css
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--color-text);
  padding: 12px 24px;
  border-radius: 8px;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}
```

#### Navigation
- Sticky header with blur backdrop
- Subtle border bottom
- Logo + nav links + CTA button

---

## File Structure

```
/Users/gc/Developer/asso/asso/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── wrangler.toml
├── public/
│   ├── favicon.svg
│   └── fonts/
│       └── Inter-Variable.woff2
└── src/
    ├── layouts/
    │   └── Layout.astro
    ├── components/
    │   ├── Header.astro
    │   ├── Hero.astro
    │   ├── About.astro
    │   ├── Resources.astro
    │   ├── NuitInfo.astro
    │   ├── Membership.astro
    │   └── Footer.astro
    ├── styles/
    │   └── global.css
    └── pages/
        └── index.astro
```

---

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Astro project with Cloudflare adapter
2. Set up design system CSS variables
3. Create base layout with global styles
4. Add Inter font (variable weight)

### Phase 2: Core Components
1. **Header** - Sticky nav with blur, logo, links, CTA
2. **Hero** - Gradient orbs, animated title, CTAs
3. **Footer** - Social links, copyright

### Phase 3: Content Sections
1. **About** - Glassmorphism cards, mission statement
2. **Resources** - Icon grid with hover effects
3. **Nuit de l'Info** - Event presentation with visuals
4. **Membership** - Benefits list, CTA

### Phase 4: Polish
1. Add scroll-triggered animations (Intersection Observer)
2. Responsive design adjustments
3. Performance optimization (font loading, image optimization)
4. Meta tags and SEO

---

## External Links

- Registration form (NDI): Link to ~/Developer/asso/ndi/ deployment
- Membership: Link to asso.info-evry.fr/inscriptions
- Resources: Direct links to ECAMPUS, Drive, Discord, Telegram, etc.
- Instagram: @info_evry, @adieve.ueve
