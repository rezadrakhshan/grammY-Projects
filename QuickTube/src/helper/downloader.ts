import ytdl from "@distube/ytdl-core";
import { MyContext } from "../index.js";
import { InlineKeyboard } from "grammy";


export async function getInfo(url: string, ctx: MyContext) {
  const info = await ytdl.getInfo(url);

  const title = info.videoDetails.title;
  const author = info.videoDetails.author.name;
  const thumbnails = info.videoDetails.thumbnails;
  const bestThumbnail = thumbnails[thumbnails.length - 1];

  const formats = info.formats
    .filter((f) => f.hasVideo && f.qualityLabel)
    .map((f) => f.qualityLabel);

  const uniqueQualities = [...new Set(formats)];

  const result = new InlineKeyboard();
  let step = 0;
  uniqueQualities.forEach((item) => {
    step++;
    if (step % 2 === 0) {
      result.text(`🔹${item}🔹`, item);
    } else {
      result.text(`🔹${item}🔹`, item).row();
    }
  });

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
}
