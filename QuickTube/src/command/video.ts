import { Composer } from "grammy";
import { MyContext } from "../index.js";
import { getInfo, downloadVideo } from "../helper/downloader.js";

export const video = new Composer<MyContext>();

video.on("message:text", async (ctx) => {
  const waiter = await ctx.reply("⏳");
  await getInfo(ctx.message.text, ctx);
  await ctx.api.deleteMessage(ctx.chat.id, waiter.message_id);
});

video.callbackQuery(/(.+)/, async (ctx) => {
  await ctx.answerCallbackQuery()
  await downloadVideo(ctx.session.__video_url as string, ctx.match[1], ctx);
});
