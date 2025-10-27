import dotenv from "dotenv";
dotenv.config();

import { Bot, type Context } from "grammy";

const bot = new Bot<Context>(process.env.BOT_TOKEN as string);

bot.start();
