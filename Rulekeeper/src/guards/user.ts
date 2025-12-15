import { type MyContext } from "../index.js";

export async function isUser(ctx: MyContext) {
  if (ctx.chat && ctx.chat.type !== "private") {
    const member = await ctx.getChatMember(ctx.from?.id as number);
    if (member.status === "administrator" || member.status === "creator") {
      return false;
    } else return true;
  }
}
