import dotenv from "dotenv";
dotenv.config();

import { Bot } from "grammy";
import mongoose from "mongoose";
import { commandMiddleware } from "./middleware/command.js";

const bot = new Bot(process.env.BOT as string);

mongoose
  .connect(process.env.DB as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err.msg);
  });

bot.command(["start", "help"], commandMiddleware);

bot.start();
