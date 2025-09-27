import { NextFunction } from 'grammy';
import { MyContext } from '../bot.js';

export async function clearChat(ctx: MyContext, next: NextFunction) {
  const userAction = ctx.message || ctx.callbackQuery;

  if (userAction && ctx.session.__last_bot_message) {
    try {
      if (!ctx.session.__last_command_start && ctx.chat?.id) {
        await ctx.api.deleteMessage(
          ctx.chat.id,
          ctx.session.__last_bot_message,
        );
      }
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

  if (ctx.message?.text === '/start') {
    ctx.session.__last_command_start = true;
  } else {
    ctx.session.__last_command_start = false;
  }
}
