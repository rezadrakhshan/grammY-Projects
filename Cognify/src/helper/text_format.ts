export function markdownToHtml(text: string): string {
  let html = text.replace(/```(?:\w+)?\n([\s\S]*?)```/g, (match, code) => {
    const safeCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre>${safeCode}</pre>`;
  });

  html = html.replace(/#{1,3}\s?([^\n]+)/g, "<b>$1</b>");

  html = html.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  return html;
}
