import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";

export const info = new Composer<MyContext>();

info.use(isAdmin);

info.command("info", async (ctx) => {
  await ctx.reply(ctx.t("info"));
});

info.command("get_info", async (ctx) => {
  const replied = ctx.message?.reply_to_message;

  if (!replied) {
    return ctx.reply(ctx.t("warning.reply_required"), {
      reply_to_message_id: ctx.message?.message_id as number,
    });
  }

  const userId = replied.from?.id;
  if (!userId) {
    return ctx.reply("❗️ Cannot get user ID.");
  }

  const member = await ctx.api.getChatMember(ctx.chat.id, userId);

  const photos: any = await ctx.api.getUserProfilePhotos(userId, { limit: 1 });
  const hasPhoto = photos.total_count > 0;
  const lastPhoto = hasPhoto ? photos.photos[0].at(-1) : null;

  const text = ctx.t("user_info.text", {
    id: userId,
    first_name: member.user.first_name ?? "",
    last_name: member.user.last_name ?? "",
    username: member.user.username ?? "",
    is_premium: member.user.is_premium ? "✅" : "❌",
    language_code: member.user.language_code ?? "—",
    status: member.status,
    custom_title: "",
    photo_total: photos.total_count,
  });

  if (hasPhoto && lastPhoto) {
    return ctx.replyWithPhoto(lastPhoto.file_id, {
      caption: text,
      parse_mode: "HTML",
      reply_to_message_id: replied.message_id,
    });
  }

  return ctx.reply(text, {
    parse_mode: "HTML",
    reply_to_message_id: replied.message_id,
  });
});
