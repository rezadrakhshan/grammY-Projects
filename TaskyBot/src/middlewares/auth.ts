import { NextFunction } from 'grammy';
import { MyContext } from '../bot.js';
import { User } from '../models/user.js';

export async function checkUserAuthentication(
  ctx: MyContext,
  next: NextFunction,
) {
  const userID = ctx.from?.id;
  const username = ctx.from?.username;
  const target = await User.findOne({ userID: userID, username: username });
  if (!target) {
    const newUser = await new User({ userID, username });
    await newUser.save();
  }
  next();
}
