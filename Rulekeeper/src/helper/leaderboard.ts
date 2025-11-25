import { client } from "../database/redis.js";
import { type MyContext } from "../index.js";

export async function getAndSortLeaderBoardData(
  keys: string[],
  ctx: MyContext,
) {
  const data = await Promise.all(
    keys.map(async (key) => {
      const userData = await client.get(key);
      return userData ? JSON.parse(userData) : null;
    }),
  );

  const filtered = data.filter(Boolean);

  filtered.sort((a, b) => b.count - a.count);

  const lines: string[] = [];
  lines.push(ctx.t("leaderboard.header"));
  lines.push("");
  lines.push("");

  for (const item of filtered) {
    lines.push(
      `@${item.username} -- ${item.count} ${ctx.t("leaderboard.message")}`,
    );
  }

  lines.push("");
  lines.push("");

  lines.push(ctx.t("leaderboard.footer"));

  const result = lines.join("\n");
  return result;
}
