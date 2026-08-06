import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads are stored temporarily and deleted after the card has been generated.
export const TMP_DIR = path.join(__dirname, '..', 'uploads', 'tmp');

// 5MB maximum upload size (matches the frontend limit).
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIMETYPES = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

// Ensure the temporary upload directory exists.
fs.mkdirSync(TMP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    const ext = ALLOWED_MIMETYPES.get(file.mimetype) || path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `tmp-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIMETYPES.has(file.mimetype)) {
    cb(null, true);
    return;
  }
  const error = new Error('Invalid image format. Only JPG, PNG and WEBP are allowed.');
  error.status = 400;
  error.code = 'INVALID_FILE_TYPE';
  cb(error, false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

// Helper to remove a temporarily stored upload.
export function removeTempFile(file) {
  if (!file || !file.path) return;
  fs.unlink(file.path, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Failed to remove temp upload:', err);
    }
  });
}