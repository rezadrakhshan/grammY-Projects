import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';
import { Task } from '../models/task.js';
import { Reminder } from '../models/reminders.js';
import { getReminderAction } from '../keyboards/reminderMenu.js';

export const reminders = new Composer<MyContext>();

reminders.callbackQuery('reminder_add', async (ctx) => {
  ctx.session.__reminder = {
    taskID: '',
    date: '',
  };
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
  await ctx.answerCallbackQuery();
});

reminders.callbackQuery(/task_(.+)_reminder/, async (ctx) => {
  await ctx.api.deleteMessage(
    Number(ctx.chat?.id),
    Number(ctx.msg?.message_id),
  );
  ctx.session.__reminder.taskID = ctx.match[1];
  ctx.session.__step = 'time';
  await ctx.answerCallbackQuery();
  await ctx.reply(ctx.t('reminders.time'));
});

export async function createReminder(ctx: any) {
  const dateTimeRegex =
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(0\d|1\d|2[0-3]):([0-5]\d)$/;
  if (dateTimeRegex.test(ctx.message.text)) {
    const now = Date.now();
    const targetDate = new Date(ctx.message.text.replace(' ', 'T'));
    const targetTimestamp = targetDate.getTime();
    const task = await Task.findById(ctx.session.__reminder.taskID);
    if (!task) {
      await ctx.answerCallbackQuery({ text: 'task doew not exists' });
      return;
    } else {
      const afterTaskDue = task.dueTimeStamps - targetTimestamp;
      const isDone = targetTimestamp - now;
      if (isDone <= 0 || afterTaskDue <= 0) {
        await ctx.reply(ctx.t('reminders.invalidTime'));
        return;
      } else {
        const reminder = await new Reminder({
          userID: ctx.from.id,
          task: ctx.session.__reminder.taskID,
          date: ctx.message.text,
          dateTimeStamps: targetTimestamp,
        });
        await reminder.save();
        await ctx.reply(ctx.t('reminders.set'));
        ctx.session.__step = '';
        return;
      }
    }
  } else {
    await ctx.reply(ctx.t('reminders.invalidTime'));
    return;
  }
}

reminders.callbackQuery('reminder_list', async (ctx) => {
  await ctx.answerCallbackQuery();
  const userReminders = await Reminder.find({ userID: ctx.from.id });
  if (userReminders) {
    const result = new InlineKeyboard();
    userReminders.forEach((reminder) => {
      result.text(reminder.date as string, `reminder_${reminder._id}`).row();
    });
    await ctx.reply(ctx.t('reminders.list'), { reply_markup: result });
  } else {
    await ctx.reply(ctx.t('reminders.noTask'));
  }
});

reminders.callbackQuery(/reminder_(.+)/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const reminder = await Reminder.findById(ctx.match[1]);
  const task = await Task.findById(reminder?.task);
  if (reminder && task) {
    const done = reminder.dateTimeStamps - Date.now() <= 0;
    const formatTask = (strike: boolean) => `
${ctx.t('reminder_detail.header')}

${strike ? '<s>' : ''}${ctx.t('reminder_detail.task')} ${task.title}${
      strike ? '</s>' : ''
    }
${strike ? '<s>' : ''}${ctx.t('reminder_detail.date')} ${reminder.date}${
      strike ? '</s>' : ''
    }
`;
    await ctx.reply(formatTask(done), {
      parse_mode: 'HTML',
      reply_markup: getReminderAction(ctx, reminder.id),
    });
  } else {
    await ctx.answerCallbackQuery({ text: 'Task or reminder does not exists' });
  }
});
