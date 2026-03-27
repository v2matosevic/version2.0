# v2-web — web.version2.hr (Laravel)

## What This App Is

Laravel-based web application. Currently getting a redesign.

## Hostinger Project

| Property | Value |
|----------|-------|
| **Project Name** | `v2-web` |
| **Deploy Method** | GitHub: `v2matosevic/v2-web` |
| **Domain** | web.version2.hr |
| **Containers** | `v2-web-php` (FPM), `v2-web-nginx` (sidecar) |
| **Internal Port** | 8002 (via v2-web-nginx) |
| **Database** | `web_v2` on `v2-mysql` (user: `v2web`) |
| **Network** | `v2-net` (external) |

## Stack Requirements

- PHP 8.2 with extensions: pdo_mysql, gd, mbstring
- Composer for dependency management
- Node.js (for asset compilation, build-time only)

## Dockerfile

Same pattern as v2-app. See `deploy/apps/app/README.md` for the template. Adjust extensions as needed.

## Prerequisites

1. **v2-main** project running (creates `v2-net` network)
2. **v2-db** project running (provides `v2-mysql`)
3. Database `web_v2` created and populated with production data

## How to Deploy

1. Push code with Dockerfile to `v2matosevic/v2-web` on GitHub
2. Create `.env` file with database credentials (DB_HOST=v2-mysql)
3. Deploy:
   ```
   VPS_createNewProjectV1(
     virtualMachineId=1396909,
     project_name="v2-web",
     content="https://github.com/v2matosevic/v2-web"
   )
   ```
4. Import database dump if not already done

## How to Verify

- Containers running: `VPS_getProjectContainersV1(projectName="v2-web")`
- Logs: `VPS_getProjectLogsV1(projectName="v2-web")`
- Web: Navigate to `https://web.version2.hr`
