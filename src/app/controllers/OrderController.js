import * as Yup from 'yup';
import Order from '../schemas/Order';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class OrderController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const products = req.body.products.map(product => ({
            id: Number(product.id),
            quantity: Number(product.quantity),
        }));

        const productsIds = products.map((product) => product.id);

        const findProducts = await Product.findAll({
            where: {
                id: productsIds,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        });

        if (findProducts.length !== products.length) {
            return res.status(400).json({ error: 'Some products were not found!' });
        }

        const formattedProducts = findProducts.map(product => {
            const productIndex = products.findIndex((item) => item.id === product.id);

            return {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: Number(products[productIndex].quantity),
            };
        });

        console.log("Produtos formatados antes de salvar:", formattedProducts);

        const order = {
            user: {
                id: req.userId,
                name: req.userName,
            },
            products: formattedProducts,
            status: 'pedido realizado!',
        };

        try {
            const createdOrder = await Order.create(order);
            return res.status(201).json(createdOrder);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create order.' });
        }
    }

    async index(req, res) {
        try {
            const orders = await Order.find();
            return res.json(orders);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch orders.' });
        }
    }

    async update(req, res) {
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const user = await User.findByPk(req.userId);
        if (!user || !user.admin) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const { status } = req.body;

        const orderExists = await Order.findById(id);
        if (!orderExists) {
            return res.status(404).json({ error: 'Order not found!' });
        }

        try {
            await Order.updateOne({ _id: id }, { status });
            return res.json({ message: 'Status updated successfully!' });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to update order status.' });
        }
    }
}

export default new OrderController();
