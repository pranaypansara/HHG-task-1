import { Router } from 'express';
import { renderSharePage, getPublicImage } from '../controllers/cardController.js';

const router = Router();

// Public, shareable Builder Card page with Open Graph / Twitter metadata.
router.get('/card/:id', renderSharePage);

// Public generated card image (referenced by og:image / twitter:image).
router.get('/generated/:id.png', getPublicImage);

export default router;