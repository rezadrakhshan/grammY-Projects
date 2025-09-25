import { InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';

export function getStartMenu(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t('menu.create'), 'new task')
    .text(ctx.t('menu.list'), 'my tasks')
    .row()
    .text(ctx.t('menu.reminder'), 'reminders')
    .text(ctx.t('menu.settings'), 'settings');
}
