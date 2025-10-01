import dotenv from 'dotenv';
dotenv.config();

import { createBot } from './bot.js';
import { starts } from './commands/start.js';
import { lang } from './commands/lang.js';
import { tasks } from './commands/task.js';
import { reminders } from './commands/reminders.js';
import mongoose from 'mongoose';
import { checkUserAuthentication } from './middlewares/auth.js';
import { setCommandMenu } from './keyboards/commandMenu.js';
import { ReminderPollingMiddleware } from './middlewares/reminder.js';

const token = process.env.BOT_TOKEN;

export const bot = createBot(token as string);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then((e) => console.log('Connected to mongodb'))
  .catch((err) => console.log(err));

bot.use(checkUserAuthentication);
bot.use(starts);
bot.use(lang);
bot.use(reminders);
bot.use(tasks);
setCommandMenu(bot).catch(console.error);

let pollingRunning = false;

const poll = async () => {
  if (pollingRunning) return;
  pollingRunning = true;
  try {
    await ReminderPollingMiddleware(bot);
  } catch (err) {
    console.error('Polling error:', err);
  } finally {
    pollingRunning = false;
  }
};
poll().catch(console.error);
setInterval(() => poll().catch(console.error), 30 * 1000);

bot.start();
