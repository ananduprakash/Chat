import { Knex } from 'knex';
import { db } from '#db';  // Assume db is the configured Knex instance

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export class MessageModel {
  private static table = 'messages';

  // Create a new message
  static async create(message: Partial<Message>): Promise<Message> {
    const [newMessage] = await db(MessageModel.table).insert(message).returning('*');
    return newMessage;
  }

  // Retrieve message history
  static async findHistory({
    userId,
    withUserId,
    groupId,
    page = 1,
    pageSize = 10
  }: {
    userId: string;
    withUserId?: string;
    groupId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Message[]> {
    const query = db(MessageModel.table)
      .where((builder) => {
        if (groupId) {
          builder.where({ groupId });
        } else {
          builder.where({ senderId: userId }).orWhere({ receiverId: userId });
          if (withUserId) {
            builder.andWhere((q) =>
              q.where({ senderId: withUserId }).orWhere({ receiverId: withUserId })
            );
          }
        }
      })
      .orderBy('created_at', 'desc')
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return query;
  }
}
