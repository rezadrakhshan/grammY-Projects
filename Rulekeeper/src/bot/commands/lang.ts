import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";
import { LanguageKeyBoard } from "../../keyboard/lang.js";

export const language = new Composer<MyContext>();
language.use(isAdmin);

language.command("language", async (ctx) => {
  await ctx.reply(ctx.t("lang.text"), {
    reply_markup: await LanguageKeyBoard(ctx),
  });
});

language.callbackQuery(/^[A-Za-z]{2}$/, async (ctx) => {
  await ctx.i18n.setLocale(ctx.callbackQuery.data);
  await ctx.answerCallbackQuery({ text: "Language Changed" });
});
