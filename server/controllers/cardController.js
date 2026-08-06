import fs from 'fs';
import BuilderCard from '../models/BuilderCard.js';
import { generateBuilderCard } from '../services/cardBuilder.js';
import { removeTempFile } from '../middleware/upload.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';

const DOWNLOAD_FILENAME = 'HH-Goa-Builder-Card.png';

/**
 * Resolves the public base URL for generated links.
 * Prefers the BASE_URL env variable (dev http://localhost:5000,
 * production https://your-domain.com) and falls back to the request host.
 */
function baseUrl(req) {
  if (process.env.BASE_URL) {
    return String(process.env.BASE_URL).replace(/\/+$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  return `${proto}://${req.get('host')}`;
}

function buildSharePayload(req, card) {
  const base = baseUrl(req);
  return {
    success: true,
    cardId: card._id.toString(),
    publicId: card.publicId,
    imageUrl: `${base}/generated/${card.publicId}.png`,
    shareUrl: `${base}/card/${card.publicId}`,
  };
}

export const generate = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new AppError('A photo is required to generate a Builder Card', 400, 'MISSING_IMAGE'));
  }

  const { name, builderTitle, role, status, college } = req.body;

  try {
    const { outputPath, publicId } = await generateBuilderCard({
      photoPath: file.path,
      name,
      builderTitle,
      role,
      status,
      college,
    });

    const card = await BuilderCard.create({
      name,
      builderTitle,
      role,
      status,
      college,
      generatedImagePath: outputPath,
      publicId,
    });

    res.status(201).json(buildSharePayload(req, card));
  } catch (error) {
    if (error instanceof AppError) return next(error);
    console.error('Builder Card generation failed:', error);
    return next(new AppError('Failed to generate the Builder Card', 500, 'GENERATION_ERROR'));
  } finally {
    // The uploaded photo was only needed temporarily.
    removeTempFile(file);
  }
});

export const getById = asyncHandler(async (req, res, next) => {
  const card = await BuilderCard.findOne({ publicId: req.params.id });
  if (!card) {
    return next(new AppError('Builder Card not found', 404, 'NOT_FOUND'));
  }
  res.status(200).json({
    success: true,
    card: {
      id: card.publicId,
      name: card.name,
      builderTitle: card.builderTitle,
      role: card.role,
      status: card.status,
      college: card.college,
      createdAt: card.createdAt,
    },
    imageUrl: `${baseUrl(req)}/generated/${card.publicId}.png`,
    shareUrl: `${baseUrl(req)}/card/${card.publicId}`,
  });
});

function streamImage(card, res) {
  if (!fs.existsSync(card.generatedImagePath)) {
    throw new AppError('Builder Card image is missing on server', 404, 'NOT_FOUND');
  }
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  return fs.createReadStream(card.generatedImagePath).pipe(res);
}

export const getImage = asyncHandler(async (req, res, next) => {
  const card = await BuilderCard.findOne({ publicId: req.params.id });
  if (!card) {
    return next(new AppError('Builder Card not found', 404, 'NOT_FOUND'));
  }
  streamImage(card, res);
});

// Public route: /generated/:id.png  (used by og:image / twitter:image)
export const getPublicImage = asyncHandler(async (req, res, next) => {
  const card = await BuilderCard.findOne({ publicId: req.params.id });
  if (!card) {
    return next(new AppError('Builder Card not found', 404, 'NOT_FOUND'));
  }
  streamImage(card, res);
});

export const renderSharePage = asyncHandler(async (req, res, next) => {
  const card = await BuilderCard.findOne({ publicId: req.params.id });
  if (!card) {
    return next(new AppError('Builder Card not found', 404, 'NOT_FOUND'));
  }

  const base = baseUrl(req);
  const imageUrl = `${base}/generated/${card.publicId}.png`;
  const pageUrl = `${base}/card/${card.publicId}`;
  const title = `HH Goa 2026 Builder Card — ${escapeHtml(card.name)}`;
  const description = `Just built my HH Goa 2026 Builder Card 🚀 #FrameInGoa #HHGoa2026`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>

    <meta name="description" content="${description}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1440" />
    <meta property="og:image:height" content="2080" />

    <!-- X / Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />

    <style>
      body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 24px; background: #03150d; color: #f3f4f6; font-family: 'Inter', Arial, sans-serif; padding: 32px; box-sizing: border-box; }
      img { width: 360px; max-width: 90vw; border-radius: 6px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6); }
      .badge { font-family: monospace; font-size: 11px; letter-spacing: 0.25em; color: #fcd34d; text-transform: uppercase; font-weight: 700; }
      a { color: #10b981; font-weight: 600; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="badge">HH GOA 2026</div>
    <img src="${imageUrl}" alt="HH Goa 2026 Builder Card" />
    <a href="${base}">Create your own Builder Card →</a>
  </body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const download = asyncHandler(async (req, res, next) => {
  const card = await BuilderCard.findOne({ publicId: req.params.id });
  if (!card) {
    return next(new AppError('Builder Card not found', 404, 'NOT_FOUND'));
  }
  if (!fs.existsSync(card.generatedImagePath)) {
    return next(new AppError('Builder Card image is missing on server', 404, 'NOT_FOUND'));
  }
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', `attachment; filename="${DOWNLOAD_FILENAME}"`);
  fs.createReadStream(card.generatedImagePath).pipe(res);
});