import { auth } from './../src/controllers/auth.controller.js';
import jwt from 'jsonwebtoken';


describe('Tests to  function auth', () => {
      
    it('It is have return a token JWT valid for user admin with credentials correct', () => {
        const req = {
            body: {
                username: 'admin',
                password: 'password@123', // Substitua pela senha correta
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Simule a função jwt.sign para retornar um token fictício
        const jwtSignMock = jest.spyOn(jwt, 'sign');
        jwtSignMock.mockReturnValue('fake_token');

        auth(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: 'fake_token' });
        expect(jwtSignMock).toHaveBeenCalledWith({ username: 'admin' }, 'password@123', { expiresIn: '1h' });
    });

      
    it('It is have return a startus 401 for credentials invalid', () => {
        const req = {
            body: {
                username: 'unknown_user', // Usuário inválido
                password: 'unknown_password', // Senha incorreta
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        auth(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Inválid Credentials' });
    });
});