import { Bot, SessionFlavor, session } from 'grammy';
import { I18n, I18nFlavor } from '@grammyjs/i18n';
import { Context } from 'grammy';
import path from 'path';
import { fileURLToPath } from 'url';
import { SessionData } from './interface/session.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;

export function createBot(token: string) {
  const bot = new Bot<MyContext>(token);
  const i18n = new I18n<MyContext>({
    defaultLocale: 'en',
    useSession: true,
    directory: path.join(__dirname, '../src/locales'),
  });

  bot.use(
    session({
      initial: () => {
        return {};
      },
    }),
  );

  bot.use(i18n);

  return bot;
}
