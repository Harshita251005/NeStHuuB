import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "findmypg",
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");

    // 1. Auto-initialize tables if they don't exist
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(15)
      );`,
      `CREATE TABLE IF NOT EXISTS owners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(15)
      );`,
      `CREATE TABLE IF NOT EXISTS pgs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        owner_id INT,
        name VARCHAR(150),
        location VARCHAR(150),
        price DECIMAL(10,2),
        description TEXT,
        image MEDIUMTEXT,
        FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
      );`,
      `CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        pg_id INT,
        booking_date DATE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
      );`
    ];

    const runQueriesSequentially = (index) => {
      if (index >= queries.length) {
        console.log("✅ Database schema initialized successfully.");
        return;
      }
      db.query(queries[index], (queryErr) => {
        if (queryErr) {
          console.error(`❌ Failed to run query ${index}:`, queryErr);
        } else {
          runQueriesSequentially(index + 1);
        }
      });
    };

    runQueriesSequentially(0);
  }
});

export default db;
