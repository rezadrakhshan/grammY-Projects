import dotenv from 'dotenv';
dotenv.config();

import { createBot } from './bot.js';
import { starts } from './commands/start.js';
import { lang } from './commands/lang.js';

const token = process.env.BOT_TOKEN;

const bot = createBot(token as string);

bot.use(starts);
bot.use(lang);

bot.start();
