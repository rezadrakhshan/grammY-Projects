import ytdl from "@distube/ytdl-core";
import { MyContext } from "../index.js";
import { InlineKeyboard } from "grammy";
import * as fs from "fs";

export async function getInfo(url: string, ctx: MyContext) {
  if (ytdl.validateURL(url)) {
    ctx.session.__video_url = url;
    const info = await ytdl.getInfo(url);

    const title = info.videoDetails.title;
    const thumbnails = info.videoDetails.thumbnails;
    const bestThumbnail = thumbnails[thumbnails.length - 1];

    const result = new InlineKeyboard();

    const formats = new Set();
    for (const format of info.formats) {
      if (format.hasAudio && format.hasVideo)
        formats.add(`${format.qualityLabel} : ${format.itag}`);
    }

    for (const entry of formats) {
      const parts = String(entry).split(" : ");
      const label = parts[0];
      const itag = parts[1];
      result.text(label, itag).row();
    }

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
  const videoStream = ytdl(url, {
    quality: format,
    filter: "videoandaudio",
    playerClients: ["WEB_EMBEDDED", "ANDROID", "IOS"],
  });

  const filePath = `${Date.now()}_${ctx.chat?.id}.mp4`;
  const writeSystem = fs.createWriteStream(filePath);

  let lastDisplayedProgress = 0;

  const waiter = await ctx.reply(
    `${ctx.t("downloads.downloading")} ${lastDisplayedProgress.toFixed(
      0
    )} ${ctx.t("downloads.mb")}`
  );

  const updateInterval = setInterval(async () => {
    const currentProgress = writeSystem.bytesWritten / (1024 * 1024);
    const newText = `${ctx.t(
      "downloads.downloading"
    )} ${currentProgress.toFixed(0)} ${ctx.t("downloads.mb")}`;

    if (Math.floor(currentProgress) !== Math.floor(lastDisplayedProgress)) {
      try {
        await ctx.api.editMessageText(
          ctx.chat?.id as number,
          waiter.message_id,
          newText
        );
        lastDisplayedProgress = currentProgress;
      } catch (e) {}
    }
  }, 2000);

  const handleError = async (err: Error) => {
    clearInterval(updateInterval);
    console.error("Download Failed:", err);
    await ctx.api
      .deleteMessage(ctx.chat?.id as number, waiter.message_id)
      .catch(() => {});
    fs.unlink(filePath, (e) => {});
    await ctx.reply(
      `❌ ${ctx.t("downloads.error")}: ${err.message.substring(0, 100)}...`
    );
  };

  videoStream.on("error", handleError);
  writeSystem.on("error", handleError);

  videoStream.pipe(writeSystem);

  writeSystem.on("finish", async () => {
    clearInterval(updateInterval);

    await ctx.api
      .deleteMessage(ctx.chat?.id as number, waiter.message_id)
      .catch(() => {});

    await ctx.reply("✅ download Complete");
  });
}
