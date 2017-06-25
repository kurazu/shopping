const Sequelize = require('sequelize')
const process = require('process')

const db = new Sequelize(process.env.DATABASE_URL)

module.exports = db
