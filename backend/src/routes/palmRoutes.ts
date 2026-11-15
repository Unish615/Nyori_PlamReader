import { Router } from 'express';
import multer from 'multer';
import { PalmController } from '../controllers/palmController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WEBP image files are allowed.'));
    }
  }
});

export const palmRouter = Router();

palmRouter.post('/analyze', authenticate, upload.single('image'), PalmController.uploadAndAnalyze);
palmRouter.post('/upload', authenticate, upload.single('image'), PalmController.uploadAndAnalyze);
palmRouter.get('/history', authenticate, PalmController.getHistory);
palmRouter.get('/:id', authenticate, PalmController.getById);
palmRouter.delete('/:id', authenticate, PalmController.delete);
