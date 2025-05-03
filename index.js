import express from "express";
import cors from "cors";
import "dotenv/config";

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors());

import aiRoutes from "./routes/aiRoutes.js";
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("PrincessCare backend is running");
});

// Define a port
const PORT = process.env.PORT || 2020;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
