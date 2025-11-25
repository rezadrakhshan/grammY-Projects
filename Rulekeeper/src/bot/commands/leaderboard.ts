import { Composer } from "grammy";
import { type MyContext } from "../../index.js";
import { isAdmin } from "../../guards/admin.js";
import { calculateGroupLeaderBoard } from "../../helper/key_pattern.js";
import { getAndSortLeaderBoardData } from "../../helper/leaderboard.js";

export const leaderboard = new Composer<MyContext>();

leaderboard.use(isAdmin);

leaderboard.command("leaderboard", async (ctx) => {
  const keys = await calculateGroupLeaderBoard(ctx.chat.id);
  const sorted = await getAndSortLeaderBoardData(keys, ctx);
  await ctx.reply(sorted, {
    reply_to_message_id: ctx.message?.message_id as number,
  });
});
