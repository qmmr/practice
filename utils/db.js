const Sequelize = require('sequelize')

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
})

module.exports = sequelize
