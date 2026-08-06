import AppError from '../utils/AppError.js';

const REQUIRED_FIELDS = [
  'name',
  'builderTitle',
  'role',
  'status',
  'college',
];

const MAX_LENGTHS = {
  name: 60,
  builderTitle: 60,
  role: 80,
  status: 60,
  college: 80,
};

/**
 * Validates + trims the card form fields in req.body.
 * Assumes body values are strings (multer parses text fields as strings).
 */
export function validateCardFields(req, res, next) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    const value = req.body[field];
    if (value === undefined || value === null || String(value).trim() === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return next(new AppError(`Validation failed: ${errors.join(', ')}`, 400, 'VALIDATION_ERROR'));
  }

  for (const field of REQUIRED_FIELDS) {
    const value = String(req.body[field]).trim();
    if (value.length > MAX_LENGTHS[field]) {
      return next(
        new AppError(`${field} cannot exceed ${MAX_LENGTHS[field]} characters`, 400, 'VALIDATION_ERROR')
      );
    }
    req.body[field] = value;
  }

  next();
}
