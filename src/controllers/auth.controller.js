import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


config();
const secretKey = process.env.password;

function auth(req, res) {
    const { username, password } = req.body;


    if (username === 'admin' && password === secretKey) {

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {

        res.status(401).json({ error: 'Inválid Credentials' });
    }
}

export { auth };