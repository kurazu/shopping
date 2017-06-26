const Sequelize = require('sequelize')
const db = require('../index')
const Product = require('./product')

const Item = db.define('item', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: '1.0'
  },
  bought: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  productId: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: Product,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
}, {
  timestamps: false
})
Item.belongsTo(Product)

module.exports = Item
