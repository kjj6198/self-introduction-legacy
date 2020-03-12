const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  min: 1,
  max: 1,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 10 * 1000,
  log: (...messages) => console.log(`${messages}`),
});

async function query(q, value) {
  const client = await pool.connect();

  const result = client.query(q, value);
  client.release();
  pool.removeAllListeners('error');
  return result;
}

module.exports = query;
