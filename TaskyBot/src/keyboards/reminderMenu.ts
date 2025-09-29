import { InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';

export function setReminderMenu(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t('reminder_keyboard.list'), 'reminder_list')
    .text(ctx.t('reminder_keyboard.add'), 'reminder_add')
    .text(ctx.t('reminder_keyboard.remove'), 'reminder_remove')
    .row()
    .text(ctx.t('reminder_keyboard.back'), 'back');
}
