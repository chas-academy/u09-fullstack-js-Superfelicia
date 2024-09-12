import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router = Router();

// POST & GET /api/users
router.post('/users', createUser);
router.get('/users', getUsers);

export default router;
