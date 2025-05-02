import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { cycleData } = req.body;

  try {
    const response = await axios.post(process.env.AZURE_AI_URL, {
      prompt: `Suggest menstrual products for cycle: ${JSON.stringify(
        cycleData
      )}`,
      headers: { Authorization: `Bearer ${process.env.AZURE_AI_KEY}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "AI recommendation failed" });
  }
});

export default router;
