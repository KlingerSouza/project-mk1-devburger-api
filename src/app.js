import express from 'express';
import routes from './routes/index';
import { resolve } from 'node:path';
import cors from 'cors';
import './database';

class App {
    constructor() {
        this.app = express();

        this.configCors();
        this.middlewares();
        this.routes();
    }

    configCors() {
        this.app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(
            '/product-file', 
            express.static(resolve(__dirname, '..', 'uploads', 'products'))
        );

        this.app.use(
            '/category-file', 
            express.static(resolve(__dirname, '..', 'uploads', 'categories'))
        );
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
