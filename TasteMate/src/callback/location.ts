import { Composer } from "grammy";
import { MyContext } from "../index.js";

export const location = new Composer<MyContext>()

location.on("message:text", async (ctx) => {

})
