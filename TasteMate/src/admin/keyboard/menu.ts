import { InlineKeyboard } from "grammy";
import { MyContext } from "../../index.js";

export async function AdminKeyboard(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t("adminKeyboard.manage_menu"), "manage_menu")
    .text(ctx.t("adminKeyboard.orders"), "admin_keyboard")
    .row()
    .text(ctx.t("adminKeyboard.admins"), "admins")
    .text(ctx.t("adminKeyboard.reports"), "admin_reports");
}
