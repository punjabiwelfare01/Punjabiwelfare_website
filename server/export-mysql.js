// Exports the current SQLite database (content, settings, admin, feedback)
// as a MySQL-compatible SQL script: node server/export-mysql.js > migration.sql
import db from "./db.js";
import { seedIfEmpty } from "./seed.js";

seedIfEmpty();

const esc = (v) => {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/\\/g, "\\\\").replace(/'/g, "''").replace(/\n/g, "\\n").replace(/\r/g, "")}'`;
};

const lines = [];
lines.push("-- Punjabi Welfare Trust — content migration (generated from SQLite)");
lines.push("SET NAMES utf8mb4;");
lines.push("");
lines.push(`CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
lines.push(`CREATE TABLE IF NOT EXISTS collection_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section VARCHAR(64) NOT NULL,
  data JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_section (section)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
lines.push(`CREATE TABLE IF NOT EXISTS settings (
  \`key\` VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
lines.push(`CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  rating INT NULL,
  category VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
lines.push("");

for (const row of db.prepare("SELECT * FROM admins").all()) {
  lines.push(`INSERT INTO admins (id, email, password_hash) VALUES (${row.id}, ${esc(row.email)}, ${esc(row.password_hash)}) ON DUPLICATE KEY UPDATE email = email;`);
}
for (const row of db.prepare("SELECT * FROM collection_items ORDER BY section, sort_order, id").all()) {
  lines.push(`INSERT INTO collection_items (id, section, data, sort_order) VALUES (${row.id}, ${esc(row.section)}, ${esc(row.data)}, ${row.sort_order}) ON DUPLICATE KEY UPDATE data = VALUES(data), sort_order = VALUES(sort_order);`);
}
for (const row of db.prepare("SELECT * FROM settings").all()) {
  lines.push(`INSERT INTO settings (\`key\`, data) VALUES (${esc(row.key)}, ${esc(row.data)}) ON DUPLICATE KEY UPDATE data = VALUES(data);`);
}
for (const row of db.prepare("SELECT * FROM feedback").all()) {
  lines.push(`INSERT INTO feedback (id, name, rating, category, message, created_at) VALUES (${row.id}, ${esc(row.name)}, ${row.rating ?? "NULL"}, ${esc(row.category)}, ${esc(row.message)}, ${esc(row.created_at)}) ON DUPLICATE KEY UPDATE message = VALUES(message);`);
}

console.log(lines.join("\n"));
