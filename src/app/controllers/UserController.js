import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        // 🔍 Validação dos dados do usuário antes de criar a conta
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
                .email('Provide a valid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .matches(
                    /[a-zA-Z]/,
                    'Password must contain at least one letter'
                )
                .matches(
                    /\d/,
                    'Password must contain at least one number'
                )
                .matches(
                    /[!@#$%^&*(),.?":{}|<>]/,
                    'Password must contain at least one special character'
                )
                .required('Password is required'),
            admin: Yup.boolean().default(false), // Se não enviado, assume `false`
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name, email, password, admin = false } = req.body;

        // 🔍 Verifica se já existe um usuário com este e-mail
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // ✅ Criando usuário no banco (Sequelize já gera `id`)
        const user = await User.create({ name, email, password, admin });

        // Não retornando a senha
        user.password = undefined;

        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        });
    }
}

export default new UserController();
