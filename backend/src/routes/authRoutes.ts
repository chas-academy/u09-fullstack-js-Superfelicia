import express from 'express';
import { login, registerUserController } from '../controllers/AuthController';

const router = express.Router();

router.post('/login', login);
router.post('/user', registerUserController)

export default router;
