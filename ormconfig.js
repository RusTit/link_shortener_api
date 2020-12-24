const sourcePath = process.env.NODE_ENV === 'test' ? 'src' : 'dist';
let DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  DATABASE_URL = 'postgres://test:test@localhost/test';
}
module.exports = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: [`${sourcePath}/**/*.entity{.ts,.js}`],
  migrations: [`${sourcePath}/migration/{*.ts,*.js}`],
  cli: {
    migrationsDir: 'src/migration',
  },
  extra: {
    // based on  https://node-postgres.com/api/pool
    // max connection pool size
    max: 10,
    // connection timeout
    connectionTimeoutMillis: 10000,
    min: 1,
  },
  ssl: process.env.DATABASE_ENABLE_SSL
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
};
