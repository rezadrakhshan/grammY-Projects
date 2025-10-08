import ytdl from "@distube/ytdl-core";
import { createWriteStream } from "fs";

const writeSystem = createWriteStream("video.mp4");

ytdl("https://youtu.be/ZUQpes_BBgY?si=4_8ycHtEQI_FUlac", {
  filter: "videoonly",
  quality: "lowest",
}).pipe(writeSystem);

let progress = 0;
const updateInterval = setInterval(() => {
  progress = writeSystem.bytesWritten / (1024 * 1024);
  console.log(`Downloading video: ${progress.toFixed(2)} MB`);
}, 2000);

writeSystem.on("finish", async () => {
    clearInterval(updateInterval);
    console.log("download Complete");
  });
