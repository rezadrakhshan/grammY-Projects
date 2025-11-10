import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { settingMenu } from "../../keyboard/settings.js";
import { isAdmin } from "../../guards/admin.js";
import { Group } from "../../database/models/group.js";

export const filter = new Composer<MyContext>();

filter.use(isAdmin);

filter.command("settings", async (ctx) => {
  await ctx.reply(ctx.t("settings.text"), {
    reply_markup: await settingMenu(ctx),
  });
});

filter.callbackQuery("spam", async (ctx) => {
  const chat = await Group.findOne({ chatID: ctx.chat?.id });
  if (!chat || !chat.antiSpam) return;
  if (chat.antiSpam.enabled) {
    chat.antiSpam.enabled = false;
    await ctx.answerCallbackQuery({ text: ctx.t("spam.disable") });
  } else {
    chat.antiSpam.enabled = true;
    await ctx.answerCallbackQuery({ text: ctx.t("spam.enable") });
  }
  await chat.save();
});
