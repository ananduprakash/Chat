import { Knex } from 'knex';
import { db } from '#db';  // Assume db is the configured Knex instance

export interface User {
  id: string;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel {
  private static table = 'users';

  // Find user by username
  static async findOne(criteria: Partial<User>): Promise<User | undefined> {
    return db(UserModel.table).where(criteria).first();
  }

  // Create a new user
  static async create(user: Partial<User>): Promise<User> {
    const [newUser] = await db(UserModel.table).insert(user).returning('*');
    return newUser;
  }

  // Update user data
  static async update(id: string, data: Partial<User>): Promise<User> {
    const [updatedUser] = await db(UserModel.table)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedUser;
  }
}
