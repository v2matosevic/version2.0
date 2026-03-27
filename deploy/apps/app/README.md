# app.version2.hr — Deployment Spec

## What This App Is

Digital business card platform. Users create, customize, and share NFC-enabled digital business cards with 21 design templates.

## Your Slot on the VPS

| Property | Value |
|----------|-------|
| **Domain** | app.version2.hr |
| **Container (PHP-FPM)** | `v2-app-php` |
| **Container (Queue Worker)** | `v2-app-worker` |
| **Container (Nginx)** | `v2-app-nginx` |
| **Internal Port** | 8001 (via v2-app-nginx) |
| **PHP-FPM Port** | 9000 (internal, v2-app-php) |
| **Database Host** | `v2-mysql` |
| **Database Port** | 3306 |
| **Database Name** | `app_v2cards` |
| **Database User** | `v2app` |
| **Database Password** | Set in `deploy/env/app.env` |
| **Docker Network** | `v2-network` |
| **Nginx Config** | `deploy/nginx/conf.d/20-app.conf` |
| **PHP-FPM Config** | `deploy/nginx/app-fpm.conf` |
| **Env Template** | `deploy/env/app.env.example` |

## Stack Requirements

- PHP 8.2 with extensions: pdo_mysql, gd (freetype + jpeg), bcmath, mbstring
- Composer for dependency management
- Node.js (for asset compilation via Laravel Mix, build-time only)
- Laravel queue worker running: `php artisan queue:work --sleep=3 --tries=3`

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

## Environment Variables

Copy `deploy/env/app.env.example` to `deploy/env/app.env` and fill in:

```env
APP_KEY=           # Generate with: php artisan key:generate --show
DB_PASSWORD=       # Must match what's set in deploy/.env (APP_DB_PASSWORD)
MAIL_PASSWORD=     # Zoho app-specific password
```

The database host is `v2-mysql` (Docker service name), NOT `localhost`.

## How to Deploy

1. Push your code to your GitHub repo with the Dockerfile above
2. The orchestrating agent uncomments your service block in `deploy/docker-compose.yml`
3. The orchestrating agent uncomments the proxy block in `deploy/nginx/conf.d/20-app.conf`
4. Import your database: `docker exec -i v2-mysql mysql -u root -p app_v2cards < dump.sql`
5. Rebuild: `VPS_createNewProjectV1(virtualMachineId=1396909, project_name="version2", content="https://github.com/v2matosevic/version2.0")`

## How to Verify

- Container running: `VPS_getProjectContainersV1` → look for `v2-app-php`, `v2-app-nginx`
- Logs: `VPS_getProjectLogsV1(projectName="version2")`
- Web: Navigate to `https://app.version2.hr` (after DNS) or test via Host header
