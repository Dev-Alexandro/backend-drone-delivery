import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretKey = process.env.password;

function authBearerToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }


    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token de autenticação inválido' });
        }

        req.user = user;
        next();
    });
}

export { authBearerToken };
