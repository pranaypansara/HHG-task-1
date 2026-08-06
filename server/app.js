import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cardRoutes from './routes/cardRoutes.js';
import shareRoutes from './routes/shareRoutes.js';
import AppError from './utils/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (order matters: fixed paths before parameterized paths).
app.use('/api/cards', cardRoutes);
app.use('/', shareRoutes);

// Serve generated cards statically as well.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'HH Goa Builder Card Server is running' });
});

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ success: false, error: err.message, code: err.code });
  }

  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(400)
      .json({ success: false, error: 'Image exceeds 5MB size limit', code: 'FILE_TOO_LARGE' });
  }

  if (err && err.code === 'INVALID_FILE_TYPE') {
    return res
      .status(400)
      .json({ success: false, error: err.message, code: 'INVALID_FILE_TYPE' });
  }

  // Respect a status set by middleware (e.g. multer file-filter rejections).
  if (typeof err.status === 'number' && err.status >= 400 && err.status < 500) {
    return res
      .status(err.status)
      .json({ success: false, error: err.message || 'Bad request', code: err.code || 'BAD_REQUEST' });
  }

  if (err && err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ success: false, error: `Validation failed: ${messages.join(', ')}`, code: 'VALIDATION_ERROR' });
  }

  if (err && err.code === 11000) {
    return res
      .status(409)
      .json({ success: false, error: 'A card with that identifier already exists', code: 'DUPLICATE_KEY' });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error', code: 'INTERNAL_ERROR' });
});

export default app;