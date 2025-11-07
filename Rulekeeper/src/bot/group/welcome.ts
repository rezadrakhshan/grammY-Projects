import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";
import { User } from "../../database/models/user.js";

export const welcome = new Composer<MyContext>();

welcome.command("set_welcome", async (ctx) => {
  const message = ctx.match;
  const chatID = ctx.chat.id;
  const result = await Group.findOneAndUpdate(
    { chatID: chatID },
    { welcomeMessage: message },
    { new: true },
  );
  if (!result) await ctx.reply(ctx.t("welcome_unsuccessful"));
  else await ctx.reply(ctx.t("welcome_successful"));
});

welcome.on("message:new_chat_members", async (ctx) => {
  const members = ctx.message.new_chat_members;
  const group = await Group.findOne({ chatID: ctx.chat.id });
  if (!group) return;
  if (group.welcomeMessage !== "") {
    for (const member of members) {
      if (member.is_bot) return;
      const check = await User.findOne({ userID: member.id });
      if (!check)
        await User.create({
          userID: member.id,
          username: member.username,
          firstName: member.first_name,
          groups: [group.chatID],
        });
      else {
        await User.findOneAndUpdate(
          { userID: member.id },
          { $push: { groups: group.chatID } },
        );
      }
      await ctx.reply(`@${member.username} ${group.welcomeMessage}`);
    }
  }
});

welcome.on("message:left_chat_member", async (ctx) => {
  const member = ctx.message.left_chat_member;
  const chat = ctx.chat.id;
  let user = await User.findOne({ userID: member.id });
  if (user) {
    user.groups = user.groups.filter((item) => item !== chat);
    await user.save();
  }
});
