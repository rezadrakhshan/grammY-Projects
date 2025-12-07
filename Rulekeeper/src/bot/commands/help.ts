import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";
import { readFile } from "fs/promises";

export const help = new Composer<MyContext>();

help.use(isAdmin);

help.command("help", async (ctx) => {
  const data = JSON.parse(await readFile("./src/json/commands.json", "utf8"));
  let text: string = `${ctx.t("help_title")}*\n\n`;
  for (const cmd of data) {
    text += `${cmd.command} - ${ctx.t(`${cmd.key}`)}\n`;
  }
  await ctx.reply(text);
});
