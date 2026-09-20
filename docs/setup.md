# Initial Setup Guide - Info Evry Website

This guide walks you through setting up the Info Evry association website.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- Cloudflare account

## Step 1: Clone the Repository

```bash
# Clone the maestro repo (this project is part of its Bun workspace)
git clone git@github.com:info-evry/astro-maestro.git
cd astro-maestro
bun install
```

## Step 2: Configure Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Workers & Pages > Create application > Pages
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `bun run build`
   - Build output directory: `dist`
   - Root directory: `/`

## Step 3: Environment Variables

No environment variables are required for the basic setup.

For sessions (if needed), add a KV binding named `SESSION`.

## Step 4: Deploy

The first deployment happens automatically after connecting the repository.

For manual deployments:

```bash
bun run deploy
```

## Troubleshooting

astro-asso is a static site (`output: 'static'`) with no Cloudflare adapter, so
there is no SESSION KV binding or `.assetsignore` to manage here.

## Next Steps

- See [deploy.md](./deploy.md) for deployment workflow
- Configure a custom domain in Cloudflare Pages settings
