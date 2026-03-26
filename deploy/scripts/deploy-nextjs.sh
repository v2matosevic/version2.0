#!/bin/bash
set -euo pipefail

# ============================================================
# Version2.hr — Next.js Deployment Script
# Pulls latest code, rebuilds the Docker image, restarts
# ============================================================

DEPLOY_DIR="/opt/version2"
APP_DIR="${DEPLOY_DIR}/nextjs"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

cd "${DEPLOY_DIR}"

# ── Pull latest code ──
log "Pulling latest code..."
cd "${APP_DIR}"
git pull origin main
cd "${DEPLOY_DIR}"

# ── Rebuild and restart ──
log "Rebuilding Next.js container..."
docker compose -f deploy/docker-compose.yml build --no-cache nextjs
docker compose -f deploy/docker-compose.yml up -d nextjs

# ── Health check ──
log "Waiting for health check..."
sleep 10

RETRIES=5
for i in $(seq 1 $RETRIES); do
  STATUS=$(docker inspect --format='{{.State.Health.Status}}' v2-nextjs 2>/dev/null || echo "unknown")
  if [ "$STATUS" = "healthy" ]; then
    log "Next.js container is healthy."
    exit 0
  fi
  log "Health check attempt ${i}/${RETRIES}: ${STATUS}"
  sleep 5
done

log "WARNING: Container not healthy after ${RETRIES} attempts. Check logs:"
docker logs --tail 20 v2-nextjs
