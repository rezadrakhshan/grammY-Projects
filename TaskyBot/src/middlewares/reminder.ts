import { Reminder } from '../models/reminders.js';
import { Bot } from 'grammy';
import { MyContext } from '../bot.js';

export async function ReminderPollingMiddleware(bot: Bot<MyContext>) {
  const now = Date.now();
  const reminders = await Reminder.find({
    dateTimeStamps: { $lte: now },
    sent: false,
  });

  for (const r of reminders) {
    try {
      await bot.api.sendMessage(
        r.userID,
        '🔔 Hey! Don’t forget to get your task done 😉',
      );
      r.sent = true;
      await r.save();
    } catch (error) {
      console.error('Error sending reminder: ', error);
    }
  }
}
