import { openai } from "../index.js";
import { type MyContext } from "../index.js";

export async function askAI(msg: string, ctx: MyContext) {
  try {
    if (ctx.session.history?.length ?? 0 > 10) {
      ctx.session.history = ctx.session.history?.slice(-10) as [];
    }
    ctx.session.history?.push({ role: "user", content: msg });
    const completion = await openai.chat.completions.create({
      model: `${ctx.session.model ?? "openai/gpt-4o-mini"}`,
      messages: ctx.session.history as [],
    });
    const answer =
      completion.choices[0]?.message.content ??
      "🤖 I didn’t get a valid answer. Please try again.";
    ctx.session.history?.push({ role: "assistant", content: answer });
    return answer;
  } catch (err) {
    console.error(err);
    return "❌ An unexpected error occurred. Please try again later.";
  }
}
