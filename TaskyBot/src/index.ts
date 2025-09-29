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

const token = process.env.BOT_TOKEN;

const bot = createBot(token as string);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then((e) => console.log('Connected to mongodb'))
  .catch((err) => console.log(err));

bot.use(checkUserAuthentication);
bot.use(starts);
bot.use(lang);
bot.use(reminders)
bot.use(tasks);
setCommandMenu(bot).catch(console.error);

bot.start();
