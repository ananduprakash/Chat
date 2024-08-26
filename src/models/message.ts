import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
// import { User } from './User';
// import { Group } from './Group';

interface MessageAttributes {
  id: number;
  senderId: number;
  receiverId?: number;
  groupId?: number;
  content: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public senderId!: number;
  public receiverId?: number;
  public groupId?: number;
  public content!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Message.belongsTo(models.User, { foreignKey: 'senderId' });
    Message.belongsTo(models.Group, { foreignKey: 'groupId' });
  }
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER
  },
  groupId: {
    type: DataTypes.INTEGER
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'messages'
});
