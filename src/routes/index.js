import { Router } from 'express';

import userRoutes from './user.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import orderRoutes from './order.routes';
import paymentRoutes from './payment.routes';

const routes = new Router();

routes.use(userRoutes);
routes.use(productRoutes);
routes.use(categoryRoutes);
routes.use(orderRoutes);
routes.use(paymentRoutes);

export default routes;