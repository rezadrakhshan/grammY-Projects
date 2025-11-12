import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";
import { Warning } from "../../database/models/userWarning.js";
import { Group } from "../../database/models/group.js";

export const warning = new Composer<MyContext>();

warning.use(isAdmin);

warning.command("add_warning", async (ctx) => {
  try {
    const chat = ctx.chat?.id;
    const user = ctx.message?.reply_to_message?.from?.id;

    if (!chat || !user) {
      await ctx.reply(ctx.t("warning.reply_required"));
      return;
    }

    const group = await Group.findOne({ chatID: chat }).select(
      "maxWarningCount",
    );
    if (!group) {
      await ctx.reply(ctx.t("warning.group_not_found"));
      return;
    }

    const groupWarningCount = group.maxWarningCount ?? 3;
    let warn = await Warning.findOne({ chatID: chat, userID: user });

    if (warn) {
      warn.count += 1;
      await warn.save();

      await ctx.reply(
        ctx.t("warning.received", {
          current: warn.count,
          max: groupWarningCount,
        }),
        {
          reply_to_message_id: ctx.message?.reply_to_message
            ?.message_id as number,
        },
      );

      if (warn.count >= groupWarningCount) {
        await ctx.api.restrictChatMember(chat, user, {
          can_send_messages: false,
          can_send_audios: false,
          can_send_documents: false,
          can_send_photos: false,
          can_send_videos: false,
          can_send_video_notes: false,
          can_send_voice_notes: false,
          can_send_polls: false,
          can_send_other_messages: false,
          can_add_web_page_previews: false,
        });

        await ctx.reply(ctx.t("warning.muted"));
      }
    } else {
      warn = await Warning.create({ chatID: chat, userID: user, count: 1 });
      await ctx.reply(
        ctx.t("warning.first_warning", {
          current: warn.count,
          max: groupWarningCount,
        }),
        {
          reply_to_message_id: ctx.message?.reply_to_message
            ?.message_id as number,
        },
      );
    }
  } catch (err) {
    console.error("Error adding warning:", err);
    await ctx.reply(ctx.t("warning.error"));
  }
});
