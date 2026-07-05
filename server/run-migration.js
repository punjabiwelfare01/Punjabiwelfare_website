// Imports server/migration.sql into the MySQL database configured in .env.
// Usage: node server/run-migration.js
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlFile = path.join(__dirname, "migration.sql");

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_DATABASE) {
  console.error("Missing MySQL settings. Fill MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE in .env");
  console.error("MYSQL_HOST is shown in hPanel -> Databases -> Remote MySQL (e.g. srv1234.hstgr.io).");
  process.exit(1);
}
if (!fs.existsSync(sqlFile)) {
  console.error("server/migration.sql not found. Generate it first: node server/export-mysql.js > server/migration.sql");
  process.exit(1);
}

console.log(`Connecting to ${MYSQL_HOST}:${MYSQL_PORT || 3306} as ${MYSQL_USER} (db: ${MYSQL_DATABASE})...`);
let conn;
try {
  conn = await mysql.createConnection({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT || 3306),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    multipleStatements: true,
    connectTimeout: 15000,
    charset: "utf8mb4",
  });
} catch (err) {
  console.error(`\nCould not connect: ${err.message}`);
  if (err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
    console.error("\nLikely causes:");
    console.error("  1. Remote MySQL is not enabled — in hPanel go to Databases -> Remote MySQL,");
    console.error("     select the database and add 'Any host' (or your IP) to the allowed list.");
    console.error("  2. MYSQL_HOST is wrong — use the hostname shown on that same Remote MySQL page.");
  }
  process.exit(1);
}

const sql = fs.readFileSync(sqlFile, "utf8");
await conn.query(sql);

const [[items]] = await conn.query("SELECT COUNT(*) AS c FROM collection_items");
const [[settings]] = await conn.query("SELECT COUNT(*) AS c FROM settings");
const [[admins]] = await conn.query("SELECT COUNT(*) AS c FROM admins");
console.log("Migration complete:");
console.log(`  collection_items: ${items.c}`);
console.log(`  settings:         ${settings.c}`);
console.log(`  admins:           ${admins.c}`);
console.log("\nTo make the server use this database, set DB_DRIVER=mysql in .env and restart it.");
await conn.end();
