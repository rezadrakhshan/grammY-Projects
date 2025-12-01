import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";
import { User } from "../../database/models/user.js";
import { isAdmin } from "../../guards/admin.js";
import { Warning } from "../../database/models/userWarning.js";
import { addUserToDB } from "../../helper/add_user_to_db.js";

export const welcome = new Composer<MyContext>();

welcome.use(isAdmin);

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
  for (const member of members) {
    if (member.is_bot) return;
    await addUserToDB(ctx, member);
    if (group.welcomeMessage)
      await ctx.reply(`@${member.username} ${group.welcomeMessage}`);
  }
});

welcome.on("message:left_chat_member", async (ctx) => {
  try {
    const member = ctx.message.left_chat_member;
    const chat = ctx.chat.id;
    let user = await User.findOne({ userID: member.id });
    if (user) {
      user.groups = user.groups.filter((item) => item !== chat);
      await user.save();
      await Warning.findOneAndDelete({ chatID: chat, userID: member });
    }
  } catch {
    console.log("Bot got error when user left the group");
  }
});
