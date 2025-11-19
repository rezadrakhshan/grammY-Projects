import { type MyContext } from "../index.js";
import { type NextFunction } from "grammy";

export async function isAdmin(ctx: MyContext, next: NextFunction) {
  try {
    if (ctx.message && ctx.message.entities) {
      const commandEntity = ctx.message.entities.find(
        (entity) => entity.type === "bot_command",
      );
      if (commandEntity) {
        if (ctx.chat && ctx.chat.type !== "private") {
          const member = await ctx.getChatMember(ctx.from?.id as number);
          if (
            member.status !== "administrator" &&
            member.status !== "creator"
          ) {
            await ctx.reply(ctx.t("only_admin"));
            return;
          }
        } else {
          await ctx.reply("This command can only be used in a group chat.");
          return;
        }
      }
    }
    await next();
  } catch (err) {
    console.error(err);
    await ctx.reply("An error occurred while checking admin status.");
  }
}
