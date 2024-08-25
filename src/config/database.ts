import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://your_db_user:your_db_password@localhost:5432/chat_app');

export { sequelize };
