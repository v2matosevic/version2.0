# web.version2.hr — Deployment Spec

## What This App Is

Laravel-based web application. Currently getting a redesign.

## Your Slot on the VPS

| Property | Value |
|----------|-------|
| **Domain** | web.version2.hr |
| **Container (PHP-FPM)** | `v2-web-php` |
| **Container (Nginx)** | `v2-web-nginx` |
| **Internal Port** | 8002 (via v2-web-nginx) |
| **PHP-FPM Port** | 9000 (internal, v2-web-php) |
| **Database Host** | `v2-mysql` |
| **Database Port** | 3306 |
| **Database Name** | `web_v2` |
| **Database User** | `v2web` |
| **Database Password** | Set in `deploy/env/web.env` |
| **Docker Network** | `v2-network` |
| **Nginx Config** | `deploy/nginx/conf.d/30-web.conf` |
| **PHP-FPM Config** | `deploy/nginx/web-fpm.conf` |
| **Env Template** | `deploy/env/web.env.example` |

## Stack Requirements

- PHP 8.2 with extensions: pdo_mysql, gd, mbstring
- Composer for dependency management
- Node.js (for asset compilation, build-time only)

## Dockerfile

Same pattern as app.version2.hr — see `deploy/apps/app/README.md` for the template. Adjust extensions as needed for your app's requirements.

## Environment Variables

Copy `deploy/env/web.env.example` to `deploy/env/web.env` and fill in:

```env
APP_KEY=           # Generate with: php artisan key:generate --show
DB_PASSWORD=       # Must match WEB_DB_PASSWORD in deploy/.env
MAIL_PASSWORD=     # Zoho app-specific password
```

Database host is `v2-mysql`, NOT `localhost`.

## How to Deploy

Same pattern as app.version2.hr:
1. Push code with Dockerfile to GitHub repo
2. Orchestrating agent uncomments service block in `deploy/docker-compose.yml`
3. Orchestrating agent uncomments proxy block in `deploy/nginx/conf.d/30-web.conf`
4. Import database dump
5. Rebuild via Hostinger MCP
