import fs from "fs";
import path from "path";
import pool from "./db.js";

async function runMigrations() {
  const migrationDir = path.resolve("src/migrations");

  try {
    // 1. Read all files in the folder
    let migrationFiles = fs
      .readdirSync(migrationDir)
      .filter(f => f.endsWith(".sql"))      // only .sql files
      .sort();                              // ensures 001, 002, 003 order

    console.log("Found migrations:", migrationFiles);

    // 2. Run each migration
    for (const file of migrationFiles) {
      const filePath = path.join(migrationDir, file);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log(`➡️ Running migration: ${file}`);
      await pool.query(sql);
    }

    console.log("✅ All migrations executed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();

