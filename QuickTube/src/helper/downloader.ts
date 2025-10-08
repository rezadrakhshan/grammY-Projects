import ytdl from "@distube/ytdl-core";
import { MyContext } from "../index.js";
import { InlineKeyboard } from "grammy";
import * as fs from "fs";

export async function getInfo(url: string, ctx: MyContext) {
  if (ytdl.validateURL(url)) {
    ctx.session.__video_url = url;
    const info = await ytdl.getInfo(url);

    const title = info.videoDetails.title;
    const author = info.videoDetails.author.name;
    const thumbnails = info.videoDetails.thumbnails;
    const bestThumbnail = thumbnails[thumbnails.length - 1];

    const result = new InlineKeyboard()
      .text("highest", "highest")
      .text("lowest", "lowest");

    const caption = `
  ${"(❁´◡`❁)"} ${title}
  👍 ${info.videoDetails.likes}
  👁️ ${info.videoDetails.viewCount}
  📆 ${info.videoDetails.publishDate}
  👾 ${info.videoDetails.author.name}
  
  ${ctx.t("downloads.track")}
    `;

    await ctx.replyWithPhoto(bestThumbnail.url, {
      caption: caption,
      reply_markup: result,
    });
  } else {
    await ctx.reply(ctx.t("downloads.invalid"));
  }
}

export async function downloadVideo(
  url: string,
  format: string,
  ctx: MyContext
) {
  const writeSystem = fs.createWriteStream(
    `${Math.random()}-${ctx.chat?.id}.mp4`
  );
  ytdl(url, { quality: format, filter: "videoandaudio" }).pipe(writeSystem);
  let lastDisplayedProgress = -1;
  const waiter = await ctx.reply(
    `${ctx.t("downloads.downloading")} ${lastDisplayedProgress.toFixed(
      0.0
    )} ${ctx.t("downloads.mb")}`
  );

  const updateInterval = setInterval(async () => {
    const currentProgress = writeSystem.bytesWritten / (1024 * 1024);
    const newText = `${ctx.t(
      "downloads.downloading"
    )} ${currentProgress.toFixed(0)} ${ctx.t("downloads.mb")}`;

    if (Math.floor(currentProgress) !== Math.floor(lastDisplayedProgress)) {
      await ctx.api.editMessageText(
        ctx.chat?.id as number,
        waiter.message_id,
        newText
      );
      lastDisplayedProgress = currentProgress;
    }
  }, 2000);
  writeSystem.on("finish", async () => {
    clearInterval(updateInterval);
    await ctx.api.deleteMessage(ctx.chat?.id as number, waiter.message_id);
    await ctx.reply("download Complete");
  });
}
