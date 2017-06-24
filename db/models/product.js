const Sequelize = require('Sequelize')
const db = require('../connection')
const categories = require('./categories')
const List = require('./list')

const Product = db.define('product', {
  id: { primaryKey: true, type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4 },
  name: { type: Sequelize.STRING(255), allowNull: false },
  category: { type: Sequelize.ENUM, values: categories, allowNull: false }
}, {
  timestamps: false
})
Product.belongsToMany(List, {through: 'ProductOnList'})

module.exports = Product
