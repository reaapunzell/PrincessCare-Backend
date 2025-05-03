import dotenv from "dotenv";

dotenv.config();

console.log("PORT:", process.env.PORT);
console.log("AZURE_AI_URL:", process.env.AZURE_AI_URL);
console.log("AZURE_AI_KEY:", process.env.AZURE_AI_KEY);
