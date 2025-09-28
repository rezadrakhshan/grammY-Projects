import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';
import { Task } from '../models/task.js';
import { getTaskAction } from '../keyboards/taskMenu.js';

export const tasks = new Composer<MyContext>();

tasks.on('message:text', async (ctx) => {
  if (ctx.message.text == ctx.t('menu.create')) {
    await ctx.reply(ctx.t('task.title'));
    ctx.session.__step = 'title';
  } else if (ctx.message.text == ctx.t('menu.list')) {
    const target = await Task.find({ userID: ctx.from.id });
    if (target.length === 0)
      await ctx.reply(ctx.t('taskList.notFound'), { parse_mode: 'HTML' });
    else {
      const result = new InlineKeyboard();
      target.forEach((task) => {
        result.text(task.title as string, `task_${task._id}`).row();
      });

      await ctx.reply(ctx.t('taskList.header'), {
        reply_markup: result,
        parse_mode: 'HTML',
      });
    }
  } else if (ctx.session.__step === 'title') {
    if (!ctx.session.__task) {
      ctx.session.__task = { title: '', description: '' };
    }
    ctx.session.__task.title = ctx.message.text;
    await ctx.reply(ctx.t('task.description'));
    ctx.session.__step = 'description';
  } else if (ctx.session.__step === 'description') {
    if (ctx.session.__task) {
      ctx.session.__task.description = ctx.message.text;
    }
    await ctx.reply(ctx.t('task.due'));
    ctx.session.__step = 'due';
  } else if (ctx.session.__step === 'due') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateRegex.test(ctx.message.text)) {
      const result = await new Task({
        userID: ctx.from.id,
        title: ctx.session.__task?.title,
        description: ctx.session.__task?.description,
        due: ctx.message.text,
      }).save();
      ctx.session.__task = { title: '', description: '' };
      ctx.session.__step = '';
      await ctx.reply(ctx.t('task.complete'));
    } else {
      await ctx.reply(ctx.t('task.invalidDate'));
    }
  }
});

tasks.callbackQuery(/task_(.+)_remove/, async (ctx) => {
  const taskID = ctx.match[1];
  await Task.findByIdAndDelete(taskID);
  await ctx.reply(ctx.t('taskAction.deleteMessage'));
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
});

tasks.callbackQuery(/task_(.+)/, async (ctx) => {
  const taskID = ctx.match[1];
  const target = await Task.findById(taskID);
  const result = `
${ctx.t('taskList.title')} ${target?.title}

${ctx.t('taskList.description')} ${target?.description}

${ctx.t('taskList.due')} ${target?.due}

${ctx.t('taskList.status')} ${
    target?.isDone
      ? ctx.t('taskList.completed') + '✅'
      : ctx.t('taskList.pending') + '⏳'
  }
  `;
  await ctx.reply(result, {
    parse_mode: 'HTML',
    reply_markup: getTaskAction(ctx, String(target?._id)),
  });
  await ctx.answerCallbackQuery();
});
