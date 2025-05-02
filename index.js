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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
