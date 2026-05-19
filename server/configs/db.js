import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "findmypg",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");

    const checkColumnSql = `
      SELECT COLUMN_NAME
      FROM information_schema.columns
      WHERE table_schema = DATABASE()
        AND table_name = 'pgs'
        AND column_name = 'image'
    `;

    db.query(checkColumnSql, (checkErr, results) => {
      if (checkErr) {
        console.error("❌ Failed to check pgs table columns:", checkErr);
        return;
      }

      if (results.length === 0) {
        db.query("ALTER TABLE pgs ADD COLUMN image MEDIUMTEXT", (alterErr) => {
          if (alterErr) {
            console.error("❌ Failed to add pgs.image column:", alterErr);
          } else {
            console.log("✅ Added pgs.image column.");
          }
        });
      } else {
        console.log("✅ pgs.image column already exists.");
      }
    });
  }
});

export default db;
