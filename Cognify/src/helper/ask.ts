import { openai } from "../index.js";
import { type MyContext } from "../index.js";

export async function askAI(msg: string, ctx: MyContext) {
  try {
    const completion = await openai.chat.completions.create({
      model: `${ctx.session.model}`,
      messages: [
        {
          role: "user",
          content: msg,
        },
      ],
    });

    if (completion)
      return (
        completion.choices[0]?.message.content ?? "^_____^ No Response ^_____^"
      );
  } catch (err) {
    console.error(err);
    return "🥲 AI Error!!";
  }
}
