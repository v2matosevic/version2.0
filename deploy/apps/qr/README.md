# v2-qr — qr.version2.hr (Next.js)

## What This App Is

QR code generation and management tool. Being built from scratch as a new Next.js application.

## Hostinger Project

| Property | Value |
|----------|-------|
| **Project Name** | `v2-qr` |
| **Deploy Method** | GitHub: `v2matosevic/v2-qr` |
| **Domain** | qr.version2.hr |
| **Container** | `v2-qr-nextjs` |
| **Internal Port** | 3001 |
| **Database** | TBD (SQLite recommended) |
| **Network** | `v2-net` (external) |

## Stack

- Next.js + TypeScript + Tailwind CSS
- Separate standalone app from version2.hr — own repo, own container
- Runs on port 3001 (version2.hr runs on 3000)

## Dockerfile

Same pattern as version2.hr's `Dockerfile` (multi-stage Next.js standalone build). Key difference: `ENV PORT=3001`.

```dockerfile
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

## Prerequisites

1. **v2-main** project running (creates `v2-net` network)

## How to Deploy

1. Create a new GitHub repo `v2matosevic/v2-qr`
2. Build the Next.js app with the Dockerfile above
3. Deploy:
   ```
   VPS_createNewProjectV1(
     virtualMachineId=1396909,
     project_name="v2-qr",
     content="https://github.com/v2matosevic/v2-qr"
   )
   ```

## How to Verify

- Container running: `VPS_getProjectContainersV1(projectName="v2-qr")`
- Logs: `VPS_getProjectLogsV1(projectName="v2-qr")`
- Web: Navigate to `https://qr.version2.hr`

## Design Guidelines

Follow the same brand aesthetics as version2.hr:
- Dark Cinematic Premium theme
- Albert Sans 300 headlines, Manrope 400 body
- Red #991717 accent
- See `CLAUDE.md` in the version2.0 repo for full design spec
