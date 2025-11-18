import { InlineKeyboard } from "grammy";

export const modelMenu = new InlineKeyboard()
  .text("GPT-4o-mini", "openai/gpt-4o-mini")
  .text("Gemini 2.0 Flash", "google/gemini-2.0-flash-001")
  .row()
  .text("OpenAI: GPT-5 Nano", "openai/gpt-5-nano");
