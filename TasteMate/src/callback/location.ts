import { Composer } from "grammy";
import { MyContext } from "../index.js";
import { Address } from "../models/address.js";

export const location = new Composer<MyContext>();

location.on("message:text", async (ctx) => {
  if (ctx.session.__step === "add_location") {
    const address = new Address({
      userID: ctx.from.id,
      address: ctx.message.text,
    });
    await address.save();
    await ctx.reply(ctx.t("location.success"));
  }
});

location.callbackQuery("location", async (ctx) => {
  await ctx.answerCallbackQuery();
  ctx.session.__step = "add_location";
  await ctx.reply(ctx.t("location.text"));
});
