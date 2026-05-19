import express from "express";
import db from "../configs/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { user_id, pg_id } = req.body;
  const sql = "INSERT INTO bookings (user_id, pg_id, booking_date) VALUES (?, ?, CURDATE())";
  db.query(sql, [user_id, pg_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Booking successful!" });
  });
});

router.get("/", (req, res) => {
  // Empty array for security as per README
  res.json([]);
});

// Get user's bookings
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT b.id, u.name AS user_name, p.name AS pg_name, p.location, b.booking_date, p.price, p.image, o.name AS owner_name, o.phone AS owner_phone
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN pgs p ON b.pg_id = p.id
    JOIN owners o ON p.owner_id = o.id
    WHERE b.user_id = ?
    ORDER BY b.booking_date DESC
  `;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("❌ Fetch user bookings error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json(result);
  });
});

// Get owner's bookings
router.get("/owner/:ownerId", (req, res) => {
  const { ownerId } = req.params;
  const sql = `
    SELECT b.id, u.name AS user_name, u.email AS user_email, u.phone AS user_phone, 
           p.name AS pg_name, p.location, b.booking_date
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN pgs p ON b.pg_id = p.id
    WHERE p.owner_id = ?
    ORDER BY b.booking_date DESC
  `;
  db.query(sql, [ownerId], (err, result) => {
    if (err) {
      console.error("❌ Fetch owner bookings error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json(result);
  });
});

// Get bookings for a specific PG
router.get("/pg/:pgId", (req, res) => {
  const { pgId } = req.params;
  const sql = `
    SELECT b.id, u.name AS user_name, u.email AS user_email, u.phone AS user_phone, 
           p.name AS pg_name, p.location, b.booking_date
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN pgs p ON b.pg_id = p.id
    WHERE b.pg_id = ?
    ORDER BY b.booking_date DESC
  `;
  db.query(sql, [pgId], (err, result) => {
    if (err) {
      console.error("❌ Fetch PG bookings error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json(result);
  });
});

export default router;
