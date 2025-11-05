import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";

export const index = new Composer<MyContext>();

index.on("my_chat_member", async (ctx) => {
  const chat = ctx.chat;

  const status = ctx.myChatMember.new_chat_member.status;
  const oldStatus = ctx.myChatMember.old_chat_member.status;
  if (status === "kicked" || status === "left") {
    const group: any = await Group.findOneAndDelete(
      { chatID: chat.id },
      { new: true },
    );
    for (const admin of group?.adminIDs) {
      await ctx.api.sendMessage(
        admin,
        ctx.t("bot_removed", {
          group_title: group.title,
          group_id: group.chatID,
        }),
      );
    }
    return;
  } else if (status === "administrator") {
    await ctx.reply(ctx.t("set_for_admin"));
    return;
  } else if (oldStatus === "administrator" && status === "member") {
    await ctx.reply(ctx.t("new_text"));
    return;
  }
  let chatData = {
    chatID: chat.id,
    title: chat.title,
    adminIDs: [] as Number[],
  };
  const target = await Group.findOne({ chatID: chatData.chatID });
  if (target) {
    await ctx.reply(ctx.t("new_text"));
  } else {
    const admins = await ctx.api.getChatAdministrators(ctx.chat.id);
    for (const admin of admins) {
      chatData.adminIDs.push(admin.user.id);
    }
    await new Group(chatData).save();
    await ctx.reply(ctx.t("new_text"));
  }
});
