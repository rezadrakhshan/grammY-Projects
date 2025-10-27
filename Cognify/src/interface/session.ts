export interface Session {
  model?: string;
}

export function initial(): Session {
  return { model: "" };
}
