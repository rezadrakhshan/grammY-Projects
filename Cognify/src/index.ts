import dotenv from "dotenv";
dotenv.config();

import { Bot, type Context, type SessionFlavor, session } from "grammy";
import { type Session, initial } from "./interface/session.js";
import OpenAI from "openai";
import { answerAI } from "./hanlder/message.js";
import { modelMenu } from "./keyboard/change_model.js";
export type MyContext = Context & SessionFlavor<Session>;

const bot = new Bot<MyContext>(process.env.BOT_TOKEN as string);
export const openai = new OpenAI({
  baseURL: "https://ai.liara.ir/api/68ff336841b3c79419dee52b/v1",
  apiKey: process.env.API_KEY as string,
});

bot.use(session({ initial }));
bot.on("callback_query:data", async (ctx) => {
  const model = ctx.callbackQuery.data;

  if (
    model === "google/gemini-2.0-flash-001" ||
    model === "openai/gpt-4o-mini"
  ) {
    await ctx.answerCallbackQuery({ text: `✅ Model changed to ${model}` });
    ctx.session.model = model;
  }
});

bot.command("change", async (ctx) => {
  await ctx.reply("Choose your AI model:", { reply_markup: modelMenu });
});

bot.on("message:text", answerAI);

bot.start();
