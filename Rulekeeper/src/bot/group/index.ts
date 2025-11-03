import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";

export const index = new Composer<MyContext>();

index.on("my_chat_member", async (ctx) => {
  const chat = ctx.chat;
  const status = ctx.myChatMember.new_chat_member.status;
  if (status === "kicked" || status === "left") {
    await Group.findOneAndDelete({ chatID: chat.id });
    return;
  }
  const chatData = {
    chatID: chat.id,
    title: chat.title,
  };
  const target = await Group.findOne({ chatID: chatData.chatID });
  if (target) {
    await ctx.reply(ctx.t("new_text"));
  } else {
    await new Group(chatData).save();
    await ctx.reply(ctx.t("new_text"));
  }
});
