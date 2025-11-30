import fs from "fs";
import path from "path";
import pool from "./db.js";

async function runSeeds() {
  const seedDir = path.resolve("src/seeds");

  try {
    let seedFiles = fs
      .readdirSync(seedDir)
      .filter(f => f.endsWith(".sql"))
      .sort(); // 001, 002, ...

    console.log("Found seeds:", seedFiles);

    for (const file of seedFiles) {
      const filePath = path.join(seedDir, file);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log(`🌱 Seeding: ${file}`);
      await pool.query(sql);
    }

    console.log("✅ Seeding completed!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeeds();
