import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";
import type { Record } from "groq-sdk/core.mjs";

export const blockComposer = new Composer<MyContext>();

const blockItem = {
  "message:photo": "pictureBlock",
  "message:video": "videoBlock",
  "message:location": "locationBlock",
  "message:poll": "pollBlock",
  "message:animation": "gifBlock",
  edited_message: "editBlock",
  "message:audio": "musicBlock",
  "message:sticker": "stickerBlock",
  "message:voice": "voiceBlock",
};

for (const [key, value] of Object.entries(blockItem)) {
  blockComposer.on(key as any, async (ctx) => {
    const chat: any = ctx.chat;
    const user: any = ctx.from;
    const group = await Group.findOne({ chatID: chat.id });
    const isAdmin = group?.adminIDs.find((admin) => admin === user.id);
    if (!group) return;
    const antispam = group.antiSpam as Record<string, any> | undefined;
    try {
      if (!isAdmin) {
        if (antispam?.[value]) {
          const msg =
            ctx.message ??
            (ctx.editedMessage as { message_id?: number } | undefined);
          if (msg?.message_id != null) {
            await ctx.api.deleteMessage(chat.id, msg.message_id);
          } else {
            await ctx.deleteMessage();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
}
