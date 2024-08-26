import { Sequelize } from 'sequelize';
import { User } from './models/User';
import { Message } from './models/Message';
import { Group } from './models/Group';
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
