import dotenv from "dotenv";
dotenv.config();

import { Bot } from "grammy";

const bot = new Bot(process.env.BOT as string);

bot.start();
