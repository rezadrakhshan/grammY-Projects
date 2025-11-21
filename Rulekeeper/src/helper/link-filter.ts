import { type MyContext } from "../index.js";
import { Group } from "../database/models/group.js";

export async function filterLink(ctx: MyContext) {
  const group = await Group.findOne({ chatID: ctx.chat?.id });
  if (!group) return;
  const httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const nonHttpRegex =
    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  const message = ctx.message?.text;
  const extractLink =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  if (httpRegex.test(message as string)) {
    await ctx.deleteMessage();
    return;
  }
  if (nonHttpRegex.test(message as string)) {
    await ctx.deleteMessage();
    return;
  }
  if (message?.match(extractLink)) {
    await ctx.deleteMessage();
    return;
  }
}
