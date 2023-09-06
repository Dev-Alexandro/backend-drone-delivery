import * as express from 'express';
import { auth } from './../controllers/auth.controller.js';

const router = express.Router();

router.post('/auth', auth);

export default router;