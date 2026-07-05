#!/usr/bin/env bash
# Builds the production bundle for Hostinger shared hosting.
# Output: deploy/hostinger-site.zip  (extract into public_html)
#         deploy/migration.sql      (import once via phpMyAdmin)
set -euo pipefail
cd "$(dirname "$0")/.."

# Read MySQL settings from .env for config.php
env_get() { grep -E "^$1=" .env 2>/dev/null | head -1 | cut -d= -f2- ; }
DB_NAME="$(env_get MYSQL_DATABASE)"
DB_USER="$(env_get MYSQL_USER)"
DB_PASS="$(env_get MYSQL_PASSWORD)"
JWT_SECRET="$(env_get JWT_SECRET)"
[ -z "$JWT_SECRET" ] && JWT_SECRET="$(node -e 'console.log(require("crypto").randomBytes(48).toString("hex"))')"

echo "==> Building frontend..."
node node_modules/vite/bin/vite.js build

echo "==> Regenerating migration.sql from current local content..."
node server/export-mysql.js > server/migration.sql

echo "==> Assembling deploy/ ..."
rm -rf deploy
mkdir -p deploy/site/api deploy/site/uploads

cp -r dist/* deploy/site/
cp hosting/root.htaccess deploy/site/.htaccess
cp hosting/api/index.php deploy/site/api/
cp hosting/api/.htaccess deploy/site/api/
cp server/uploads/* deploy/site/uploads/ 2>/dev/null || true
cp server/migration.sql deploy/migration.sql

cat > deploy/site/api/config.php <<EOF
<?php
const DB_HOST = 'localhost';
const DB_NAME = '$DB_NAME';
const DB_USER = '$DB_USER';
const DB_PASS = '$DB_PASS';
const JWT_SECRET = '$JWT_SECRET';
EOF

( cd deploy/site && zip -qr ../hostinger-site.zip . )
rm -rf deploy/site

echo
echo "Done:"
echo "  deploy/hostinger-site.zip  -> upload & extract into public_html (hPanel File Manager or SSH)"
echo "  deploy/migration.sql       -> import once via phpMyAdmin into $DB_NAME"
