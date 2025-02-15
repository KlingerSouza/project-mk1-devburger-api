import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddleware(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: 'Token not provided!' });
    }

    const token = authToken.split(' ')[1]; // Melhor clareza aqui

    // Verificando e decodificando o token JWT
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token is invalid!' });
        }

        // Atribuindo os dados do usuário ao objeto req para acessá-los nas rotas
        req.userId = decoded.id;
        req.userName = decoded.name;
        req.userAdmin = decoded.admin; // Caso precise do campo admin

        return next(); // Permite que a requisição continue
    });
}

export default authMiddleware;
