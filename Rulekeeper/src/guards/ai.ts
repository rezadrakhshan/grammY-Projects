import { type MyContext } from "../index.js";
import { Group } from "../database/models/group.js";
import { groq } from "../ai/ai.js";

export async function aiGuard(ctx: MyContext) {
  const group = await Group.findOne({ chatID: ctx.chat?.id }).select("rules");
  if (!group?.rules) return;

  const systemPrompt = `
You are a rule-checking engine for a Telegram group.
Your only task is to analyze the user's message and check if it violates any of the group rules listed below.

Group Rules:
${group.rules}

Instructions:
- If the message violates ANY rule, answer: False
- If message obeys ALL rules, answer: True
- No explanations.
- Output must be exactly either True or False.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: ctx.message?.text ?? "" },
    ],
  });

  const result = completion.choices[0]?.message.content;
  if (result === "False") {
    await ctx.deleteMessage();
  }
}
