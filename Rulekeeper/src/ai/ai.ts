import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const client = new OpenAI({
  baseURL: process.env.AI_BASE_URL as string,
  apiKey: process.env.AI_KEY as string,
});
