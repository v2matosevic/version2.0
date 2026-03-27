# v2-offer — offer.version2.hr (Vanilla PHP)

## What This App Is

Smart Web Plan landing page. High-converting page for web development service subscriptions. Vanilla PHP (no framework). Includes Stripe payments, AI chat widget, custom analytics, admin panel.

**Note:** This app may be absorbed into the main version2.hr site in the future.

## Hostinger Project

| Property | Value |
|----------|-------|
| **Project Name** | `v2-offer` |
| **Deploy Method** | GitHub: `v2matosevic/v2-offer` |
| **Domain** | offer.version2.hr |
| **Containers** | `v2-offer-php` (FPM), `v2-offer-nginx` (sidecar) |
| **Internal Port** | 8003 (via v2-offer-nginx) |
| **Database** | `offer_v2` on `v2-mysql` (user: `v2offer`) |
| **Network** | `v2-net` (external) |

## Stack Requirements

- PHP 8.x with extensions: pdo_mysql, mbstring, curl, json
- No Composer needed (no framework)
- Node.js + esbuild for build step (generates `dist/` folder)

## Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM php:8.2-fpm-alpine
RUN docker-php-ext-install pdo_mysql mbstring
WORKDIR /var/www/html
COPY --from=builder /app .
RUN chown -R www-data:www-data .
EXPOSE 9000
CMD ["php-fpm"]
```

## Prerequisites

1. **v2-main** project running (creates `v2-net` network)
2. **v2-db** project running (provides `v2-mysql`)
3. Database `offer_v2` created and populated with production data

## How to Deploy

1. Push code with Dockerfile to `v2matosevic/v2-offer` on GitHub
2. Create `.env` file (DB_HOST=v2-mysql, STRIPE_SECRET_KEY, etc.)
3. Deploy:
   ```
   VPS_createNewProjectV1(
     virtualMachineId=1396909,
     project_name="v2-offer",
     content="https://github.com/v2matosevic/v2-offer"
   )
   ```

## How to Verify

- Containers running: `VPS_getProjectContainersV1(projectName="v2-offer")`
- Logs: `VPS_getProjectLogsV1(projectName="v2-offer")`
- Web: Navigate to `https://offer.version2.hr`
