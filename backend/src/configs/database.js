// backend/src/configs/database.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL missing');
  process.exit(1);
}

const url = new URL(databaseUrl);

const sequelize = new Sequelize(url.pathname.replace(/^\//, ''), url.username, decodeURIComponent(url.password), {
  dialect: 'postgres',
  host: url.hostname,
  port: Number(url.port || 5432),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,        // Transaction pooler limit
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export default sequelize;
