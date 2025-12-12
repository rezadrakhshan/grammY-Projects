import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";
import { Group } from "../../database/models/group.js";

export const ai = new Composer<MyContext>();
ai.use(isAdmin);

ai.callbackQuery("AI Assistant", async (ctx) => {
  const group = await Group.findOne({ chatID: ctx.chat?.id });
  if (group) {
    if (group.rules) {
      if (group.AIAsistantt) {
        group.AIAsistantt = false;
        await ctx.answerCallbackQuery({ text: ctx.t("ai.inActive") });
      } else {
        group.AIAsistantt = true;
        await ctx.answerCallbackQuery({ text: ctx.t("ai.active") });
      }
    } else {
      await ctx.answerCallbackQuery({ text: ctx.t("ai.need_rules") });
    }
    await group.save();
  }
});
