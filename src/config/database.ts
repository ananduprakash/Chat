import { Sequelize } from 'sequelize';

// Fetch database configuration from environment variables
const databaseUrl = process.env.DATABASE_URL || 'postgres://your_db_user:your_db_password@localhost:5432/chat';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

export { sequelize };
