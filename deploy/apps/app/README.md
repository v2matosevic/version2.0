# v2-app — app.version2.hr (Laravel)

## What This App Is

Digital business card platform. Users create, customize, and share NFC-enabled digital business cards with 21 design templates.

## Hostinger Project

| Property | Value |
|----------|-------|
| **Project Name** | `v2-app` |
| **Deploy Method** | GitHub: `v2matosevic/v2-app` |
| **Domain** | app.version2.hr |
| **Containers** | `v2-app-php` (FPM), `v2-app-worker` (queue), `v2-app-nginx` (sidecar) |
| **Internal Port** | 8001 (via v2-app-nginx) |
| **Database** | `app_v2cards` on `v2-mysql` (user: `v2app`) |
| **Network** | `v2-net` (external) |

## Stack Requirements

- PHP 8.2 with extensions: pdo_mysql, gd (freetype + jpeg), bcmath, mbstring
- Composer for dependency management
- Node.js (for asset compilation via Laravel Mix, build-time only)
- Laravel queue worker: `php artisan queue:work --sleep=3 --tries=3`

## Dockerfile

Place this `Dockerfile` in your repo root:

```dockerfile
FROM php:8.2-fpm-alpine AS base

# System deps
RUN apk add --no-cache \
    libpng-dev libjpeg-turbo-dev freetype-dev \
    icu-dev libzip-dev oniguruma-dev

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo_mysql gd intl zip mbstring bcmath opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy app source
COPY . .

# Laravel optimizations
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
```

## Prerequisites

1. **v2-main** project running (creates `v2-net` network)
2. **v2-db** project running (provides `v2-mysql`)
3. Database `app_v2cards` created and populated with production data

## How to Deploy

1. Push code with Dockerfile to `v2matosevic/v2-app` on GitHub
2. Create `.env` file with database credentials (DB_HOST=v2-mysql)
3. Deploy:
   ```
   VPS_createNewProjectV1(
     virtualMachineId=1396909,
     project_name="v2-app",
     content="https://github.com/v2matosevic/v2-app"
   )
   ```
4. Import database dump if not already done:
   ```bash
   docker exec -i v2-mysql mysql -u root -p app_v2cards < dump.sql
   ```

## How to Verify

- Containers running: `VPS_getProjectContainersV1(projectName="v2-app")`
- Logs: `VPS_getProjectLogsV1(projectName="v2-app")`
- Web: Navigate to `https://app.version2.hr`
