# Version2.hr — Multi-Project Deployment Guide

## Architecture

The VPS runs 6 independent Hostinger Docker projects on a shared network (`v2-net`). Each project deploys independently — updating one app does not rebuild or restart others.

```
v2-main (this repo)
  ├── v2-nginx    :80/:443  ── reverse proxy, routes by Host header
  └── v2-nextjs   :3000     ── version2.hr (Next.js)

v2-db
  └── v2-mysql    :3306     ── shared MySQL 8.0

v2-app (own repo)
  ├── v2-app-php  :9000     ── app.version2.hr (Laravel PHP-FPM)
  ├── v2-app-worker          ── Laravel queue worker
  └── v2-app-nginx :8001    ── nginx sidecar

v2-web (own repo)
  ├── v2-web-php  :9000     ── web.version2.hr (Laravel PHP-FPM)
  └── v2-web-nginx :8002    ── nginx sidecar

v2-offer (own repo)
  ├── v2-offer-php :9000    ── offer.version2.hr (Vanilla PHP-FPM)
  └── v2-offer-nginx :8003  ── nginx sidecar

v2-qr (own repo)
  └── v2-qr-nextjs :3001   ── qr.version2.hr (Next.js)
```

All containers join `v2-net` and resolve each other by `container_name`.

## VPS Access

Managed through **Hostinger MCP** (`hostinger-mcp`):

| Action | Tool | Key Params |
|--------|------|------------|
| List projects | `VPS_getProjectListV1` | `virtualMachineId: 1396909` |
| View containers | `VPS_getProjectContainersV1` | `projectName: "v2-main"` |
| View logs | `VPS_getProjectLogsV1` | `projectName: "v2-main"` |
| Deploy from GitHub | `VPS_createNewProjectV1` | `content: "https://github.com/..."` |
| Deploy raw YAML | `VPS_createNewProjectV1` | `content: "<yaml string>"` |
| Redeploy | `VPS_updateProjectV1` | `projectName: "v2-main"` |

**VPS ID:** 1396909 | **IP:** 76.13.134.6

## Deploy Order

1. **v2-main** (first — creates the `v2-net` network)
2. **v2-db** (if PHP apps need MySQL)
3. **v2-app**, **v2-web**, **v2-offer**, **v2-qr** (any order)

## Shared Resources

| Resource | Details |
|----------|---------|
| **Network** | `v2-net` — created by v2-main, joined as external by others |
| **Nginx proxy** | Routes by Host header. Configs baked into image at `deploy/nginx/conf.d/` |
| **MySQL 8.0** | Container `v2-mysql` in v2-db project. Three databases pre-created |
| **SSL** | Cloudflare Origin Certificate on nginx (`*.version2.hr`) |

## Per-App Deployment

Each app has its own directory with a `docker-compose.yaml` template and `README.md`:

| App | Directory | Hostinger Project | Status |
|-----|-----------|-------------------|--------|
| [Database](./db/) | `deploy/apps/db/` | `v2-db` | Template ready |
| [app.version2.hr](./app/) | `deploy/apps/app/` | `v2-app` | Awaiting repo + DB |
| [web.version2.hr](./web/) | `deploy/apps/web/` | `v2-web` | Awaiting redesign |
| [offer.version2.hr](./offer/) | `deploy/apps/offer/` | `v2-offer` | Awaiting repo + DB |
| [qr.version2.hr](./qr/) | `deploy/apps/qr/` | `v2-qr` | New build — not started |

## How Nginx Handles Missing Backends

The nginx configs use Docker's embedded DNS resolver (`127.0.0.11`) with variable-based `proxy_pass`. This means:

1. Nginx starts even if no backends are running (no hard dependency)
2. When a backend container is unreachable, nginx returns a branded maintenance page
3. When a backend comes online, nginx automatically routes to it (DNS re-resolves every 30s)

## Important Rules

- **v2-main must be deployed first** — it creates the shared network
- **Never delete Docker volumes** — they contain production data
- **Each app deploys independently** — no need to rebuild v2-main when updating an app
- **Container names are fixed** — they serve as DNS hostnames on v2-net
