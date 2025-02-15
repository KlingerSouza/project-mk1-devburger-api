import { Router } from 'express';
import OrderController from '../app/controllers/OrderController';
import authMiddleware from '../app/middlewares/auth';

const router = new Router();

router.use(authMiddleware);

router.post('/orders', OrderController.store);
router.get('/orders', OrderController.index);
router.put('/orders/:id', OrderController.update);

export default router;