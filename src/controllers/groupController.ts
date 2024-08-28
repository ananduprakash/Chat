import { Request, Response } from 'express';
import { GroupModel } from '#models/groupModel';
import { MessageModel } from '#models/messageModel';

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, members } = req.body;

    // Create a new group
    const group = await GroupModel.create({ name, members });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Send a message to a group
export const sendGroupMessage = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { senderId, content } = req.body;

    // Create a new group message
    const message = await MessageModel.create({ senderId, groupId, content });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
