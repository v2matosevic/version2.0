# offer.version2.hr — Deployment Spec

## What This App Is

Smart Web Plan landing page. High-converting page for web development service subscriptions. Vanilla PHP (no framework). Includes Stripe payments, AI chat widget, custom analytics, admin panel.

**Note:** This app may be absorbed into the main version2.hr site in the future.

## Your Slot on the VPS

| Property | Value |
|----------|-------|
| **Domain** | offer.version2.hr |
| **Container (PHP-FPM)** | `v2-offer-php` |
| **Container (Nginx)** | `v2-offer-nginx` |
| **Internal Port** | 8003 (via v2-offer-nginx) |
| **PHP-FPM Port** | 9000 (internal, v2-offer-php) |
| **Database Host** | `v2-mysql` |
| **Database Port** | 3306 |
| **Database Name** | `offer_v2` |
| **Database User** | `v2offer` |
| **Database Password** | Set in `deploy/env/offer.env` |
| **Docker Network** | `v2-network` |
| **Nginx Config** | `deploy/nginx/conf.d/40-offer.conf` |
| **PHP-FPM Config** | `deploy/nginx/offer-fpm.conf` |
| **Env Template** | `deploy/env/offer.env.example` |

## Stack Requirements

- PHP 8.x with extensions: pdo_mysql, mbstring, curl, json
- No Composer needed (no framework)
- Node.js + esbuild for build step (generates `dist/` folder)

## Dockerfile

```dockerfile
FROM php:8.2-fpm-alpine

# PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring

WORKDIR /var/www/html

# Copy built app (run `npm run build` locally first, or add a build stage)
COPY . .

# Permissions
RUN chown -R www-data:www-data .

EXPOSE 9000
CMD ["php-fpm"]
```

For a build step, add a Node.js stage before the PHP stage:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM php:8.2-fpm-alpine
# ... (copy from builder: COPY --from=builder /app/dist ./public)
```

## Environment Variables

See `deploy/env/offer.env.example`. Key vars:
- `DB_HOST=v2-mysql` (NOT localhost)
- `STRIPE_SECRET_KEY` — Stripe live key
- `OPENAI_API_KEY` — for AI chat widget

## How to Deploy

Same pattern as other apps. See `deploy/apps/README.md`.
