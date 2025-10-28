import { openai } from "../index.js";
import { type MyContext } from "../index.js";

export async function askAI(msg: string, ctx: MyContext) {
  try {
    const completion = await openai.chat.completions.create({
      model: `${ctx.session.model ?? "openai/gpt-4o-mini"}`,
      messages: [
        {
          role: "user",
          content: msg,
        },
      ],
    });

    if (completion)
      return (
        completion.choices[0]?.message.content ??
        "🤖 I didn’t get a valid answer. Please try again."
      );
  } catch (err) {
    console.error(err);
    return "❌ An unexpected error occurred. Please try again later.";
  }
}
