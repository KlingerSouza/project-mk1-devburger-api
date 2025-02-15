import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import ProductController from '../app/controllers/ProductController';
import authMiddleware from '../app/middlewares/auth';

const router = new Router();
const uploadFile = multer(multerConfig).single('file');

router.use(authMiddleware);

router.post('/products', uploadFile, ProductController.store);
router.get('/products', ProductController.index);
router.put('/products/:id', uploadFile, ProductController.update);

export default router;
