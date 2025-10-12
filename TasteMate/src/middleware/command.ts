import { type CommandContext, type NextFunction, type Context } from "grammy";

export async function commandMiddleware(
  ctx: CommandContext<Context>,
  next: NextFunction
) {
  switch (ctx.message?.text) {
    case "/start":
      await ctx.reply("Welcome to TasteMate");
      break;
    case "/help":
      await ctx.reply("This is help menu");
      break;
    default:
      break;
  }
  next();
}
