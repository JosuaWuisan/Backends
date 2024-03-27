

const { Pool } = require('pg');

const pool = new Pool({
  user: 'howiee',
  password: 'backend',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: ''
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};