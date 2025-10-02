import { Keyboard } from 'grammy';
import { MyContext } from '../bot.js';

export function getStartMenu(ctx: MyContext) {
  return new Keyboard()
    .text(ctx.t('menu.create'))
    .text(ctx.t('menu.list'))
    .row()
    .text(ctx.t('menu.reminder'))
    .text(ctx.t('menu.reports'))
    .resized();
}
