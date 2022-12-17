module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [`dist/src/**/**.entity{.js}`],
  migrations: [`dist/src/migrations/**/*{.js}`],
  synchronize: false, // ! SET TO FALSE IN PRODUCTION
  cli: {
    migrationDir: 'src/migrations',
  },
};
