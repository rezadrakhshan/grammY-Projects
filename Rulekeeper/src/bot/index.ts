import { Composer } from "grammy";
import { type MyContext } from "../index.js";
import { start } from "./commands/start.js";
import { index } from "./group/index.js";
import { welcome } from "./group/welcome.js";

export const mainComposer = new Composer<MyContext>();

mainComposer.use(start);
mainComposer.use(index);
mainComposer.use(welcome);
