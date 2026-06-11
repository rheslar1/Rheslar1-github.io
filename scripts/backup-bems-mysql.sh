#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${BEMS_COMPOSE_FILE:-$ROOT_DIR/BMS/BEMS_ENTERPRISE_COMPLETE/repo/docker/docker-compose.yml}"
DB_SERVICE="${BEMS_DB_SERVICE:-db}"
DB_NAME="${BEMS_DB_NAME:-bems}"
DB_USER="${BEMS_DB_USER:-root}"
DB_PASSWORD="${BEMS_DB_PASSWORD:-root}"
DB_HOST="${BEMS_DB_HOST:-127.0.0.1}"
DB_PORT="${BEMS_DB_PORT:-3306}"
BACKUP_DIR="${BEMS_BACKUP_DIR:-$ROOT_DIR/backups/mysql}"
RETENTION_DAYS="${BEMS_BACKUP_RETENTION_DAYS:-14}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUTPUT_SQL="$BACKUP_DIR/${DB_NAME}-${TIMESTAMP}.sql"
OUTPUT_GZ="$OUTPUT_SQL.gz"

mkdir -p "$BACKUP_DIR"

if command -v docker >/dev/null 2>&1 && [ -f "$COMPOSE_FILE" ]; then
  docker compose -f "$COMPOSE_FILE" exec -T "$DB_SERVICE" \
    sh -c "mysqldump --single-transaction --routines --triggers --events -u\"$DB_USER\" -p\"$DB_PASSWORD\" \"$DB_NAME\"" \
    > "$OUTPUT_SQL"
else
  MYSQL_PWD="$DB_PASSWORD" mysqldump \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    -h "$DB_HOST" \
    -P "$DB_PORT" \
    -u "$DB_USER" \
    "$DB_NAME" \
    > "$OUTPUT_SQL"
fi

gzip -f "$OUTPUT_SQL"
sha256sum "$OUTPUT_GZ" > "$OUTPUT_GZ.sha256"

find "$BACKUP_DIR" -name "${DB_NAME}-*.sql.gz" -type f -mtime "+$RETENTION_DAYS" -delete
find "$BACKUP_DIR" -name "${DB_NAME}-*.sql.gz.sha256" -type f -mtime "+$RETENTION_DAYS" -delete

echo "Created MySQL backup: $OUTPUT_GZ"
echo "Checksum: $OUTPUT_GZ.sha256"
