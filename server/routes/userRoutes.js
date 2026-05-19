import express from "express";
import db from "../configs/db.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hash, phone], (err) => {
      if (err) {
        console.error("❌ User insert error:", err);
        return res.status(500).json({ error: err });
      }
      res.json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error("❌ User login error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        message: "Login successful!", 
        user: userWithoutPassword 
      });
    });
  } catch (error) {
    console.error("❌ User login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT id, name, email, phone FROM users", (err, result) => {
    if (err) {
      console.error("❌ Fetch users error:", err);
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
});

export default router;
