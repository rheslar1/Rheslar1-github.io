#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 path/to/bems-YYYYmmddTHHMMSSZ.sql.gz" >&2
  exit 64
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${BEMS_COMPOSE_FILE:-$ROOT_DIR/BMS/BEMS_ENTERPRISE_COMPLETE/repo/docker/docker-compose.yml}"
DB_SERVICE="${BEMS_DB_SERVICE:-db}"
DB_NAME="${BEMS_DB_NAME:-bems}"
DB_USER="${BEMS_DB_USER:-root}"
DB_PASSWORD="${BEMS_DB_PASSWORD:-root}"
DB_HOST="${BEMS_DB_HOST:-127.0.0.1}"
DB_PORT="${BEMS_DB_PORT:-3306}"
BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Backup file not found: $BACKUP_FILE" >&2
  exit 66
fi

if [ -f "$BACKUP_FILE.sha256" ]; then
  sha256sum -c "$BACKUP_FILE.sha256"
fi

if command -v docker >/dev/null 2>&1 && [ -f "$COMPOSE_FILE" ]; then
  gzip -dc "$BACKUP_FILE" | docker compose -f "$COMPOSE_FILE" exec -T "$DB_SERVICE" \
    sh -c "mysql -u\"$DB_USER\" -p\"$DB_PASSWORD\" \"$DB_NAME\""
else
  gzip -dc "$BACKUP_FILE" | MYSQL_PWD="$DB_PASSWORD" mysql \
    -h "$DB_HOST" \
    -P "$DB_PORT" \
    -u "$DB_USER" \
    "$DB_NAME"
fi

echo "Restored MySQL backup into database: $DB_NAME"
