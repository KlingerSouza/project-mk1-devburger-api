import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';

const models = [User, Product, Category];

class Database {
    constructor() {
        this.initPostgres();
        this.initMongo();
    }

    initPostgres() {
        this.connection = new Sequelize(configDatabase);

        models.forEach((model) => model.init(this.connection));

        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }

    initMongo() {
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL || 'mongodb://localhost:27017/devburger'
        );
    }
}

export default new Database();
