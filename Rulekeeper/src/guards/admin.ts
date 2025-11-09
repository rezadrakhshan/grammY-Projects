import { type MyContext } from "../index.js";
import { type NextFunction } from "grammy";
import { Group } from "../database/models/group.js";

export async function isAdmin(ctx: MyContext, next: NextFunction) {
  const user = ctx.from?.id;
  const chat = ctx.chat?.id;
  if (!chat) {
    await ctx.reply(ctx.t("just_group"));
    return;
  }
  const group = await Group.findOne({
    chatID: chat,
    adminIDs: { $in: [user] },
  });
  if (!group) {
    await ctx.reply(ctx.t("only_admin"));
    return;
  }
  await next();
}
