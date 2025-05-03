import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import aiRoutes from "./routes/aiRoutes.js";
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("PrincessCare backend is running");
});

const PORT = process.env.PORT || 2020;

try {
  app.listen(PORT, () => console.log(`server running on ${PORT}`));
} catch (error) {
  console.error("Error starting the server", error);
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  // Optionally, perform cleanup or exit the process gracefully
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
  // Optionally, perform cleanup or exit the process gracefully
  process.exit(1);
});
