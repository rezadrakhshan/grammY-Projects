import dotenv from "dotenv";
dotenv.config();

import { Bot, type SessionFlavor, session, type Context } from "grammy";
import { type Session } from "./interface/session.js";
import { I18n, type I18nFlavor } from "@grammyjs/i18n";
import { initial } from "./helper/initial.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectMongo } from "./database/mongo.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export type MyContext = Context & SessionFlavor<Session> & I18nFlavor;
const bot = new Bot<MyContext>(process.env.BOT as string);

connectMongo();

const i18n = new I18n({
  defaultLocale: "en",
  useSession: true,
  directory: path.join(__dirname, "../src/locales"),
});

bot.use(session({ initial }));
bot.use(i18n);

bot.command("start", async (ctx) => {
  await ctx.reply(ctx.t("start"));
});

bot.start();
