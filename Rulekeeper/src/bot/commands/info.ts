import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";

export const info = new Composer<MyContext>();

info.use(isAdmin);

info.command("info", async (ctx) => {
  await ctx.reply(ctx.t("info"));
});
