import { Composer } from "grammy";
import { type MyContext } from "../index.js";
import { start } from "./commands/start.js";
import { index } from "./group/index.js";
import { welcome } from "./group/welcome.js";
import { info } from "./commands/info.js";
import { rules } from "./commands/rules.js";

export const mainComposer = new Composer<MyContext>();

mainComposer.use(start);
mainComposer.use(index);
mainComposer.use(welcome);
mainComposer.use(info);
mainComposer.use(rules);
