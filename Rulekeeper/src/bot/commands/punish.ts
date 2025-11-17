import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";

export const punish = new Composer<MyContext>();

punish.use(isAdmin);

punish.command("mute", async (ctx) => {
  const input = ctx.match.trim();
  let num = parseInt(input);
  const replyId = ctx.message?.reply_to_message?.from?.id;

  if (!replyId) {
    await ctx.reply(ctx.t("warning.reply_required"));
    return;
  }

  if (isNaN(num)) {
    await ctx.reply(ctx.t("mute.invalid"));
    return;
  }

  let until;

  if (num < 10_000_000_000) {
    const durationMinutes = num;
    until = Math.floor(Date.now() / 1000) + durationMinutes * 60;
  } else {
    until = num;
  }

  const date = new Date(until * 1000);
  const now = Date.now();

  const diffMs = date.getTime() - now;

  if (diffMs <= 0) {
    await ctx.reply(ctx.t("mute.past"));
    return;
  }

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingText =
    days > 0
      ? ctx.t("mute.format1", {
          days: days,
          hours: hours % 24,
          minutes: minutes % 60,
        })
      : hours > 0
        ? ctx.t("mute.format2", {
            hours: hours,
            minutes: minutes % 60,
          })
        : ctx.t("mute.format3", {
            minutes: minutes,
          });

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await ctx.api.restrictChatMember(
    ctx.chat.id,
    replyId as number,
    {
      can_send_audios: false,
      can_send_documents: false,
      can_send_messages: false,
      can_send_other_messages: false,
      can_send_photos: false,
      can_send_polls: false,
      can_send_video_notes: false,
      can_send_videos: false,
      can_send_voice_notes: false,
    },
    { until_date: until },
  );
  await ctx.reply(
    ctx.t("mute.result", {
      until: formattedDate,
      remaining: remainingText,
    }),
    {
      reply_to_message_id: ctx.message?.reply_to_message?.message_id as number,
      parse_mode: "Markdown",
    },
  );
});
