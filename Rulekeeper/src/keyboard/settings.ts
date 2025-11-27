import { InlineKeyboard } from "grammy";
import { type MyContext } from "../index.js";

export async function settingMenu(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t("settings.option1"), "spam")
    .text(ctx.t("settings.option2"), "bad-word")
    .row()
    .text(ctx.t("settings.option3"), "link")
    .text(ctx.t("settings.option4"), "forward")
    .row()
    .text(ctx.t("settings.ai"), "AI Assistant");
}
