import { InlineKeyboard } from "grammy";
import { type MyContext } from "../index.js";

export async function settingMenu(ctx: MyContext) {
  return new InlineKeyboard()
    .text(ctx.t("settings.option1"), "enabled:filter")
    .text(ctx.t("settings.option2"), "bad-word")
    .row()
    .text(ctx.t("settings.option3"), "linkBlock:filter")
    .text(ctx.t("settings.option4"), "forwardBlock:filter")
    .row()
    .text(ctx.t("settings.gif"), "gifBlock:filter")
    .text(ctx.t("settings.edit"), "editBlock:filter")
    .row()
    .text(ctx.t("settings.video"), "videoBlock:filter")
    .text(ctx.t("settings.pic"), "pictureBlock:filter")
    .row()
    .text(ctx.t("settings.music"), "musicBlock:filter")
    .text(ctx.t("settings.sticker"), "stickerBlock:filter")
    .row()
    .text(ctx.t("settings.location"), "locationBlock:filter")
    .text(ctx.t("settings.voice"), "voiceBlock:filter")
    .row()
    .text(ctx.t("settings.poll"), "pollBlock:filter")
    .row()
    .text(ctx.t("settings.ai"), "AI Assistant");
}
