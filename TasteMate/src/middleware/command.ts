import { type CommandContext, type NextFunction } from "grammy";
import { MyContext } from "../index.js";
import { MenuKeyboard } from "../keyboard/menu.js";

export async function commandMiddleware(
  ctx: CommandContext<MyContext>,
  next: NextFunction,
) {
  switch (ctx.message?.text) {
    case "/start":
      await ctx.reply(ctx.t("start"), { reply_markup: MenuKeyboard(ctx) });
      break;
    case "/help":
      await ctx.reply("This is help menu");
      break;
    default:
      break;
  }
  next();
}
