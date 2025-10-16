import { InlineKeyboard } from "grammy";
import { MyContext } from "../index.js";

export function MenuKeyboard(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t('menu.menu'), "menu")
    .text(ctx.t("menu.order"), "new-order")
    .row()
    .text(ctx.t("menu.track"), "track-order")
    .text(ctx.t("menu.contact"), "contact")
    .row()
    .text(ctx.t("menu.location"), "location");
}
