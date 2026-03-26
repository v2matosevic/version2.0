# ── Stage 1: Install dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ── Stage 2: Build the Next.js standalone app ──
FROM node:20-alpine AS builder
WORKDIR /app

# Dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Rebuild native modules (better-sqlite3) for Linux
RUN npm rebuild better-sqlite3

# Build-time env
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js (standalone output)
RUN npm run build

# ── Stage 3: Production runtime ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# System deps for better-sqlite3
RUN apk add --no-cache libstdc++

# Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone server
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Content files (blog posts, portfolio, config)
COPY --from=builder /app/content ./content

# Data directory for SQLite (mounted as volume in production)
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
