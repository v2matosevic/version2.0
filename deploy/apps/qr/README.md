# qr.version2.hr — Deployment Spec

## What This App Is

QR code generation and management tool. **Being built from scratch** as a new Next.js application. This is NOT a migration — it's a greenfield project.

## Your Slot on the VPS

| Property | Value |
|----------|-------|
| **Domain** | qr.version2.hr |
| **Container** | `v2-qr-nextjs` |
| **Internal Port** | 3001 |
| **Database** | TBD (SQLite recommended for simplicity, or MySQL on `v2-mysql`) |
| **Docker Network** | `v2-network` |
| **Nginx Config** | `deploy/nginx/conf.d/50-qr.conf` |
| **Env Template** | TBD (create `deploy/env/qr.env.example`) |

## Stack

- **Next.js** + TypeScript + Tailwind CSS
- This is a separate standalone app from version2.hr — own repo, own container
- Runs on port 3001 (version2.hr runs on 3000)

## Dockerfile

Same pattern as version2.hr's `Dockerfile` (multi-stage Next.js standalone build). Copy it and change `PORT` to `3001`:

```dockerfile
# Same structure as the root Dockerfile in version2.0 repo
# Key difference: ENV PORT=3001

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p data
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data
USER nextjs
EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

## How to Deploy

1. Create a new GitHub repo for the QR app
2. Build the Next.js app with Tailwind CSS
3. Add the Dockerfile above to the repo root
4. Orchestrating agent uncomments the `v2-qr-nextjs` service in `deploy/docker-compose.yml`
5. Orchestrating agent uncomments the proxy block in `deploy/nginx/conf.d/50-qr.conf`
6. Rebuild via Hostinger MCP

## Design Guidelines

This app should follow the same brand aesthetics as version2.hr:
- Dark Cinematic Premium theme
- Albert Sans 300 headlines, Manrope 400 body
- Red #991717 accent
- See `CLAUDE.md` in the version2.0 repo for full design spec
