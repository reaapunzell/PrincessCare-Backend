import express from "express";
import cors from "cors";
import "dotenv/config";
import { supabase } from "./db.js";

// Create an Express app
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import aiRoutes from "./routes/aiRoutes.js";
app.use("/api/ai", aiRoutes);

import router from "./controllers/users.js";
app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("PrincessCare backend is running");
});

// Define a port
const PORT = process.env.PORT || 2020;

// Start the server
app.listen(PORT, () => {
  console.log(`[server]: is running on http://localhost:${PORT}`);
});
