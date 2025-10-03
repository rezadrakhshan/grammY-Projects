import { MyContext } from '../bot.js';
import { Task } from '../models/task.js';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import { InputFile } from 'grammy';
import path from 'path';
import { __dirname } from '../bot.js';

export async function generateReports(ctx: MyContext) {
  const tasks = (await Task.find({ userID: ctx.from?.id })) || [];

  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const stream = new PassThrough();
  const chunks: Buffer[] = [];

  doc.pipe(stream);

  doc.registerFont('vazir',path.join(__dirname, "../src/public/Vazir.ttf"))

  doc
    .fillColor('#2E86C1')
    .fontSize(28)
    .font('vazir')
    .text(ctx.t('pdf.header'), { align: 'center', underline: true })
    .moveDown(1);

  const headers = [
    ctx.t('pdf.title'),
    ctx.t('pdf.description'),
    ctx.t('pdf.due'),
    ctx.t('pdf.status'),
  ];
  const columnWidths = [120, 200, 80, 80];

  const tableStartX = doc.x;
  let y = doc.y;

  function drawTableHeader() {
    let x = tableStartX;
    doc.fontSize(12).font('vazir').fillColor('#1B4F72');
    headers.forEach((header, i) => {
      doc.rect(x, y, columnWidths[i], 24).fillAndStroke('#D6EAF8', '#AED6F1');
      doc.fillColor('#1B4F72').text(header, x + 6, y + 6, {
        width: columnWidths[i] - 12,
        align: 'left',
      });
      x += columnWidths[i];
    });
    y += 24;
    doc.font('vazir').fontSize(11);
  }

  drawTableHeader();

  for (const [rowIdx, task] of tasks.entries()) {
    const title = task.title ?? '';
    const description = task.description ?? '';
    const due = task.due ? new Date(task.due).toLocaleDateString() : '';
    const status = task.isDone ? ctx.t('pdf.done') : ctx.t('pdf.notDone');
    const row = [title, description, due, status];

    const cellHeights = row.map((cell, i) =>
      doc.heightOfString(String(cell), { width: columnWidths[i] - 12 }),
    );
    const rowHeight = Math.max(22, ...cellHeights) + 8;

    const bottomLimit = doc.page.height - doc.page.margins.bottom;
    if (y + rowHeight > bottomLimit) {
      doc.addPage();
      y = doc.y;
      drawTableHeader();
    }

    let x = tableStartX;
    const rowBg = rowIdx % 2 === 0 ? '#F4F6F7' : '#FFFFFF';

    row.forEach((cell, i) => {
      doc.rect(x, y, columnWidths[i], rowHeight).fill(rowBg);
      doc.fillColor('#212F3C').text(String(cell), x + 6, y + 5, {
        width: columnWidths[i] - 12,
        align: 'left',
      });
      x += columnWidths[i];
    });

    y += rowHeight;
    doc.y = y;
  }

  doc
    .moveDown(2)
    .fontSize(10)
    .fillColor('#555')
    .font('vazir')
    .text(ctx.t('pdf.footer'), { align: 'center' });

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      await ctx.replyWithDocument(new InputFile(buffer, 'tasks-report.pdf'));
      resolve();
    });
    stream.on('error', reject);
  });
}
