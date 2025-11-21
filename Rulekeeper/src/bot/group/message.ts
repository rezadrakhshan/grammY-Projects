import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";
import { filterLink } from "../../helper/link-filter.js";

export const message = new Composer<MyContext>();
export const spamMap = new Map();
const SPAM_LIMIT = 5;
export const TIME_FRAME = 10000;

message.on("message:text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();
  const group = await Group.findOne({ chatID: ctx.chat.id });
  if (!group) return;
  if (group.antiSpam?.linkBlock) await filterLink(ctx);
  if (group?.antiSpam?.badWords.some((element) => text.includes(element))) {
    await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
  }
  if (group.antiSpam?.enabled) {
    const user = ctx.from.id;
    const now = Date.now();
    const spamInfo = spamMap.get(user) || { count: 0, firstMessage: now };
    if (now - spamInfo.firstMessage < TIME_FRAME) {
      spamInfo.count++;
    } else {
      spamInfo.count = 1;
      spamInfo.firstMessage = now;
    }

    spamMap.set(user, spamInfo);
    if (spamInfo.count > SPAM_LIMIT) {
      await ctx.api.restrictChatMember(group.chatID, user, {
        can_send_audios: false,
        can_send_documents: false,
        can_send_messages: false,
        can_send_other_messages: false,
        can_send_photos: false,
        can_send_polls: false,
        can_send_video_notes: false,
        can_send_videos: false,
        can_send_voice_notes: false,
      });
      await ctx.reply(
        ctx.t("spam-mute", {
          user: ctx.from.username as string,
        }),
      );
      await ctx.deleteMessage();
    }
  }
});

message.on("message:forward_origin", async (ctx) => {
  const group = await Group.findOne({ chatID: ctx.chat.id });
  const isAdmin = group?.adminIDs.find((id) => id === ctx.from.id);
  if (group?.antiSpam?.forwardBlock && !isAdmin) {
    await ctx.deleteMessage();
    return;
  }
});
