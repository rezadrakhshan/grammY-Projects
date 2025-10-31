export interface Session {
  model?: string;
  history?: { role: string; content: string }[];
}

export function initial(): Session {
  return { model: "openai/gpt-4o-mini", history: [] };
}
