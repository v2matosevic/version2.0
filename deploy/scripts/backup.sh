#!/bin/bash
set -euo pipefail

# ============================================================
# Version2.hr — Automated Backup Script
# Run daily via cron: 0 3 * * * /opt/version2/deploy/scripts/backup.sh
# ============================================================

DEPLOY_DIR="/opt/version2"
BACKUP_DIR="${DEPLOY_DIR}/data/backups"
TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)
MAX_BACKUPS=7

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

mkdir -p "${BACKUP_DIR}"

# ── MySQL dump ──
log "Backing up MySQL databases..."
docker exec v2-mysql mysqldump -u root -p"${MYSQL_ROOT_PASSWORD}" --all-databases --single-transaction \
  > "${BACKUP_DIR}/mysql-${TIMESTAMP}.sql" 2>/dev/null

if [ -s "${BACKUP_DIR}/mysql-${TIMESTAMP}.sql" ]; then
  gzip "${BACKUP_DIR}/mysql-${TIMESTAMP}.sql"
  log "MySQL backup: mysql-${TIMESTAMP}.sql.gz"
else
  rm -f "${BACKUP_DIR}/mysql-${TIMESTAMP}.sql"
  log "WARNING: MySQL backup failed or empty"
fi

# ── SQLite copy ──
log "Backing up SQLite database..."
SQLITE_SRC="${DEPLOY_DIR}/data/nextjs/version2.db"
if [ -f "${SQLITE_SRC}" ]; then
  # Use SQLite backup mode for consistency
  docker exec v2-nextjs sh -c "sqlite3 /app/data/version2.db '.backup /tmp/v2-backup.db'" 2>/dev/null \
    && docker cp v2-nextjs:/tmp/v2-backup.db "${BACKUP_DIR}/sqlite-${TIMESTAMP}.db" \
    && gzip "${BACKUP_DIR}/sqlite-${TIMESTAMP}.db" \
    && log "SQLite backup: sqlite-${TIMESTAMP}.db.gz" \
    || log "WARNING: SQLite backup failed"
fi

# ── Prune old backups ──
log "Pruning old backups (keeping last ${MAX_BACKUPS})..."
for prefix in mysql sqlite; do
  ls -t "${BACKUP_DIR}/${prefix}-"*.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm -f
done

log "Backup complete."
