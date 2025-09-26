import { Composer } from 'grammy';
import { MyContext } from '../bot.js';
import { Task } from '../models/task.js';

export const tasks = new Composer<MyContext>();

tasks.callbackQuery('new task', async (ctx) => {
  await ctx.reply(ctx.t('task.title'));
  ctx.session.__step = 'title';
});

tasks.on('message:text', async (ctx) => {
  if (ctx.session.__step === 'title') {
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
      await ctx.reply(ctx.t('task.invalidDate'))
    }
  }
});
