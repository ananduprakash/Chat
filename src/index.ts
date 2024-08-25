import { Sequelize } from 'sequelize';
import { User } from './models/user';
import { Message } from './models/message';
import { Group } from './models/group';
import { sequelize } from './config/database';

// Set up associations
User.associate({ Message, Group });
Message.associate({ User, Group });
Group.associate({ User, Message });

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
