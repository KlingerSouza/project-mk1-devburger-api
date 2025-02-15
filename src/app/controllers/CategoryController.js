import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
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

        const path = req.file ? req.file.filename : null;
        const { name } = req.body;

        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists) {
            return res.status(400).json({ error: 'Category already exists!' });
        }

        const { id } = await Category.create({ name, path });

        return res.status(201).json({ id, name, path });
    }

    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
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
        const categoryExists = await Category.findByPk(id);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Make sure your category ID is correct!' });
        }

        const path = req.file ? req.file.filename : categoryExists.path;
        const { name } = req.body;

        if (name) {
            const categoryNameExists = await Category.findOne({ where: { name } });

            if (categoryNameExists && categoryNameExists.id !== Number(id)) {
                return res.status(400).json({ error: 'Category already exists!' });
            }
        }

        await Category.update({ name, path }, { where: { id } });

        return res.status(200).json();
    }

    async index(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

export default new CategoryController();
