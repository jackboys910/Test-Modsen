const { Pool } = require('pg')
require('dotenv').config()

class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.EXPRESS_APP_POSTGRESQL_USER,
      host: 'localhost',
      database: 'RecipeSearchDB',
      password: process.env.EXPRESS_APP_POSTGRESQL_PASSWORD,
      port: 5432,
    })
  }

  query(text, params) {
    return this.pool.query(text, params)
  }
}

module.exports = new Database()
