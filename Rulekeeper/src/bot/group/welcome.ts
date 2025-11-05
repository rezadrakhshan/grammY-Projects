import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { Group } from "../../database/models/group.js";

export const welcome = new Composer<MyContext>();

welcome.command("set_welcome", async (ctx) => {
  const message = ctx.match;
  const chatID = ctx.chat.id;
  const result = await Group.findOneAndUpdate(
    { chatID: chatID },
    { welcomeMessage: message },
    { new: true },
  );
  if (!result) await ctx.reply(ctx.t("welcome_unsuccessful"));
  else await ctx.reply(ctx.t("welcome_successful"));
});
