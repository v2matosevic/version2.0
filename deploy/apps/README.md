# Version2.hr — Subdomain App Deployment Guide

## For Agents / Developers

This directory contains deployment specs for each subdomain app that runs on the Version2 VPS. If you're an agent working on one of these apps, read your app's README for exact instructions.

## VPS Access

The VPS is managed through the **Hostinger MCP** (MCP server name: `hostinger-mcp`). You can:
- List projects: `VPS_getProjectListV1` (VM ID: `1396909`)
- View containers: `VPS_getProjectContainersV1`
- View logs: `VPS_getProjectLogsV1`
- Deploy: `VPS_createNewProjectV1` (with GitHub URL or raw YAML)
- Update: `VPS_updateProjectV1`

**VPS ID:** 1396909
**VPS IP:** 76.13.134.6

## Shared Infrastructure

All apps share these resources on the VPS:

| Resource | Details |
|----------|---------|
| **Nginx proxy** | Routes by Host header. Config in `deploy/nginx/conf.d/`. Container: `v2-nginx` |
| **MySQL 8.0** | Container: `v2-mysql`, port 3306. Three databases pre-created. |
| **Docker network** | `v2-network` — all containers join this bridge network |
| **SSL** | Cloudflare Origin Certificate on nginx (*.version2.hr) |

## App Slots

| Subdomain | Directory | Status |
|-----------|-----------|--------|
| [app.version2.hr](./app/) | `deploy/apps/app/` | Awaiting repo + DB |
| [web.version2.hr](./web/) | `deploy/apps/web/` | Awaiting redesign |
| [offer.version2.hr](./offer/) | `deploy/apps/offer/` | Awaiting repo + DB |
| [qr.version2.hr](./qr/) | `deploy/apps/qr/` | New build — not started |

## Deployment Pattern

Every app follows the same pattern:

1. **Your repo** has a `Dockerfile` at the root
2. **Your compose service** is defined in `deploy/docker-compose.yml` (uncomment your block)
3. **Your nginx config** is in `deploy/nginx/conf.d/` (uncomment the proxy block)
4. **Your env vars** are in `deploy/env/{app}.env`
5. **Your database** (if MySQL) is pre-created on `v2-mysql`

To deploy, the orchestrating agent runs:
```
VPS_createNewProjectV1(virtualMachineId=1396909, project_name="version2", content="https://github.com/v2matosevic/version2.0")
```

This rebuilds all services from the main repo's `docker-compose.yaml`.

## Important: Do NOT

- Deploy your app as a separate Docker Compose project (port conflicts, network isolation)
- Modify `docker-compose.yaml` at the repo root without coordinating with the main site
- Touch `v2-nginx` or `v2-nextjs` containers
- Delete Docker volumes (they contain production data)
