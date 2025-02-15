import { Router } from 'express';
import CreatePaymentIntentController from '../app/controllers/stripe/CreatePaymentIntentController';
import authMiddleware from '../app/middlewares/auth';

const router = new Router();

router.use(authMiddleware);

router.post('/create-payment-intent', CreatePaymentIntentController.store);

export default router;