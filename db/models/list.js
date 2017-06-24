const Sequelize = require('Sequelize')
const db = require('../connection.js')

const List = db.define('list', {
  id: { primaryKey: true, type: db.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4 },
  name: { type: db.STRING(255), allowNull: false, validate: { notNull: true, notEmpty: true } }
}, {
  timestamps: false
})

module.exports = List
