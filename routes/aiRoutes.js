import express from "express";
import axios from "axios";
import { AzureOpenAI } from "openai";
import "dotenv/config";

const router = express.Router();

const endpoint = process.env.AZURE_AI_URL;
const apiKey = process.env.AZURE_AI_KEY;
const model = process.env.AZURE_MODEL;
const apiVersion = process.env.AZURE_API_VERSION || "2024-02-15-preview"; // Ensure API version is set

// Initialize Azure OpenAI Client
const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, model });

router.post("/recommend", async (req, res) => {
  const { cycleData } = req.body;

  try {
    const result = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant recommending menstrual products. Only give them names of 3 products and one or two sentences why you suggest that product",
        },
        {
          role: "user",
          content: `Suggest menstrual products for cycle: ${JSON.stringify(
            cycleData
          )}`,
        },
      ],
      max_tokens: 200,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json(result);
  } catch (error) {
    console.error("Azure OpenAI Error:", error);
    res
      .status(500)
      .json({ error: "AI recommendation failed", details: error.message });
  }
});

router.post("/cycletracking", async (req, res) => {
  const { cycleData } = req.body;

  try {
    const result = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that predicts menstrual cycles .Only return the predicted next period start date as YYYY-MM-DD.",
        },
        {
          role: "user",
          content: `Predict the next cycle based on: ${JSON.stringify(
            cycleData
          )}`,
        },
      ],
      max_tokens: 200,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json(result);
  } catch (error) {
    console.error("Azure OpenAI Error:", error);
    res
      .status(500)
      .json({ error: "AI cycle tracking failed", details: error.message });
  }
});

export default router;
