import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";

export const message = new Composer<MyContext>();

message.on("message:text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();
  const group = await Group.findOne({ chatID: ctx.chat.id });
  if (!group) return;
  if (group?.antiSpam?.badWords.some((element) => text.includes(element))) {
    await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
  }
});
