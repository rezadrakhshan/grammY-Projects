import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { settingMenu } from "../../keyboard/settings.js";
import { isAdmin } from "../../guards/admin.js";
import { Group } from "../../database/models/group.js";

export const filter = new Composer<MyContext>();

filter.use(isAdmin);

filter.command("settings", async (ctx) => {
  await ctx.reply(ctx.t("settings.text"), {
    reply_markup: await settingMenu(ctx),
  });
});

filter.callbackQuery("bad-word", async (ctx) => {
  await ctx.reply(ctx.t("filter_words.text"), { parse_mode: "Markdown" });
  await ctx.answerCallbackQuery();
});

filter.command("addFilter", async (ctx) => {
  const words = ctx.match
    ?.split(",")
    .map((w) => w.trim())
    .filter(Boolean);
  const group = await Group.findOne({ chatID: ctx.chat.id });

  if (!group || !group.antiSpam || !words) {
    return;
  } else {
    words.forEach((item) => {
      if (!group.antiSpam?.badWords.includes(item)) {
        group.antiSpam?.badWords.push(item);
      }
    });

    await group.save();
    await ctx.reply(ctx.t("filter_words.add"));
  }
});

filter.command("removeFilter", async (ctx) => {
  const words = ctx.match.split(",");
  const group = await Group.findOne({ chatID: ctx.chat.id });
  if (!group || !group.antiSpam) return;
  group.antiSpam.badWords = group.antiSpam.badWords.filter(
    (item) => !words.includes(item),
  );
  await group.save();
  await ctx.reply(ctx.t("filter_words.removed"));
});

filter.command("clearFilter", async (ctx) => {
  const group = await Group.findOne({ chatID: ctx.chat.id });
  if (!group || !group.antiSpam) return;
  group.antiSpam.badWords = [];
  await group.save();
  await ctx.reply(ctx.t("filter_words.clear"));
});

filter.command("filterList", async (ctx) => {
  const group = await Group.findOne({ chatID: ctx.chat.id });
  if (!group || !group.antiSpam) return;
  let words = "";
  group.antiSpam.badWords.forEach((item) => {
    words += `. ${item}\n`;
  });
  await ctx.reply(
    ctx.t("filter_words.list", {
      count: group?.antiSpam?.badWords.length,
      words: words,
    }),
    { parse_mode: "Markdown" },
  );
});

filter.callbackQuery(/\b\w+:filter\b/, async (ctx) => {
  const chat = ctx.chat?.id;
  const group = await Group.findOne({ chatID: chat });
  if (!group) return;
  const antiSpam: any = group.antiSpam;
  const callBackData: any = ctx.callbackQuery.data.split(":");

  antiSpam[callBackData[0]] = !antiSpam[callBackData[0]];

  group.antiSpam = antiSpam;
  await group.save();
  await ctx.answerCallbackQuery({
    text: antiSpam[callBackData[0]] ? ctx.t("active") : ctx.t("deactivate"),
  });
});
