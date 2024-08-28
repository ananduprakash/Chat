import express from 'express';
import { sendMessage, getMessageHistory } from '#controllers/messageController';

const router = express.Router();

// Send a new message
router.post('/', sendMessage);

// Get message history
router.get('/history', getMessageHistory);

export default router;
