import { Composer } from "grammy";
import { MyContext } from "../index.js";
import { langMenu } from "../keyboard/langMenu.js";

export const start = new Composer<MyContext>();

start.command("start", async (ctx) => {
  await ctx.reply(ctx.t("lang"), { reply_markup: langMenu });
});
