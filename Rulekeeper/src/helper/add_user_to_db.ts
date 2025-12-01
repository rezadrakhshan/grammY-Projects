import { type MyContext } from "../index.js";
import { User } from "../database/models/user.js";

export async function addUserToDB(ctx: MyContext, member: any) {
  const chat = ctx.chat;
  const check = await User.findOne({ userID: member.id });
  const isJoin = check?.groups.find((item) => item === chat?.id);
  if (!check)
    await User.create({
      userID: member.id,
      username: member.username,
      firstName: member.first_name,
      groups: [chat?.id],
    });
  else if (!isJoin) {
    await User.findOneAndUpdate(
      { userID: member.id },
      { $push: { groups: chat?.id } },
    );
  }
}
