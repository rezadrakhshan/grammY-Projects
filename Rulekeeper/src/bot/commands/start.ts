import { Composer, InlineKeyboard } from "grammy";
import { type MyContext } from "../../index.js";

export const start = new Composer<MyContext>();

start.command("start", async (ctx) => {
  if (ctx.chat.type !== "private") return;
  const button = new InlineKeyboard().url(
    ctx.t("button.addGroup"),
    "https://t.me/RuleKeeperRoBot?startgroup=new",
  );
  await ctx.reply(ctx.t("start"), { reply_markup: button });
});
