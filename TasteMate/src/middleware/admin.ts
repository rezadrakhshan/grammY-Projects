import { MyContext } from "../index.js";
import { NextFunction } from "grammy";
import { User } from "../models/user.js";

export async function isAdminMiddleWare(ctx: MyContext, next: NextFunction) {
  const user = await User.findOne({ telegramID: ctx.from?.id, isAdmin: true });
  if (user) {
    await next();
  } else {
    await ctx.reply("You dont have permission");
  }
}
