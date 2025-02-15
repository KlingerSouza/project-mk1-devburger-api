import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        // 🔍 Validação do corpo da requisição
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { email, password } = req.body;

        // 🔍 Busca o usuário pelo e-mail
        const user = await User.findOne({ where: { email } });

        // ❌ Se o usuário não existir ou a senha estiver errada, retorna erro
        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos!' });
        }

        // 🔥 Geração do token JWT
        const token = jwt.sign(
            { id: user.id, name: user.name, admin: user.admin }, // ✅ Incluindo `admin`
            authConfig.secret,
            { expiresIn: authConfig.expiresIn }
        );

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token,
        });
    }
}

export default new SessionController();
