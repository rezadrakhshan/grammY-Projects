import { NextFunction } from 'grammy';
import { MyContext } from '../bot.js';

export async function clearChat(ctx: MyContext, next: NextFunction) {
  if (ctx.message && ctx.session.__last_bot_message) {
    try {
      if (ctx.chat?.id)
        await ctx.api.deleteMessage(
          ctx.chat?.id,
          ctx.session.__last_bot_message,
        );
    } catch (err) {
      console.error('❌ Error deleting message:', err);
    }
    ctx.session.__last_bot_message = undefined;
  }

  const oldReply = ctx.reply.bind(ctx);
  ctx.reply = async (...args: Parameters<typeof ctx.reply>) => {
    const sent = await oldReply(...args);
    ctx.session.__last_bot_message = sent.message_id;
    return sent;
  };

  await next();
}
