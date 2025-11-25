import { client } from "../database/redis.js";

export async function calculateGroupLeaderBoard(groupID: number | string) {
  const pattern = `${groupID}#*`;
  const keys: string[] = [];
  let cursor: string = "0";

  do {
    const reply = await client.scan(cursor, {
      MATCH: pattern,
      COUNT: 200,
    });

    cursor = reply.cursor;
    keys.push(...reply.keys);
  } while (cursor !== "0");

  return keys;
}
