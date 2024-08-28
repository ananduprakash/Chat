import { Request, Response } from 'express';
import { MessageModel } from '#models/messageModel';

// Send a new message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, groupId, content } = req.body;

    // Create a new message
    const message = await MessageModel.create({ senderId, receiverId, groupId, content });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get message history
export const getMessageHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const withUserId = req.query.withUserId as string | undefined;
    const groupId = req.query.groupId as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    // Retrieve message history
    const messages = await MessageModel.findHistory({ userId, withUserId, groupId, page, pageSize });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
