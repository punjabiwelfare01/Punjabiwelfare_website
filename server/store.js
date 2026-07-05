// Data-access layer. DB_DRIVER=sqlite (default, local file) or mysql
// (e.g. a Hostinger MySQL database configured via MYSQL_* env vars).
// All functions are async so both drivers share one interface.

const DRIVER = (process.env.DB_DRIVER || "sqlite").toLowerCase();

const parse = (data) => (typeof data === "string" ? JSON.parse(data) : data);

/* ---------------------------------- SQLite --------------------------------- */

async function createSqliteStore() {
  const { default: db } = await import("./db.js");
  return {
    driver: "sqlite",
    async init() {},

    async countAdmins() {
      return db.prepare("SELECT COUNT(*) AS c FROM admins").get().c;
    },
    async getAdminByEmail(email) {
      return db.prepare("SELECT * FROM admins WHERE email = ?").get(email);
    },
    async getAdminById(id) {
      return db.prepare("SELECT * FROM admins WHERE id = ?").get(id);
    },
    async createAdmin(email, passwordHash) {
      db.prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(email, passwordHash);
    },
    async updateAdminPassword(id, passwordHash) {
      db.prepare("UPDATE admins SET password_hash = ? WHERE id = ?").run(passwordHash, id);
    },

    async countSection(section) {
      return db.prepare("SELECT COUNT(*) AS c FROM collection_items WHERE section = ?").get(section).c;
    },
    async listSection(section) {
      return db
        .prepare("SELECT id, data FROM collection_items WHERE section = ? ORDER BY sort_order, id")
        .all(section)
        .map((row) => ({ id: row.id, ...parse(row.data) }));
    },
    async insertItem(section, data) {
      const max = db.prepare("SELECT COALESCE(MAX(sort_order), -1) AS m FROM collection_items WHERE section = ?").get(section).m;
      const info = db
        .prepare("INSERT INTO collection_items (section, data, sort_order) VALUES (?, ?, ?)")
        .run(section, JSON.stringify(data), max + 1);
      return Number(info.lastInsertRowid);
    },
    async updateItem(section, id, data) {
      const info = db
        .prepare("UPDATE collection_items SET data = ?, updated_at = datetime('now') WHERE id = ? AND section = ?")
        .run(JSON.stringify(data), id, section);
      return info.changes > 0;
    },
    async deleteItem(section, id) {
      return db.prepare("DELETE FROM collection_items WHERE id = ? AND section = ?").run(id, section).changes > 0;
    },
    async reorderSection(section, ids) {
      const update = db.prepare("UPDATE collection_items SET sort_order = ? WHERE id = ? AND section = ?");
      db.transaction(() => {
        ids.forEach((id, i) => update.run(i, id, section));
      })();
    },
    async seedSection(section, items) {
      const insert = db.prepare("INSERT INTO collection_items (section, data, sort_order) VALUES (?, ?, ?)");
      db.transaction(() => {
        items.forEach((item, i) => insert.run(section, JSON.stringify(item), i));
      })();
    },

    async getAllSettings() {
      const out = {};
      for (const row of db.prepare("SELECT key, data FROM settings").all()) out[row.key] = parse(row.data);
      return out;
    },
    async getSetting(key) {
      const row = db.prepare("SELECT data FROM settings WHERE key = ?").get(key);
      return row ? parse(row.data) : null;
    },
    async putSetting(key, data) {
      db.prepare(
        "INSERT INTO settings (key, data) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = datetime('now')"
      ).run(key, JSON.stringify(data));
    },
    async putSettingIfAbsent(key, data) {
      db.prepare("INSERT OR IGNORE INTO settings (key, data) VALUES (?, ?)").run(key, JSON.stringify(data));
    },

    async insertFeedback({ name, rating, category, message }) {
      const info = db
        .prepare("INSERT INTO feedback (name, rating, category, message) VALUES (?, ?, ?, ?)")
        .run(name, rating, category, message);
      return Number(info.lastInsertRowid);
    },
    async listFeedback() {
      return db.prepare("SELECT * FROM feedback ORDER BY id DESC").all();
    },
    async deleteFeedback(id) {
      return db.prepare("DELETE FROM feedback WHERE id = ?").run(id).changes > 0;
    },
  };
}

/* ---------------------------------- MySQL ---------------------------------- */

async function createMysqlStore() {
  const { default: mysql } = await import("mysql2/promise");
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    charset: "utf8mb4",
  });

  return {
    driver: "mysql",
    async init() {
      await pool.query(`CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await pool.query(`CREATE TABLE IF NOT EXISTS collection_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(64) NOT NULL,
        data JSON NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_section (section)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await pool.query(`CREATE TABLE IF NOT EXISTS settings (
        \`key\` VARCHAR(64) PRIMARY KEY,
        data JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await pool.query(`CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        rating INT NULL,
        category VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    },

    async countAdmins() {
      const [rows] = await pool.query("SELECT COUNT(*) AS c FROM admins");
      return rows[0].c;
    },
    async getAdminByEmail(email) {
      const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
      return rows[0];
    },
    async getAdminById(id) {
      const [rows] = await pool.query("SELECT * FROM admins WHERE id = ?", [id]);
      return rows[0];
    },
    async createAdmin(email, passwordHash) {
      await pool.query("INSERT INTO admins (email, password_hash) VALUES (?, ?)", [email, passwordHash]);
    },
    async updateAdminPassword(id, passwordHash) {
      await pool.query("UPDATE admins SET password_hash = ? WHERE id = ?", [passwordHash, id]);
    },

    async countSection(section) {
      const [rows] = await pool.query("SELECT COUNT(*) AS c FROM collection_items WHERE section = ?", [section]);
      return rows[0].c;
    },
    async listSection(section) {
      const [rows] = await pool.query(
        "SELECT id, data FROM collection_items WHERE section = ? ORDER BY sort_order, id",
        [section]
      );
      return rows.map((row) => ({ id: row.id, ...parse(row.data) }));
    },
    async insertItem(section, data) {
      const [max] = await pool.query(
        "SELECT COALESCE(MAX(sort_order), -1) AS m FROM collection_items WHERE section = ?",
        [section]
      );
      const [info] = await pool.query(
        "INSERT INTO collection_items (section, data, sort_order) VALUES (?, ?, ?)",
        [section, JSON.stringify(data), max[0].m + 1]
      );
      return info.insertId;
    },
    async updateItem(section, id, data) {
      const [info] = await pool.query(
        "UPDATE collection_items SET data = ? WHERE id = ? AND section = ?",
        [JSON.stringify(data), id, section]
      );
      return info.affectedRows > 0;
    },
    async deleteItem(section, id) {
      const [info] = await pool.query("DELETE FROM collection_items WHERE id = ? AND section = ?", [id, section]);
      return info.affectedRows > 0;
    },
    async reorderSection(section, ids) {
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        for (let i = 0; i < ids.length; i++) {
          await conn.query("UPDATE collection_items SET sort_order = ? WHERE id = ? AND section = ?", [i, ids[i], section]);
        }
        await conn.commit();
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    },
    async seedSection(section, items) {
      for (let i = 0; i < items.length; i++) {
        await pool.query("INSERT INTO collection_items (section, data, sort_order) VALUES (?, ?, ?)", [
          section,
          JSON.stringify(items[i]),
          i,
        ]);
      }
    },

    async getAllSettings() {
      const [rows] = await pool.query("SELECT `key`, data FROM settings");
      const out = {};
      for (const row of rows) out[row.key] = parse(row.data);
      return out;
    },
    async getSetting(key) {
      const [rows] = await pool.query("SELECT data FROM settings WHERE `key` = ?", [key]);
      return rows[0] ? parse(rows[0].data) : null;
    },
    async putSetting(key, data) {
      await pool.query(
        "INSERT INTO settings (`key`, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
        [key, JSON.stringify(data)]
      );
    },
    async putSettingIfAbsent(key, data) {
      await pool.query("INSERT IGNORE INTO settings (`key`, data) VALUES (?, ?)", [key, JSON.stringify(data)]);
    },

    async insertFeedback({ name, rating, category, message }) {
      const [info] = await pool.query(
        "INSERT INTO feedback (name, rating, category, message) VALUES (?, ?, ?, ?)",
        [name, rating, category, message]
      );
      return info.insertId;
    },
    async listFeedback() {
      const [rows] = await pool.query("SELECT * FROM feedback ORDER BY id DESC");
      return rows;
    },
    async deleteFeedback(id) {
      const [info] = await pool.query("DELETE FROM feedback WHERE id = ?", [id]);
      return info.affectedRows > 0;
    },
  };
}

const store = DRIVER === "mysql" ? await createMysqlStore() : await createSqliteStore();
export default store;
