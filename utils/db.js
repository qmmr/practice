const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: null,
  port: process.env.PGPORT,
})

module.exports = {
  query: (query, params) => pool.query(query, params),
}
