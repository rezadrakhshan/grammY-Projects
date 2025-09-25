import { Composer } from 'grammy';
import { MyContext } from '../bot.js';
import { LanguageMenu } from '../keyboards/langMenu.js';
import { getStartMenu } from '../keyboards/startMenu.js';

export const lang = new Composer<MyContext>();

lang.command('language', async (ctx) => {
  await ctx.reply(ctx.t('language'), { reply_markup: LanguageMenu });
});

lang.callbackQuery('fa', async (ctx) => {
  await ctx.i18n.setLocale('fa');
  await ctx.answerCallbackQuery();
  await ctx.reply(ctx.t('start'), { reply_markup: getStartMenu(ctx) });
});
lang.callbackQuery('en', async (ctx) => {
  await ctx.i18n.setLocale('en');
  await ctx.answerCallbackQuery();
  await ctx.reply(ctx.t('start'), { reply_markup: getStartMenu(ctx) });
});
