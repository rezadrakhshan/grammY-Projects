export interface SessionData {
  __language_code?: string;
  __task?: {
    title: string;
    description?: string;
  };
  __reminder: {
    taskID: string;
    date: string;
  };
  __step?: string;
}
