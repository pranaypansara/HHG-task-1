import sharp from 'sharp';
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Final generated cards are stored here.
export const OUTPUT_DIR = path.join(__dirname, '..', 'uploads', 'cards');

// Card dimensions (matches the frontend BuilderCard design: 360 x 520).
export const CARD_WIDTH = 360;
export const CARD_HEIGHT = 520;

// High-resolution output scale (1440 x 2080 px), ideal for social media.
export const SCALE = 4;

// Photo container area inside the card (matches the design).
const PHOTO = { x: 19, y: 47, width: 322, height: 210, radius: 16 };
const PHOTO_OUTPUT_WIDTH = PHOTO.width * SCALE; // 1288
const PHOTO_OUTPUT_HEIGHT = PHOTO.height * SCALE; // 840

const COLORS = {
  yellow: '#fcd34d',
  yellowSoft: 'rgba(252, 211, 77, 0.30)',
  yellowDim: 'rgba(252, 211, 77, 0.20)',
  yellowLabel: 'rgba(252, 211, 77, 0.70)',
  cardBg: '#052b1b',
  photoBg: 'rgba(4, 34, 22, 0.30)',
  white: '#ffffff',
};

// Font stacks: brand fonts first, universal fallbacks after (librsvg uses
// system-installed fonts, so fallbacks guarantee legible rendering anywhere).
const FONT_SERIF = "'Playfair Display', 'Georgia', 'Times New Roman', serif";
const FONT_MONO = "'Space Mono', 'Courier New', monospace";

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function escapeXml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function truncate(text, max) {
  const cleaned = String(text).trim();
  return cleaned.length > max ? `${cleaned.slice(0, max - 1)}…` : cleaned;
}

function centeredPill(text, centerY) {
  const fontSize = 9;
  const letterSpacing = fontSize * 0.18; // 0.18em
  const paddingX = 20;
  const width = text.length * (fontSize * 0.62 + letterSpacing) + paddingX;
  const height = 18;
  const x = CARD_WIDTH / 2 - width / 2;
  const y = centerY - height / 2;
  return `
    <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width.toFixed(1)}" height="${height}" rx="${height / 2}" fill="rgba(252,211,77,0.05)" stroke="${COLORS.yellow}" stroke-width="1"/>
    <text x="${CARD_WIDTH / 2}" y="${(centerY + fontSize * 0.35).toFixed(1)}" text-anchor="middle" font-family="${FONT_MONO}" font-size="${fontSize}" font-weight="bold" fill="${COLORS.yellow}" letter-spacing="${letterSpacing.toFixed(2)}">${text}</text>`;
}

function fieldRow(label, value, lineY) {
  const labelSize = 8.5;
  const valueSize = 11;
  const labelX = 19 + 24; // pl-6 (24px)
  return `
    <line x1="19" y1="${lineY}" x2="${CARD_WIDTH - 19}" y2="${lineY}" stroke="${COLORS.yellowDim}" stroke-width="1"/>
    <text x="${labelX}" y="${(lineY + 10).toFixed(1)}" font-family="${FONT_MONO}" font-size="${labelSize}" font-weight="bold" fill="${COLORS.yellowLabel}" letter-spacing="${(labelSize * 0.2).toFixed(2)}">${label}</text>
    <text x="${labelX}" y="${(lineY + 27).toFixed(1)}" font-family="${FONT_MONO}" font-size="${valueSize}" font-weight="bold" fill="${COLORS.white}" letter-spacing="${(valueSize * 0.1).toFixed(2)}">${escapeXml(value)}</text>`;
}

function buildCardSvg({ name, builderTitle, role, status, college, photoDataUrl }) {
  const displayName = escapeXml(truncate(name, 18).toUpperCase());
  const displayTitle = truncate(builderTitle, 22).toUpperCase();
  const displayRole = escapeXml(truncate(role, 30).toUpperCase());
  const displayStatus = escapeXml(truncate(status, 30).toUpperCase());
  const displayCollege = escapeXml(truncate(college, 32).toUpperCase());

  const headerY = 34;
  const nameY = 302;
  const pillY = 324;
  const fieldsStart = 356;
  const footerY = 494;

  const photoClip = `photoClip`;
  const { x: px, y: py, width: pw, height: ph, radius: pr } = PHOTO;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH * SCALE}" height="${CARD_HEIGHT * SCALE}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <defs>
    <clipPath id="${photoClip}">
      <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${pr}"/>
    </clipPath>
  </defs>

  <!-- Outer card surface + gold border -->
  <rect x="0" y="0" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="2" fill="${COLORS.cardBg}"/>
  <rect x="0" y="0" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="2" fill="none" stroke="${COLORS.yellow}" stroke-width="3"/>

  <!-- Inner thin gold border -->
  <rect x="3" y="3" width="${CARD_WIDTH - 6}" height="${CARD_HEIGHT - 6}" rx="6" fill="none" stroke="${COLORS.yellowSoft}" stroke-width="1"/>

  <!-- Header -->
  <text x="${CARD_WIDTH / 2}" y="${headerY}" text-anchor="middle" font-family="${FONT_MONO}" font-size="10" font-weight="bold" fill="${COLORS.yellow}" letter-spacing="2.5">HH GOA 2026</text>

  <!-- Photo -->
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${pr}" fill="${COLORS.photoBg}" stroke="${COLORS.yellowSoft}" stroke-width="1"/>
  <g clip-path="url(#${photoClip})">
    <image x="${px}" y="${py}" width="${pw}" height="${ph}" preserveAspectRatio="xMidYMid slice" href="${photoDataUrl}"/>
  </g>

  <!-- Name -->
  <text x="${CARD_WIDTH / 2}" y="${nameY}" text-anchor="middle" font-family="${FONT_SERIF}" font-size="24" font-weight="bold" fill="${COLORS.yellow}" letter-spacing="0.5">${displayName}</text>

  <!-- Builder Title Pill -->
  ${centeredPill(displayTitle, pillY)}

  <!-- Fields -->
  ${fieldRow('ROLE / TECH STACK', displayRole, fieldsStart)}
  ${fieldRow('STATUS', displayStatus, fieldsStart + 34)}
  ${fieldRow('COLLEGE / COMPANY', displayCollege, fieldsStart + 68)}
  <line x1="19" y1="${fieldsStart + 102}" x2="${CARD_WIDTH - 19}" y2="${fieldsStart + 102}" stroke="${COLORS.yellowDim}" stroke-width="1"/>

  <!-- Footer -->
  <text x="19" y="${footerY}" font-family="${FONT_MONO}" font-size="9" font-weight="bold" fill="${COLORS.yellow}" letter-spacing="0.9">#FRAMEINGOA</text>
  <text x="${CARD_WIDTH - 19}" y="${footerY}" text-anchor="end" font-family="${FONT_MONO}" font-size="9" font-weight="bold" fill="${COLORS.yellow}" letter-spacing="0.9">GOA • OCT 2026</text>
</svg>`;
}

/**
 * Generates a Builder Card PNG entirely server-side using Sharp.
 *
 * @param {object} params
 * @param {string} params.photoPath - path to the (temporary) uploaded photo
 * @param {string} params.name
 * @param {string} params.builderTitle
 * @param {string} params.role
 * @param {string} params.status
 * @param {string} params.college
 * @returns {Promise<{ outputPath: string, publicId: string }>}
 */
export async function generateBuilderCard({ photoPath, name, builderTitle, role, status, college }) {
  // Pre-process the photo: cover-crop to the photo area at output resolution so
  // it stays sharp when the SVG is rasterized at 4x.
  const photoBuffer = await sharp(photoPath)
    .resize(PHOTO_OUTPUT_WIDTH, PHOTO_OUTPUT_HEIGHT, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const photoDataUrl = `data:image/png;base64,${photoBuffer.toString('base64')}`;

  const svg = buildCardSvg({ name, builderTitle, role, status, college, photoDataUrl });

  const publicId = randomUUID();
  const outputFilename = `${publicId}.png`;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return { outputPath, outputFilename, publicId };
}
