const config = {
  client: 'postgresql',
  connection: {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgrespassword@db:5432/chat', // Use the Docker service name here
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
  pool: {
    min: 0,
    max: 1,
  },
};

export default config;
