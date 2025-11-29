#!/bin/bash
set -e

echo "Info Evry - Deploy Script"
echo "========================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Update submodules
echo -e "${YELLOW}Updating submodules...${NC}"
git submodule update --init --recursive

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
bun install

# Build
echo -e "${YELLOW}Building...${NC}"
bun run build

# Deploy
echo -e "${YELLOW}Deploying to Cloudflare...${NC}"
bunx wrangler deploy

echo -e "${GREEN}Deployment complete!${NC}"
