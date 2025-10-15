import { MyContext } from "../index.js";
import { User } from "../models/user.js";
import { NextFunction } from "grammy";

export async function UserMiddleware (ctx: MyContext, next: NextFunction){
	let user = await User.findOne({ telegramID: ctx.from?.id })
	if(!user){
		user = new User({ telegramID:ctx.from?.id })
		await user.save()
	}
	next()
}
