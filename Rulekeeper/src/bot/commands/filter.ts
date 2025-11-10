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

filter.callbackQuery("spam", async (ctx) => {
  const chat = await Group.findOne({ chatID: ctx.chat?.id });
  if (!chat || !chat.antiSpam) return;
  if (chat.antiSpam.enabled) {
    chat.antiSpam.enabled = false;
    await ctx.answerCallbackQuery({ text: ctx.t("spam.disable") });
  } else {
    chat.antiSpam.enabled = true;
    await ctx.answerCallbackQuery({ text: ctx.t("spam.enable") });
  }
  await chat.save();
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
  await ctx.reply(ctx.t("filter_words.remove"));
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
