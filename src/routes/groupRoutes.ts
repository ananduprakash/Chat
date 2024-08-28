import express from 'express';
import { createGroup, sendGroupMessage } from '#controllers/groupController';

const router = express.Router();

// Create a new group
router.post('/', createGroup);

// Send a message to a group
router.post('/:groupId/messages', sendGroupMessage);

export default router;
