import { askAI } from "../helper/ask.js";
import { type MyContext } from "../index.js";

export async function answerAI(ctx: MyContext) {
  const waiter = await ctx.reply("⏳");
  const response = await askAI(ctx.message?.text as string, ctx);
  await ctx.api.deleteMessage(ctx.chat?.id as number, waiter.message_id);
  await ctx.reply(response as string);
}
