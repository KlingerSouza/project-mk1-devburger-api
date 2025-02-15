import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import CategoryController from '../app/controllers/CategoryController';
import authMiddleware from '../app/middlewares/auth';

const router = new Router();
const uploadFile = multer(multerConfig).single('file');

router.use(authMiddleware);

router.post('/categories', uploadFile, CategoryController.store);
router.get('/categories', CategoryController.index);
router.put('/categories/:id', uploadFile, CategoryController.update);

export default router;
