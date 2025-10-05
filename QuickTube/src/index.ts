import dotenv from "dotenv";
dotenv.config();

import { Bot, Context, session, SessionFlavor } from "grammy";
import { I18n, I18nFlavor } from "@grammyjs/i18n";
import { start } from "./command/start.js";
import { language } from "./command/lang.js";
import { video } from "./command/video.js";
import path from "path";
import { fileURLToPath } from "url";
import { SessionData } from "./interface/session.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export type MyContext = Context & I18nFlavor & SessionFlavor<SessionData>;
const bot = new Bot<MyContext>(process.env.BOT as string);
const i18n = new I18n<MyContext>({
  defaultLocale: "en",
  useSession: true,
  directory: path.join(__dirname, "../src/locales"),
});

bot.use(
  session({
    initial: () => {
      return {};
    },
  })
);
bot.use(i18n);
bot.use(start);
bot.use(language);
bot.use(video)

bot.start();
