import ytdl from "@distube/ytdl-core";
import { createWriteStream } from "fs";
import { format } from "path";

// const writeSystem = createWriteStream("video.mp4");

// ytdl("https://youtu.be/ZUQpes_BBgY?si=4_8ycHtEQI_FUlac", {
//   filter: "videoonly",
//   quality: "lowest",
// }).pipe(writeSystem);

// let progress = 0;
// const updateInterval = setInterval(() => {
//   progress = writeSystem.bytesWritten / (1024 * 1024);
//   console.log(`Downloading video: ${progress.toFixed(2)} MB`);
// }, 2000);

// writeSystem.on("finish", async () => {
//     clearInterval(updateInterval);
//     console.log("download Complete");
//   });

// const info = await ytdl.getInfo(
//   "https://youtube.com/shorts/KWrOORK1oJg?si=rjJkBHc0vv9_URg6"
// );
// const foramt = new Set();
// // Assuming 'foramt' has already been populated like this:
// foramt.add('360p : 18');
// foramt.add('720p : 22');

// for (const entryString of foramt) {
//     const parts = entryString.split(' : ');
//     const qualityLabel = parts[0];
//     const itag = parts[1];
//     console.log(qualityLabel);
//     console.log(itag);
// }

// console.log(foramt);
