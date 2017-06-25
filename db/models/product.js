const Sequelize = require('sequelize')
const db = require('../index')
const categories = require('./categories')

const Product = db.define('product', {
  id: { primaryKey: true, type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4 },
  name: { type: Sequelize.STRING(255), allowNull: false },
  category: { type: Sequelize.ENUM, values: categories, allowNull: false }
}, {
  timestamps: false
})

module.exports = Product
