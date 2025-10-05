import { Composer } from "grammy";
import { MyContext } from "../index.js";

export const language = new Composer<MyContext>();

language.callbackQuery("fa", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.i18n.setLocale("fa");
  await ctx.reply(ctx.t("start"));
});
language.callbackQuery("en", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.i18n.setLocale("en");
  await ctx.reply(ctx.t("start"));
});
language.callbackQuery("ru", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.i18n.setLocale("ru");
  await ctx.reply(ctx.t("start"));
});
