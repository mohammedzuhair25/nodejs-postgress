import fs from "fs";
import pool from "./db.js";

async function runMigrations() {
  try {
    const migrationFiles = [
      "./src/migrations/001_create_users_table.sql"
      // Add more SQL migration files here if needed
    ];

    for (const file of migrationFiles) {
      const sql = fs.readFileSync(file, "utf-8");
      console.log(`Running migration: ${file}`);
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
