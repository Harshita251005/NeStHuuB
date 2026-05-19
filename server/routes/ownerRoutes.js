import express from "express";
import db from "../configs/db.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Owner registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO owners (name, email, password, phone) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hash, phone], (err) => {
      if (err) {
        console.error("❌ Owner registration error:", err);
        return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
      }
      res.json({ message: "Owner registered successfully!" });
    });
  } catch (error) {
    console.error("❌ Owner registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Owner login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM owners WHERE email = ?";
    
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error("❌ Owner login error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      const owner = result[0];
      const isMatch = await bcrypt.compare(password, owner.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      // Remove password from response
      const { password: _, ...ownerWithoutPassword } = owner;
      res.json({ 
        message: "Login successful!", 
        owner: ownerWithoutPassword 
      });
    });
  } catch (error) {
    console.error("❌ Owner login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add PG
router.post("/pg", (req, res) => {
  const { owner_id, name, location, price, description, image } = req.body;
  const sql =
    "INSERT INTO pgs (owner_id, name, location, price, description, image) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [owner_id, name, location, price, description, image || null], (err) => {
    if (err) {
      console.error("❌ Add PG error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json({ message: "PG added successfully!" });
  });
});

// View all PGs
router.get("/pgs", (req, res) => {
  const sql = `
    SELECT p.*, o.name as owner_name, o.phone as owner_phone 
    FROM pgs p 
    JOIN owners o ON p.owner_id = o.id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Fetch PGs error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json(result);
  });
});

// Get PGs by owner ID
router.get("/:ownerId/pgs", (req, res) => {
  const { ownerId } = req.params;
  const sql = "SELECT * FROM pgs WHERE owner_id = ?";
  db.query(sql, [ownerId], (err, result) => {
    if (err) {
      console.error("❌ Fetch owner PGs error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json(result);
  });
});

// Update PG
router.put("/pg/:pgId", (req, res) => {
  try {
    const { pgId } = req.params;
    const { owner_id, name, location, price, description, image } = req.body;
    
    if (!owner_id) {
      return res.status(403).json({ error: "Owner ID is required for authorization" });
    }
    
    let sql;
    let params;
    
    if (image !== undefined) {
      sql = "UPDATE pgs SET name = ?, location = ?, price = ?, description = ?, image = ? WHERE id = ? AND owner_id = ?";
      params = [name, location, price, description, image, pgId, owner_id];
    } else {
      sql = "UPDATE pgs SET name = ?, location = ?, price = ?, description = ? WHERE id = ? AND owner_id = ?";
      params = [name, location, price, description, pgId, owner_id];
    }
    
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("❌ Update PG error:", err);
        return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
      }
      
      if (result.affectedRows === 0) {
        return res.status(403).json({ error: "PG not found or you are not authorized to update it" });
      }
      
      res.json({ message: "PG updated successfully!" });
    });
  } catch (error) {
    console.error("❌ Update PG error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete PG
router.delete("/pg/:pgId", (req, res) => {
  try {
    const { pgId } = req.params;
    const { owner_id } = req.body;
    
    if (!owner_id) {
      return res.status(403).json({ error: "Owner ID is required for authorization" });
    }
    
    const sql = "DELETE FROM pgs WHERE id = ? AND owner_id = ?";
    
    db.query(sql, [pgId, owner_id], (err, result) => {
      if (err) {
        console.error("❌ Delete PG error:", err);
        return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
      }
      
      if (result.affectedRows === 0) {
        return res.status(403).json({ error: "PG not found or you are not authorized to delete it" });
      }
      
      res.json({ message: "PG deleted successfully!" });
    });
  } catch (error) {
    console.error("❌ Delete PG error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all owners
router.get("/", (req, res) => {
  db.query("SELECT id, name, email, phone FROM owners", (err, result) => {
    if (err) {
      console.error("❌ Fetch owners error:", err);
      return res.status(500).json({ error: err.sqlMessage || "Internal server error" });
    }
    res.json(result);
  });
});

export default router;
