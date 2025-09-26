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
  }
  else if (ctx.session.__step === 'description') {
    if (ctx.session.__task) {
      ctx.session.__task.description = ctx.message.text;
    }
    const result = await new Task({
      userID: ctx.from.id,
      title: ctx.session.__task?.title,
      description: ctx.session.__task?.description,
    }).save();
    await ctx.reply(ctx.t('task.complete'));
    ctx.session.__task = { title: '', description: '' };
    ctx.session.__step = '';
  }
});
