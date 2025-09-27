import { InlineKeyboard } from 'grammy';
import { MyContext } from '../bot.js';

export function getTaskAction(ctx: MyContext, id: string) {
  return new InlineKeyboard()
    .text(ctx.t('taskAction.changeStatus'), `task_${id}`)
    .text(ctx.t('taskAction.remove'), `task_${id}`);
}
