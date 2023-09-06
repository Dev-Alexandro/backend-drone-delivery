import * as express from 'express';
import { calcDelivery } from './../controllers/delivery.controller.js';
import { authBearerToken } from './../middleware/auth.middleware.js';

const router = express.Router();

router.get('/calcDelivery/:start_point/:pickup_point/:deliver_poind', authBearerToken, calcDelivery);

export default router;