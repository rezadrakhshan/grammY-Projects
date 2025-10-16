import { Composer } from "grammy";
import { MyContext } from "../index.js";
import { isAdminMiddleWare } from "../middleware/admin.js";

export const foodAdmin = new Composer<MyContext>();

foodAdmin.use(isAdminMiddleWare);
