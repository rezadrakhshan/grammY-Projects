import dotenv from "dotenv";
dotenv.config();

import { Bot, Context } from "grammy";

const bot = new Bot<Context>(process.env.BOT as string);

bot.start();
