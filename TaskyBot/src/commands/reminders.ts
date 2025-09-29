import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';
import { Task } from '../models/task.js';

export const reminders = new Composer<MyContext>();

reminders.callbackQuery('reminder_add', async (ctx) => {
  const now = Date.now();
  const tasks = await Task.find({
    userID: ctx.from.id,
    isDone: false,
    dueTimeStamps: { $gt: now },
  });
  if (tasks.length === 0) await ctx.reply(ctx.t('reminders.noTask'));
  else {
    const result = new InlineKeyboard();
    tasks.forEach((task) => {
      result.text(task.title as string, `task_${task._id}_reminder`).row();
    });
    await ctx.reply(ctx.t('reminders.choose'), { reply_markup: result });
  }
});
