import { Composer } from "grammy";
import { type MyContext } from "../../index.js";

export const info = new Composer<MyContext>();

info.command("info", async (ctx) => {
  await ctx.reply(ctx.t("info"));
});
