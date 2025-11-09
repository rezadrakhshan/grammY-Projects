import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";

export const rules = new Composer<MyContext>();

rules.command("set_rules", async (ctx) => {
  const rules = ctx.match;
  const chat = ctx.chat.id;
  const group = await Group.findOne({ chatID: chat });
  if (group) {
    group.rules = rules;
    await group.save();
    await ctx.reply(ctx.t("rules_successful"));
  } else {
    await ctx.reply(ctx.t("rules_unsuccessful"));
    return;
  }
});

rules.command("rules", async (ctx) => {
  const chat = ctx.chat.id;
  const group = await Group.findOne({ chatID: chat });
  if (group?.rules) {
    await ctx.reply(ctx.t("show_rules", { rules: group.rules }));
  } else {
    await ctx.reply(ctx.t("rules_notfound"));
  }
});
