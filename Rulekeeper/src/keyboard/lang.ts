import { InlineKeyboard } from "grammy";
import { type MyContext } from "../index.js";

export async function LanguageKeyBoard(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t("lang.en"), "en")
    .text(ctx.t("lang.fa"), "fa")
    .row()
    .text(ctx.t("lang.ru"), "ru");
}
