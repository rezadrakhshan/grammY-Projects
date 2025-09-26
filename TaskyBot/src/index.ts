import dotenv from 'dotenv';
dotenv.config();

import { createBot } from './bot.js';
import { starts } from './commands/start.js';
import { lang } from './commands/lang.js';
import mongoose from 'mongoose';
import { checkUserAuthentication } from './middlewares/auth.js';

const token = process.env.BOT_TOKEN;

const bot = createBot(token as string);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then((e) => console.log('Connected to mongodb'))
  .catch((err) => console.log(err));

bot.use(checkUserAuthentication);
bot.use(starts);
bot.use(lang);

bot.start();
