const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',           // 🔁 Replace with your actual DB username
  host: 'localhost',
  database: 'zapphire_db',    // 🔁 Replace with your DB name if different
  password: 'Poorni@123',  // 🔁 Replace with your actual password
  port: 5432,
});

module.exports = pool;
