import { openai } from "../index.js";

export async function askAI(msg: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
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
  } catch {
    return "🥲 AI Error!!";
  }
}
