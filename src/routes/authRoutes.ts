import express from 'express';
import { register, login } from '#controllers/authController';

const router = express.Router();

// Register a new user
router.post('/register', register);

// User login
router.post('/login', login);

export default router;
