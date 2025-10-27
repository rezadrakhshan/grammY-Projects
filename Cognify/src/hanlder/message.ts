import { askAI } from "../helper/ask.js";

export async function answerAI(ctx: any) {
  const waiter = await ctx.reply("⏳");
  const response = await askAI(ctx.message.text);
  await ctx.api.deleteMessage(ctx.chat.id, waiter.message_id);
  await ctx.reply(response as string);
}
