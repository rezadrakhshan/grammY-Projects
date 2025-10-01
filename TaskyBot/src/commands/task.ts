import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';
import { Task } from '../models/task.js';
import { getTaskAction } from '../keyboards/taskMenu.js';
import { setReminderMenu } from '../keyboards/reminderMenu.js';
import { createReminder } from './reminders.js';

export const tasks = new Composer<MyContext>();

tasks.on('message:text', async (ctx) => {
  if (ctx.message.text === ctx.t('menu.create')) {
    await ctx.reply(ctx.t('task.title'));
    ctx.session.__step = 'title';
  } else if (ctx.message.text === ctx.t('menu.reminder')) {
    ctx.session.__step = '';
    await ctx.reply(ctx.t('reminders.header'), {
      reply_markup: setReminderMenu(ctx),
    });
  } else if (ctx.message.text === ctx.t('menu.list')) {
    const target = await Task.find({ userID: ctx.from.id });
    if (target.length === 0) {
      await ctx.reply(ctx.t('taskList.notFound'), { parse_mode: 'HTML' });
    } else {
      const result = new InlineKeyboard();
      target.forEach((task) => {
        result.text(task.title as string, `task_${task._id}`).row();
      });
      await ctx.reply(ctx.t('taskList.header'), {
        reply_markup: result,
        parse_mode: 'HTML',
      });
    }
    ctx.session.__step = '';
  } else if (ctx.session.__step === 'title') {
    ctx.session.__task = ctx.session.__task ?? { title: '', description: '' };
    ctx.session.__task.title = ctx.message.text;
    await ctx.reply(ctx.t('task.description'));
    ctx.session.__step = 'description';
  } else if (ctx.session.__step === 'description') {
    if (ctx.session.__task?.description)
      ctx.session.__task.description = ctx.message.text;
    await ctx.reply(ctx.t('task.due'));
    ctx.session.__step = 'due';
  } else if (ctx.session.__step === 'due') {
    const dateTimeRegex =
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(0\d|1\d|2[0-3]):([0-5]\d)$/;
    if (dateTimeRegex.test(ctx.message.text)) {
      const targetDate = new Date(ctx.message.text.replace(' ', 'T'));
      const targetTimestamp = targetDate.getTime();

      await new Task({
        userID: ctx.from.id,
        title: ctx.session.__task?.title,
        description: ctx.session.__task?.description,
        due: ctx.message.text,
        dueTimeStamps: targetTimestamp,
      }).save();
      ctx.session.__task = { title: '', description: '' };
      ctx.session.__step = '';
      await ctx.reply(ctx.t('task.complete'));
    } else {
      await ctx.reply(ctx.t('task.invalidDate'));
    }
  } else if (ctx.session.__step === 'time') {
    createReminder(ctx); 
  }
});

tasks.callbackQuery(/task_(.+)_remove/, async (ctx) => {
  const taskID = ctx.match[1];
  await Task.findByIdAndDelete(taskID);
  await ctx.reply(ctx.t('taskAction.deleteMessage'));
  ctx.session.__step = '';
});

tasks.callbackQuery(/task_(.+)_update/, async (ctx) => {
  const taskID = ctx.match[1];
  const task = await Task.findById(taskID);
  if (!task) await ctx.reply(ctx.t('taskAction.taskNotFound'));
  else {
    task.isDone = !task.isDone;
    await task.save();
    await ctx.reply(ctx.t('taskAction.updateMessage'));
  }
  ctx.session.__step = '';
});

tasks.callbackQuery(/task_(.+)/, async (ctx) => {
  const taskID = ctx.match[1];
  const target = await Task.findById(taskID);

  if (!target) {
    await ctx.reply(ctx.t('taskAction.taskNotFound'));
    return await ctx.answerCallbackQuery();
  }

  const today = Date.now();
  const diff = target.dueTimeStamps - today;
  const isExpired = diff <= 0;

  const formatTask = (strike: boolean) => `
${strike ? '<s>' : ''}${ctx.t('taskList.title')} ${target.title}${
    strike ? '</s>' : ''
  }
${strike ? '<s>' : ''}${ctx.t('taskList.description')} ${target.description}${
    strike ? '</s>' : ''
  }
${strike ? '<s>' : ''}${ctx.t('taskList.due')} ${target.due}${
    strike ? '</s>' : ''
  }
${strike ? '<s>' : ''}${ctx.t('taskList.status')} ${
    target.isDone
      ? ctx.t('taskList.completed') + '✅'
      : ctx.t('taskList.pending') + '⏳'
  }${strike ? '</s>' : ''}
${isExpired ? ctx.t('taskList.deadline') : ''}
`;

  await ctx.reply(formatTask(isExpired), {
    parse_mode: 'HTML',
    ...(isExpired
      ? {}
      : { reply_markup: getTaskAction(ctx, String(target._id)) }),
  });

  ctx.session.__step = '';
  await ctx.answerCallbackQuery();
});
