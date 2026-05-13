import { access, readFile } from 'fs/promises';

import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const FONT_CANDIDATES = [
  process.env.BUNAT_CERTIFICATE_FONT_PATH,
  '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
  '/Library/Fonts/Arial Unicode.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
  '/usr/share/fonts/truetype/noto/NotoNaskhArabic-Regular.ttf',
].filter(Boolean) as string[];

async function tryReadFont() {
  for (const candidate of FONT_CANDIDATES) {
    try {
      await access(candidate);
      return await readFile(candidate);
    } catch {
      continue;
    }
  }

  return null;
}

export async function buildCourseCertificatePdf(input: {
  learnerName: string;
  courseTitle: string;
  certificateNumber: string;
  completionDate: Date;
}) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const page = pdf.addPage([842, 595]);
  const backgroundColor = rgb(0.97, 0.98, 0.99);
  const accent = rgb(0.07, 0.34, 0.24);
  const muted = rgb(0.36, 0.41, 0.47);

  page.drawRectangle({
    x: 0,
    y: 0,
    width: 842,
    height: 595,
    color: backgroundColor,
  });

  page.drawRectangle({
    x: 28,
    y: 28,
    width: 786,
    height: 539,
    borderWidth: 2,
    borderColor: accent,
  });

  const fontBytes = await tryReadFont();
  const titleFont = fontBytes ? await pdf.embedFont(fontBytes) : await pdf.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = fontBytes ? titleFont : await pdf.embedFont(StandardFonts.Helvetica);

  const lines = [
    { text: 'Bunat Certificate of Completion', size: 28, y: 500, color: accent, font: titleFont },
    { text: 'شهادة إتمام دورة', size: 24, y: 462, color: accent, font: titleFont },
    { text: input.learnerName, size: 26, y: 398, color: rgb(0.1, 0.12, 0.15), font: titleFont },
    {
      text: 'has successfully completed the course',
      size: 15,
      y: 360,
      color: muted,
      font: bodyFont,
    },
    { text: input.courseTitle, size: 22, y: 320, color: rgb(0.1, 0.12, 0.15), font: titleFont },
    {
      text: `Completion Date: ${input.completionDate.toISOString().slice(0, 10)}`,
      size: 14,
      y: 256,
      color: muted,
      font: bodyFont,
    },
    {
      text: `Certificate No: ${input.certificateNumber}`,
      size: 14,
      y: 228,
      color: muted,
      font: bodyFont,
    },
    {
      text: 'Issued by Bunat Learning Platform',
      size: 15,
      y: 150,
      color: accent,
      font: bodyFont,
    },
  ];

  for (const line of lines) {
    const width = line.font.widthOfTextAtSize(line.text, line.size);
    page.drawText(line.text, {
      x: (842 - width) / 2,
      y: line.y,
      size: line.size,
      font: line.font,
      color: line.color,
    });
  }

  return Buffer.from(await pdf.save());
}
