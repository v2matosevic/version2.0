# v2-db — Shared MySQL Database

## What This Is

MySQL 8.0 database server shared by the PHP apps (app, web, offer). Runs as an independent Hostinger Docker project on the `v2-net` network.

## Hostinger Project

| Property | Value |
|----------|-------|
| **Project Name** | `v2-db` |
| **Deploy Method** | Raw YAML via `createNewProjectV1` |
| **Container** | `v2-mysql` |
| **Port** | 3306 (internal, not published) |
| **Network** | `v2-net` (external) |
| **Volume** | `mysql-data` (persistent) |

## Databases

| Database | User | App |
|----------|------|-----|
| `app_v2cards` | `v2app` | app.version2.hr |
| `web_v2` | `v2web` | web.version2.hr |
| `offer_v2` | `v2offer` | offer.version2.hr |

## How to Deploy

1. Ensure v2-main is running (creates `v2-net`)
2. Deploy via Hostinger MCP with the YAML from `docker-compose.yaml` in this directory
3. After first start, run the init SQL to create databases and users:

```bash
# SSH into VPS, then:
docker exec -i v2-mysql mysql -u root -p < /path/to/01-create-databases.sql
```

The init SQL is at `deploy/mysql/init/01-create-databases.sql` in the main repo.

## Environment Variables

Set these when deploying the raw YAML:

```
MYSQL_ROOT_PASSWORD=<strong-password>
APP_DB_PASSWORD=<app-db-password>
WEB_DB_PASSWORD=<web-db-password>
OFFER_DB_PASSWORD=<offer-db-password>
```

## Backup

```bash
docker exec v2-mysql mysqldump -u root -p --all-databases --single-transaction > backup.sql
```
