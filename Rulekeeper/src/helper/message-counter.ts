import { type MyContext } from "../index.js";
import { client } from "../database/redis.js";

export async function messageCounter(ctx: MyContext) {
  const group = ctx.chat?.id;
  const user = ctx.from?.id;
  const key = `${group}#${user}`;
  const data = await client.get(key);
  if (!data) {
    const formatData = {
      username: ctx.from?.username,
      count: 1,
    };
    await client.set(key, JSON.stringify(formatData));
  } else {
    const parsed = JSON.parse(data);
    parsed.count += 1;
    await client.set(key, JSON.stringify(parsed));
  }
}
