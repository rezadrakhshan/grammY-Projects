import dotenv from "dotenv";
dotenv.config();

import { Bot, Context, session, SessionFlavor } from "grammy";
import mongoose from "mongoose";
import { commandMiddleware } from "./middleware/command.js";
import { I18n ,I18nFlavor } from "@grammyjs/i18n";
import path from "path";
import { fileURLToPath } from "url";
import { SessionData } from "./interfcae/session.js";
import { UserMiddleware } from "./middleware/user.js";


const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor
const bot = new Bot<MyContext>(process.env.BOT as string);

const i18n = new I18n<MyContext>({
	defaultLocale:"en",
	useSession: true,
	directory: path.join(__dirname, "../src/locales")
})
mongoose
  .connect(process.env.DB as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err.msg);
  });

bot.use(
  session({
    initial: () => {
      return {};
    },
  }),
);

bot.use(i18n)
bot.use(UserMiddleware)
bot.command(["start", "help"], commandMiddleware);

bot.start();
