import { Composer } from 'grammy';
import { getStartMenu } from '../keyboards/startMenu.js';
import { MyContext } from '../bot.js';

export const starts = new Composer<MyContext>();

starts.command('start', async (ctx) => {
  await ctx.reply(ctx.t('start'), { reply_markup: getStartMenu(ctx) });
});

