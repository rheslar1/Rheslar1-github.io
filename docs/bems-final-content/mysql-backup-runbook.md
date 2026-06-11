# MySQL Backup Runbook

This runbook adds a repeatable backup path for the BEMS dashboard MySQL database.

## Files

- `scripts/backup-bems-mysql.sh`
- `scripts/restore-bems-mysql.sh`
- Backup output directory: `backups/mysql/`

The backup directory is intentionally ignored by Git.

## Default Database Settings

| Setting | Default |
| --- | --- |
| Compose file | `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docker/docker-compose.yml` |
| Docker service | `db` |
| Database | `bems` |
| User | `root` |
| Password | `root` |
| Host fallback | `127.0.0.1` |
| Port fallback | `3306` |
| Retention | `14 days` |

## Create A Backup

From the portfolio repository root:

```bash
./scripts/backup-bems-mysql.sh
```

The script first tries Docker Compose using the BMS stack's `db` service. If the compose file is not present, it falls back to a host/port `mysqldump`.

Example output:

```text
backups/mysql/bems-20260611T201500Z.sql.gz
backups/mysql/bems-20260611T201500Z.sql.gz.sha256
```

## Restore A Backup

```bash
./scripts/restore-bems-mysql.sh backups/mysql/bems-20260611T201500Z.sql.gz
```

If a `.sha256` file exists next to the backup, the restore script verifies it before importing.

## Environment Overrides

```bash
BEMS_DB_PASSWORD='replace-me' \
BEMS_BACKUP_DIR=/mnt/backups/bems \
BEMS_BACKUP_RETENTION_DAYS=30 \
./scripts/backup-bems-mysql.sh
```

Supported variables:

- `BEMS_COMPOSE_FILE`
- `BEMS_DB_SERVICE`
- `BEMS_DB_NAME`
- `BEMS_DB_USER`
- `BEMS_DB_PASSWORD`
- `BEMS_DB_HOST`
- `BEMS_DB_PORT`
- `BEMS_BACKUP_DIR`
- `BEMS_BACKUP_RETENTION_DAYS`

## Cron Example

```cron
15 2 * * * cd /home/admin/Documents/Rheslar1-github.io && BEMS_BACKUP_DIR=/var/backups/bems ./scripts/backup-bems-mysql.sh >> /var/log/bems-mysql-backup.log 2>&1
```

## Verification Checklist

- Backup file exists and is non-empty.
- `.sha256` verification passes.
- Latest backup can be restored into a disposable database.
- Retention deletes older backups after the configured window.
