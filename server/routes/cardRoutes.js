import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { validateCardFields } from '../middleware/validate.js';
import * as cardController from '../controllers/cardController.js';

const router = Router();

// Uploads are handled by multer, then validated before generation.
router.post('/generate', upload.single('image'), validateCardFields, cardController.generate);

router.get('/:id', cardController.getById);
router.get('/image/:id', cardController.getImage);
router.get('/download/:id', cardController.download);

export default router;