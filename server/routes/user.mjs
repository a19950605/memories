import express from 'express';
import { changePw } from '../controllers/user.mjs';

import { login, register } from '../controllers/user.mjs';
const router = express.Router();

router.post('/register', register);
router.post('/signin', login);
router.put('/changePw', changePw);

export default router;
