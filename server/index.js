import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {

  console.log(`${req.method} => ${req.url} (${req.body && Object.keys(req.body).length > 0 ? 'Has Body' : 'No Body'})`);
  next();

})

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to NestHub API",
    status: "OK",
    timestamp: new Date().toLocaleString(),
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/bookings", bookingRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));