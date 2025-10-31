import type { Session } from "../interface/session.js";

export function initial(): Session {
  return { __language_code: "en" };
}
