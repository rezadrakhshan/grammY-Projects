import { type MyContext } from "../index.js";
import { type NextFunction } from "grammy";

export async function isAdmin(ctx: MyContext, next: NextFunction) {
  try {
    const member = await ctx.getChatMember(ctx.from?.id as number);
    if (member.status !== "administrator" && member.status !== "creator") {
      await ctx.reply(ctx.t("only_admin"));
      return;
    }
    next();
  } catch (err) {
    console.error(err);
  }
}
