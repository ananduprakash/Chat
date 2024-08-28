import { Knex } from 'knex';
import { db } from '#db';  // Assume db is the configured Knex instance

export interface Group {
  id: string;
  name: string;
  members: string[];
  created_at?: Date;
  updated_at?: Date;
}

export class GroupModel {
  private static table = 'groups';

  // Create a new group
  static async create(group: Partial<Group>): Promise<Group> {
    const [newGroup] = await db(GroupModel.table).insert(group).returning('*');
    return newGroup;
  }

  // Add members to a group
  static async addMembers(groupId: string, members: string[]): Promise<Group> {
    // Assuming we store members as an array in a column
    const group = await GroupModel.findById(groupId);
    if (!group) throw new Error('Group not found');

    const updatedMembers = Array.from(new Set([...group.members, ...members])); // Ensuring unique members

    const [updatedGroup] = await db(GroupModel.table)
      .where({ id: groupId })
      .update({ members: updatedMembers })
      .returning('*');
    return updatedGroup;
  }

  // Find group by ID
  static async findById(id: string): Promise<Group | undefined> {
    return db(GroupModel.table).where({ id }).first();
  }
}
