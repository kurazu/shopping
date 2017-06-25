const Sequelize = require('sequelize')
const db = require('../db/index')
const models = require('../db/models/index')

async function getItems () {
  let items
  try {
    items = await models.Item.findAll({
      include: [{
        model: models.Product,
        where: Sequelize.where(Sequelize.col('product.id'), Sequelize.col('item.productId'))
      }]
    })
    console.log('Items fetched', items)
  } catch (err) {
    console.error('Unable to fetch items', err)
  }
  return db.close()
}

getItems()
