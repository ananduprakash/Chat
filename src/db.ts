import knexPkg from 'knex';

const { knex } = knexPkg;

const dbConfig: knexPkg.Knex.Config = {
  client: 'pg',  // or 'mysql' or other supported DB
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 10 },
};

export const db = knex(dbConfig);
