import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";
import { Warning } from "../../database/models/userWarning.js";

export const warning = new Composer<MyContext>();

warning.use(isAdmin);

warning.command("add_warning", async (ctx) => {
  const chat = ctx.chat.id;
  const user = ctx.message?.reply_to_message?.from?.id;
  const warn = await Warning.findOne({ chatID: chat, userID: user });
  if (warn) {
    warn.count += 1;
  } else {
    await Warning.create({ chatID: chat, userID: user });
  }
});
