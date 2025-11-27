import { Composer } from "grammy";
import { type MyContext } from "../index.js";
import { start } from "./commands/start.js";
import { index } from "./group/index.js";
import { welcome } from "./group/welcome.js";
import { info } from "./commands/info.js";
import { rules } from "./commands/rules.js";
import { filter } from "./commands/filter.js";
import { message } from "./group/message.js";
import { warning } from "./commands/warning.js";
import { punish } from "./commands/punish.js";
import { leaderboard } from "./commands/leaderboard.js";
import { ai } from "./commands/ai.js";

export const mainComposer = new Composer<MyContext>();

mainComposer.use(start);
mainComposer.use(index);
mainComposer.use(welcome);
mainComposer.use(info);
mainComposer.use(rules);
mainComposer.use(filter);
mainComposer.use(warning);
mainComposer.use(punish);
mainComposer.use(leaderboard);
mainComposer.use(ai);
mainComposer.use(message);
