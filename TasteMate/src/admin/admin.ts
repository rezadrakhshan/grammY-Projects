import { Composer } from "grammy";
import { MyContext } from "../index.js";
import { isAdminMiddleWare } from "../middleware/admin.js";
import { foodAdmin } from "./food.js";
import { AdminKeyboard } from "./keyboard/menu.js";

export const admin = new Composer<MyContext>();

admin.use(isAdminMiddleWare);
admin.use(foodAdmin);

admin.command("dashboard", async (ctx) => {
  await ctx.reply(ctx.t("admin.dashboard"), {
    reply_markup: await AdminKeyboard(ctx),
  });
});
