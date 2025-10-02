import { Reminder } from '../models/reminders.js';
import { Task } from '../models/task.js';
import { Bot } from 'grammy';
import { MyContext } from '../bot.js';
import { InlineKeyboard } from 'grammy';
import { InputFile } from 'grammy';
import { __dirname } from '../bot.js';
import path from 'path';

export async function ReminderPollingMiddleware(bot: Bot<MyContext>) {
  const now = Date.now();
  const reminders = await Reminder.find({
    dateTimeStamps: { $lte: now },
    sent: false,
  });

  for (const r of reminders) {
    try {
      const task = await Task.findById(r.task);
      const keyboard = new InlineKeyboard().text(
        task?.title as string,
        `task_${task?._id}`,
      );
      await bot.api.sendAnimation(
        r.userID,
        new InputFile(path.join(__dirname, "../src/public/reminder.gif")),
        { reply_markup: keyboard },
      );
      r.sent = true;
      await r.save();
    } catch (error) {
      console.error('Error sending reminder: ', error);
    }
  }
}
