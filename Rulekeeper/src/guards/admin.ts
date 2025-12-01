import { type MyContext } from "../index.js";
import { type NextFunction } from "grammy";

export async function isAdmin(ctx: MyContext, next: NextFunction) {
  try {
    if (ctx.chat && ctx.chat.type !== "private") {
      const member = await ctx.getChatMember(ctx.from?.id as number);
      if (
        member.status !== "administrator" &&
        member.status !== "creator" &&
        (ctx.callbackQuery || ctx.message?.text?.startsWith("/"))
      ) {
        await ctx.reply(ctx.t("only_admin"));
        return;
      }
    } else {
      await ctx.reply("This command can only be used in a group chat.");
      return;
    }
    await next();
  } catch (err) {
    console.error(err);
  }
}
