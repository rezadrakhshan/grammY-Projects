import { Composer } from "grammy";
import { type MyContext } from "../index.js";
import { start } from "./commands/start.js";
import { index } from "./group/index.js";

export const mainComposer = new Composer<MyContext>();

mainComposer.use(start);
mainComposer.use(index);
